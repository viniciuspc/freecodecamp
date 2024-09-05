const nameOrIdUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

const pokemonName = document.getElementById("pokemon-name")
const pokemonId = document.getElementById("pokemon-id")
const pokemonWeight = document.getElementById("weight")
const pokemonHeight = document.getElementById("height")
const spriteContainer = document.getElementById("sprite-container")
const typesContainer = document.getElementById("types")
let arrStatTd = [];

const sanitizeSearch = search => {
  return search.toLowerCase();
}

const fetchPokemonData = async (e) => {
  
  const search = searchInput.value
  if(search){
    e.preventDefault();
    try {
      const res = await fetch(`${nameOrIdUrl}/${sanitizeSearch(search)}`)
      const data = await res.json();
      showPokemon(data);
    } catch (err) {
      console.log(err)
      alert("Pokémon not found")
      resetPokemon();
    }
  }
}

const showPokemon = (data) => {
  const {name, id, weight, height, sprites, stats, types} = data;
  pokemonName.innerText = `${name.toUpperCase()}`;
  pokemonId.innerText = `#${id}`
  pokemonWeight.innerText = `Weight: ${weight}`
  pokemonHeight.innerText = `Height: ${height}`
  renderSprite(sprites);
  renderTypes(types);
  renderStats(stats);
}

const renderSprite = (sprites) => {
  const frontDefaultUrl = sprites.front_default;
  spriteContainer.innerHTML = `
    <img id="sprite" src="${frontDefaultUrl}">
  `;
}

const renderTypes = types => {
  typesContainer.innerHTML = types.map(
    ({_, type}) => `<span class="type ${type.name}">${type.name.toUpperCase()}</span>`
  ).join("");
}

const renderStats = stats => {
  arrStatTd = [];
  stats.forEach(({base_stat,stat}) => {
    const statTd = document.getElementById(stat.name);
    statTd.innerText = base_stat;
    arrStatTd.push(statTd);
  })
}

const resetPokemon = () =>{
  pokemonName.innerText = "";
  pokemonId.innerText = "";
  pokemonWeight.innerText = "";
  pokemonHeight.innerText = "";
  spriteContainer.innerHTML = "";
  typesContainer.innerHTML = "";
  arrStatTd.forEach(statTd => statTd.innerText = "");
}

searchButton.addEventListener("click", fetchPokemonData)