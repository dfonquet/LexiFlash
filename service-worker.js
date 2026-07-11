const DICTIONARY_API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/es/";

const LOCAL_DEFINITIONS = {
  hola: "Saludo usado al encontrarse con alguien o iniciar una conversación.",
  gracias: "Expresión de agradecimiento por un favor, ayuda o atención recibida.",
  casa: "Lugar construido para vivir; vivienda o espacio propio de una familia.",
  amor: "Sentimiento intenso de afecto, cuidado o apego hacia alguien o algo.",
  tiempo: "Duración o sucesión de los acontecimientos; también puede referirse al clima.",
  palabra: "Unidad de lenguaje con significado que se escribe separada de otras.",
  leer: "Interpretar signos escritos para comprender su significado.",
  aprender: "Adquirir conocimiento, habilidad o comprensión mediante estudio o experiencia."
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
  const word = normalizeWord(payload?.word);

  if (!word) {
    return {
      ok: false,
      summary: "No word was provided."
    };
  }

  const { history = [], settings = {} } = await chrome.storage.local.get([
    "history",
    "settings"
  ]);

  const detailLevel = settings.detailLevel || "short";
  const saveHistory = settings.saveHistory !== false;

  const result = await getDefinition(word, detailLevel);

  if (saveHistory && result.ok) {
    const newEntry = {
      word,
      summary: result.summary,
      source: result.source,
      createdAt: new Date().toISOString()
    };

    const updatedHistory = [
      newEntry,
      ...history.filter(
        (entry) => normalizeWord(entry.word) !== word
      )
    ].slice(0, 20);

    await chrome.storage.local.set({
      history: updatedHistory
    });
  }

  return {
    ok: result.ok,
    word,
    summary: result.summary,
    source: result.source
  };
}

async function getDefinition(word, detailLevel) {
  try {
    const apiResult = await fetchDictionaryApiDefinition(word, detailLevel);

    if (apiResult) {
      return {
        ok: true,
        summary: apiResult,
        source: "dictionaryapi.dev"
      };
    }
  } catch (error) {
    console.warn("Dictionary API lookup failed:", error);
  }

  const fallback = LOCAL_DEFINITIONS[word];

  if (fallback) {
    return {
      ok: true,
      summary: formatDefinition(word, [{ definition: fallback }], detailLevel),
      source: "local"
    };
  }

  return {
    ok: false,
    summary: `No encontré una definición para "${word}". Prueba con otra forma de la palabra.`,
    source: "none"
  };
}

async function fetchDictionaryApiDefinition(word, detailLevel) {
  const response = await fetch(`${DICTIONARY_API_BASE}${encodeURIComponent(word)}`);

  if (!response.ok) {
    return "";
  }

  const entries = await response.json();
  const definitions = collectDefinitions(entries);

  if (!definitions.length) {
    return "";
  }

  return formatDefinition(word, definitions, detailLevel);
}

function collectDefinitions(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.flatMap((entry) => {
    return (entry.meanings || []).flatMap((meaning) => {
      return (meaning.definitions || [])
        .filter((definition) => definition.definition)
        .map((definition) => ({
          partOfSpeech: meaning.partOfSpeech,
          definition: definition.definition,
          example: definition.example
        }));
    });
  });
}

function formatDefinition(word, definitions, detailLevel) {
  if (detailLevel === "medium") {
    return definitions
      .slice(0, 3)
      .map((item) => {
        const label = item.partOfSpeech ? `${item.partOfSpeech}: ` : "";
        const example = item.example ? ` Ejemplo: ${item.example}` : "";

        return `${label}${item.definition}${example}`;
      })
      .join(" ");
  }

  return `${word}: ${definitions[0].definition}`;
}

function normalizeWord(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("es")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
}
