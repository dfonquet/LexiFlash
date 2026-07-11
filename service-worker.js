const DICTIONARY_API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/";
const WIKTIONARY_API_BASES = {
  es: "https://es.wiktionary.org/w/api.php",
  en: "https://en.wiktionary.org/w/api.php"
};

const LOCAL_DEFINITIONS = {
  esto: "Pronombre demostrativo neutro. Se usa para referirse a algo cercano, ya mencionado o que se va a mostrar.",
  este: "Demostrativo masculino singular. Senala algo cercano al hablante o al momento presente.",
  esta: "Demostrativo femenino singular. Senala algo cercano al hablante o al momento presente.",
  estos: "Demostrativo masculino plural. Senala varias cosas cercanas al hablante o al momento presente.",
  estas: "Demostrativo femenino plural. Senala varias cosas cercanas al hablante o al momento presente.",
  eso: "Pronombre demostrativo neutro. Se usa para referirse a algo cercano al oyente o ya mencionado.",
  ese: "Demostrativo masculino singular. Senala algo cercano al oyente o mencionado antes.",
  esa: "Demostrativo femenino singular. Senala algo cercano al oyente o mencionado antes.",
  hola: "Saludo usado al encontrarse con alguien o iniciar una conversaciÃ³n.",
  gracias: "ExpresiÃ³n de agradecimiento por un favor, ayuda o atenciÃ³n recibida.",
  casa: "Lugar construido para vivir; vivienda o espacio propio de una familia.",
  amor: "Sentimiento intenso de afecto, cuidado o apego hacia alguien o algo.",
  tiempo: "DuraciÃ³n o sucesiÃ³n de los acontecimientos; tambiÃ©n puede referirse al clima.",
  palabra: "Unidad de lenguaje con significado que se escribe separada de otras.",
  leer: "Interpretar signos escritos para comprender su significado.",
  aprender: "Adquirir conocimiento, habilidad o comprensiÃ³n mediante estudio o experiencia."
};

chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(["history", "settings"]);

  if (!data.history) {
    await chrome.storage.local.set({ history: [] });
  }

  if (!data.settings) {
    await chrome.storage.local.set({
      settings: {
        detailLevel: "short",
        saveHistory: true
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "GET_MEANING") {
    handleGetMeaning(message.payload)
      .then(sendResponse)
      .catch((error) => {
        console.error("GET_MEANING error:", error);
        sendResponse({
          ok: false,
          summary: "Unable to retrieve the meaning right now."
        });
      });

    return true;
  }

  if (message?.type === "GET_HISTORY") {
    chrome.storage.local.get(["history"]).then((data) => {
      sendResponse({
        ok: true,
        history: data.history || []
      });
    });

    return true;
  }
});

async function handleGetMeaning(payload) {
  const term = normalizeQuery(payload?.text || payload?.word);
  const context = normalizeContext(payload?.context || term);

  if (!term) {
    return {
      ok: false,
      summary: "No word or phrase was provided."
    };
  }

  const { history = [], settings = {} } = await chrome.storage.local.get([
    "history",
    "settings"
  ]);

  const detailLevel = settings.detailLevel || "short";
  const saveHistory = settings.saveHistory !== false;

  const result = await getDefinition(term, context, detailLevel);

  if (saveHistory && result.ok) {
    const newEntry = {
      word: term,
      summary: result.summary,
      source: result.source,
      createdAt: new Date().toISOString()
    };

    const updatedHistory = [
      newEntry,
      ...history.filter(
        (entry) => normalizeQuery(entry.word) !== term
      )
    ].slice(0, 20);

    await chrome.storage.local.set({
      history: updatedHistory
    });
  }

  return {
    ok: result.ok,
    word: term,
    summary: result.summary,
    source: result.source
  };
}

async function getDefinition(word, context, detailLevel) {
  const definitions = [];

  if (isSingleTerm(word)) {
    definitions.push(
      ...(await safeLookup(() => fetchDictionaryApiDefinitions(word, "es"))),
      ...(await safeLookup(() => fetchDictionaryApiDefinitions(word, "en")))
    );
  }

  definitions.push(
    ...(await safeLookup(() => fetchWiktionaryDefinitions(word, "es"))),
    ...(await safeLookup(() => fetchWiktionaryDefinitions(word, "en")))
  );

  if (definitions.length) {
    const rankedDefinitions = rankDefinitions(definitions, context);
    const best = rankedDefinitions[0];
    const references = buildReferences(rankedDefinitions, best);

    return {
      ok: true,
      summary: formatMeaningSummary(word, best, references, detailLevel),
      source: references.map((item) => item.source).join(", ")
    };
  }

  const fallback = LOCAL_DEFINITIONS[word];

  if (fallback) {
    return {
      ok: true,
      summary: formatMeaningSummary(
        word,
        { definition: fallback, language: "es", source: "local" },
        [],
        detailLevel
      ),
      source: "local"
    };
  }

  return {
    ok: false,
    summary: `No encontre una definicion para "${word}". Try another form or a shorter phrase.`,
    source: "none"
  };
}

async function fetchDictionaryApiDefinitions(word, language) {
  const response = await fetch(
    `${DICTIONARY_API_BASE}${language}/${encodeURIComponent(word)}`
  );

  if (!response.ok) {
    return [];
  }

  const entries = await response.json();
  return collectDictionaryApiDefinitions(entries, language);
}

function collectDictionaryApiDefinitions(entries, language) {
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.flatMap((entry) => {
    return (entry.meanings || []).flatMap((meaning) => {
      return (meaning.definitions || [])
        .filter((definition) => definition.definition)
        .map((definition) => ({
          language,
          source: `dictionaryapi.dev/${language}`,
          partOfSpeech: meaning.partOfSpeech,
          definition: definition.definition,
          example: definition.example
        }));
    });
  });
}

async function fetchWiktionaryDefinitions(word, language) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    prop: "extracts",
    redirects: "1",
    explaintext: "1",
    titles: word
  });

  const response = await fetch(
    `${WIKTIONARY_API_BASES[language]}?${params.toString()}`
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const pages = Object.values(data?.query?.pages || {});
  const page = pages.find((item) => item && item.pageid && item.extract);

  if (!page) {
    return [];
  }

  return parseWiktionaryExtract(page.extract, language);
}

function parseWiktionaryExtract(extract, language) {
  const blockedHeadings = new Set([
    "espanol",
    "etimologia",
    "pronunciacion",
    "vease tambien",
    "referencias",
    "traducciones",
    "locuciones",
    "conjugacion",
    "forma verbal",
    "forma adjetiva",
    "forma sustantiva",
    "english",
    "spanish",
    "etymology",
    "pronunciation",
    "noun",
    "verb",
    "adjective",
    "adverb",
    "references",
    "translations",
    "see also"
  ]);

  const candidates = extract
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !blockedHeadings.has(removeAccents(line.toLowerCase())))
    .filter((line) => !/^[-=]+$/.test(line))
    .filter((line) => !/^(del|de la|de el|de un|de una)\b/i.test(line))
    .map((line) => line.replace(/^\d+\s*/, ""))
    .filter((line) => line.length > 18);

  return candidates.slice(0, 8).map((definition) => ({
    language,
    source: language === "es" ? "Wikcionario" : "Wiktionary",
    definition
  }));
}

async function safeLookup(lookup) {
  try {
    return await lookup();
  } catch (error) {
    console.warn("Lookup failed:", error);
    return [];
  }
}

function rankDefinitions(definitions, context) {
  const contextTokens = new Set(tokenize(context));

  return definitions
    .map((item, index) => {
      const definitionTokens = tokenize(`${item.definition} ${item.example || ""}`);
      const overlap = definitionTokens.filter((token) => contextTokens.has(token)).length;
      const languageBoost = item.language === "es" || item.language === "en" ? 1 : 0;

      return {
        ...item,
        score: overlap + languageBoost - index * 0.01
      };
    })
    .sort((a, b) => b.score - a.score);
}

function buildReferences(definitions, best) {
  const references = [best];

  for (const language of ["es", "en"]) {
    const match = definitions.find((item) => item.language === language);

    if (match && !references.includes(match)) {
      references.push(match);
    }
  }

  return references.slice(0, 3);
}

function formatMeaningSummary(word, best, references, detailLevel) {
  const lines = [`Best match for "${word}": ${best.definition}`];

  if (best.example && detailLevel === "medium") {
    lines.push(`Example: ${best.example}`);
  }

  if (references.length) {
    lines.push(
      ...references.map((item) => {
        const label = item.language === "es" ? "ES reference" : "EN reference";
        return `${label} (${item.source}): ${item.definition}`;
      })
    );
  }

  return lines.join("\n");
}

function isSingleTerm(value) {
  return !String(value || "").trim().includes(" ");
}

function normalizeQuery(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("es")
    .replace(/[^\p{L}\p{N}\-\s']/gu, "")
    .replace(/\s+/g, " ")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
}

function normalizeContext(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 700);
}

function tokenize(value) {
  const stopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "para",
    "por",
    "con",
    "que",
    "una",
    "uno",
    "los",
    "las",
    "del",
    "este",
    "esta",
    "esto"
  ]);

  return removeAccents(String(value || "").toLowerCase())
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function removeAccents(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
