const DICTIONARY_API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/";
const WIKTIONARY_API_BASES = {
  es: "https://es.wiktionary.org/w/api.php",
  en: "https://en.wiktionary.org/w/api.php"
};

const TECH_TERMS = {
  api: {
    title: "API",
    kind: "Software interface",
    definition: "An API is a contract that lets one piece of software request capabilities or data from another piece of software.",
    whyItMatters: "APIs are how apps, services, browsers, databases, and integrations talk to each other without sharing internal implementation details.",
    sources: [
      { label: "MDN: Web APIs", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction" }
    ],
    aliases: ["application programming interface"]
  },
  cors: {
    title: "CORS",
    kind: "Browser security mechanism",
    definition: "CORS is a browser-controlled mechanism that lets a server decide which other origins are allowed to read its responses.",
    whyItMatters: "It protects users by preventing a random website from freely reading sensitive responses from another site.",
    sources: [
      { label: "Fetch Standard: CORS protocol", url: "https://fetch.spec.whatwg.org/#http-cors-protocol" },
      { label: "MDN: CORS", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS" }
    ],
    aliases: ["cross origin resource sharing", "cross-origin resource sharing"]
  },
  dns: {
    title: "DNS",
    kind: "Internet naming system",
    definition: "DNS maps human-readable domain names, such as example.com, to records like IP addresses that computers use to route traffic.",
    whyItMatters: "Without DNS, users would need to remember network addresses instead of names.",
    sources: [
      { label: "RFC 1034: Domain Names - Concepts", url: "https://www.rfc-editor.org/rfc/rfc1034" },
      { label: "RFC 1035: Domain Names - Implementation", url: "https://www.rfc-editor.org/rfc/rfc1035" }
    ],
    aliases: ["domain name system"]
  },
  html: {
    title: "HTML",
    kind: "Markup language",
    definition: "HTML is the markup language used to structure web documents with elements such as headings, links, forms, images, and sections.",
    whyItMatters: "It gives browsers the semantic structure they need to render and interpret web pages.",
    sources: [
      { label: "WHATWG: HTML Standard", url: "https://html.spec.whatwg.org/" },
      { label: "MDN: HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }
    ],
    aliases: ["hypertext markup language"]
  },
  http: {
    title: "HTTP",
    kind: "Application protocol",
    definition: "HTTP is the request-response protocol used by clients and servers to transfer web resources.",
    whyItMatters: "It is the foundation of web browsing, APIs, caching, status codes, methods, and headers.",
    sources: [
      { label: "RFC 9110: HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" },
      { label: "MDN: HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" }
    ],
    aliases: ["hypertext transfer protocol"]
  },
  https: {
    title: "HTTPS",
    kind: "Secure web transport",
    definition: "HTTPS is HTTP carried over TLS so that web traffic is encrypted, authenticated, and protected from tampering.",
    whyItMatters: "It protects logins, cookies, API traffic, and user data from interception on the network.",
    sources: [
      { label: "RFC 9110: HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" },
      { label: "RFC 8446: TLS 1.3", url: "https://www.rfc-editor.org/rfc/rfc8446" }
    ],
    aliases: ["http secure", "hypertext transfer protocol secure"]
  },
  ip: {
    title: "IP",
    kind: "Internet layer protocol",
    definition: "IP is the network protocol that addresses and routes packets between devices across interconnected networks.",
    whyItMatters: "It is the addressing layer that lets traffic move across the internet.",
    sources: [
      { label: "RFC 791: Internet Protocol", url: "https://www.rfc-editor.org/rfc/rfc791" },
      { label: "RFC 8200: IPv6 Specification", url: "https://www.rfc-editor.org/rfc/rfc8200" }
    ],
    aliases: ["internet protocol", "ipv4", "ipv6"]
  },
  javascript: {
    title: "JavaScript",
    kind: "Programming language",
    definition: "JavaScript is the programming language used by browsers and many runtimes to add behavior, interactivity, and application logic.",
    whyItMatters: "It powers most client-side web applications and is also widely used on servers through runtimes such as Node.js.",
    sources: [
      { label: "ECMA-262: ECMAScript", url: "https://tc39.es/ecma262/" },
      { label: "MDN: JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
    ],
    aliases: ["js", "ecmascript"]
  },
  json: {
    title: "JSON",
    kind: "Data format",
    definition: "JSON is a lightweight text format for representing structured data with objects, arrays, strings, numbers, booleans, and null.",
    whyItMatters: "It is one of the most common formats for web APIs and configuration files.",
    sources: [
      { label: "RFC 8259: JSON", url: "https://www.rfc-editor.org/rfc/rfc8259" },
      { label: "ECMA-404: JSON", url: "https://www.ecma-international.org/publications-and-standards/standards/ecma-404/" }
    ],
    aliases: ["javascript object notation"]
  },
  jwt: {
    title: "JWT",
    kind: "Token format",
    definition: "A JWT is a compact token format for representing claims as a signed JSON object.",
    whyItMatters: "It is commonly used for identity, authorization, and session-like flows, but it must be validated carefully.",
    sources: [
      { label: "RFC 7519: JSON Web Token", url: "https://www.rfc-editor.org/rfc/rfc7519" }
    ],
    aliases: ["json web token"]
  },
  oauth: {
    title: "OAuth 2.0",
    kind: "Authorization framework",
    definition: "OAuth 2.0 is a framework that lets an application get limited access to protected resources without directly handling a user's password.",
    whyItMatters: "It is the basis for many sign-in and delegated-access systems used by modern apps.",
    sources: [
      { label: "RFC 6749: OAuth 2.0", url: "https://www.rfc-editor.org/rfc/rfc6749" },
      { label: "RFC 6750: Bearer Token Usage", url: "https://www.rfc-editor.org/rfc/rfc6750" }
    ],
    aliases: ["oauth2", "oauth 2", "oauth 2.0"]
  },
  rest: {
    title: "REST",
    kind: "Architectural style",
    definition: "REST is an architectural style for networked systems built around resources, representations, stateless requests, and standard interface constraints.",
    whyItMatters: "Many web APIs call themselves REST APIs because they expose resources through HTTP methods and URLs.",
    sources: [
      { label: "Roy Fielding dissertation: REST", url: "https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm" },
      { label: "MDN: HTTP request methods", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods" }
    ],
    aliases: ["representational state transfer", "rest api"]
  },
  sql: {
    title: "SQL",
    kind: "Database query language",
    definition: "SQL is a language for defining, querying, and manipulating data in relational database systems.",
    whyItMatters: "It is the standard language behind many transactional and analytical databases.",
    sources: [
      { label: "ISO: SQL standard overview", url: "https://www.iso.org/standard/76583.html" },
      { label: "PostgreSQL: SQL language", url: "https://www.postgresql.org/docs/current/sql.html" }
    ],
    aliases: ["structured query language"]
  },
  tcp: {
    title: "TCP",
    kind: "Transport protocol",
    definition: "TCP is a reliable, ordered, connection-oriented transport protocol used to deliver byte streams between applications.",
    whyItMatters: "It powers many protocols, including HTTP/1.1, HTTP/2, SSH, SMTP, and database connections.",
    sources: [
      { label: "RFC 9293: Transmission Control Protocol", url: "https://www.rfc-editor.org/rfc/rfc9293" }
    ],
    aliases: ["transmission control protocol"]
  },
  tls: {
    title: "TLS",
    kind: "Security protocol",
    definition: "TLS is a cryptographic protocol that provides encryption, authentication, and integrity for network communications.",
    whyItMatters: "It is the security layer behind HTTPS and many other secure protocols.",
    sources: [
      { label: "RFC 8446: TLS 1.3", url: "https://www.rfc-editor.org/rfc/rfc8446" }
    ],
    aliases: ["transport layer security", "ssl"]
  },
  udp: {
    title: "UDP",
    kind: "Transport protocol",
    definition: "UDP is a connectionless transport protocol that sends datagrams without guaranteeing delivery, ordering, or retransmission.",
    whyItMatters: "It is useful when low latency matters more than built-in reliability, such as DNS, streaming, games, and QUIC.",
    sources: [
      { label: "RFC 768: User Datagram Protocol", url: "https://www.rfc-editor.org/rfc/rfc768" },
      { label: "RFC 9000: QUIC", url: "https://www.rfc-editor.org/rfc/rfc9000" }
    ],
    aliases: ["user datagram protocol"]
  }
};

const TECH_ALIAS_INDEX = buildTechAliasIndex(TECH_TERMS);

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
    title: result.title || term,
    kind: result.kind || "",
    definition: result.definition || result.summary,
    whyItMatters: result.whyItMatters || "",
    sources: result.sources || [],
    summary: result.summary,
    source: result.source
  };
}

async function getDefinition(word, context, detailLevel) {
  const techEntry = findTechEntry(word, context);

  if (techEntry) {
    return {
      ok: true,
      title: techEntry.title,
      kind: techEntry.kind,
      definition: techEntry.definition,
      whyItMatters: techEntry.whyItMatters,
      sources: techEntry.sources,
      summary: formatTechSummary(techEntry),
      source: techEntry.sources.map((item) => item.label).join(", ")
    };
  }

  return {
    ok: false,
    title: word,
    kind: "Not in technology glossary",
    definition: `I could not match "${word}" to a technology term yet.`,
    whyItMatters: "Try selecting a technical acronym, protocol, language, API name, or engineering concept.",
    sources: [],
    summary: `No tech definition found for "${word}". Try terms like HTTP, DNS, TCP, JWT, CORS, API, REST, SQL, TLS, JSON, HTML, CSS, or JavaScript.`,
    source: "none"
  };

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

function buildTechAliasIndex(terms) {
  return Object.entries(terms).reduce((index, [key, entry]) => {
    index.set(normalizeTechKey(key), key);
    index.set(normalizeTechKey(entry.title), key);

    for (const alias of entry.aliases || []) {
      index.set(normalizeTechKey(alias), key);
    }

    return index;
  }, new Map());
}

function findTechEntry(term, context) {
  const normalizedTerm = normalizeTechKey(term);
  const directKey = TECH_ALIAS_INDEX.get(normalizedTerm);

  if (directKey) {
    return TECH_TERMS[directKey];
  }

  const contextKey = findTechKeyInText(context);

  if (contextKey && normalizedTerm.length <= 3) {
    return TECH_TERMS[contextKey];
  }

  return null;
}

function findTechKeyInText(text) {
  const normalizedText = ` ${normalizeTechKey(text)} `;

  for (const [alias, key] of TECH_ALIAS_INDEX.entries()) {
    if (alias.length > 2 && normalizedText.includes(` ${alias} `)) {
      return key;
    }
  }

  return "";
}

function normalizeTechKey(value) {
  return removeAccents(String(value || "").toLowerCase())
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatTechSummary(entry) {
  return [
    `${entry.title} - ${entry.kind}`,
    `Definition: ${entry.definition}`,
    `Why it matters: ${entry.whyItMatters}`,
    "Sources:",
    ...entry.sources.map((source) => `- ${source.label}`)
  ].join("\n");
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
