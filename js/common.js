const pokemon = (new URLSearchParams(window.location.search)).get('pokemon');
const language = 'fr';
let baseData;
let speciesData;
let evolutionChain;
const abilities = [];
const types = [];
const weaknesses = [];

async function fetchJson(url) {
  const response = await fetch(url);
  return await response.json();
}

function baseUrl(name) {
  if (!name) {
    alert('no pokemon chosen');
  }
  return `https://pokeapi.co/api/v2/pokemon/${name}`
}

async function fetchBaseData() {
  if (baseData) return baseData;
  return baseData = await fetchJson(baseUrl(pokemon));
}

async function fetchSpeciesData() {
  if (speciesData) return speciesData;
  return speciesData = await fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
}

async function fetchAbility(url) {
  if (abilities.indexOf(url) >= 0) return abilities[url];
  return abilities[url] = await fetchJson(url);
}

async function fetchType(url) {
  if (types.indexOf(url) >= 0) return types[url];
  return types[url] = await fetchJson(url);
}

async function fetchEvolutions() {
  if (evolutionChain) return evolutionChain;
  const sData = await fetchSpeciesData();
  return evolutionChain = await fetchJson(sData.evolution_chain.url);
}

function getLanguageEntry(entries) {
  const filteredEntries = entries.filter(entry => entry.language.name == language);
  if (filteredEntries.length) return filteredEntries[0];
  return null;
}
