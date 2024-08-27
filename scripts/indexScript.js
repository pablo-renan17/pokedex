const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const colors = {
    normal: "rgba(150, 150, 150, 0.2)",
    grass: "rgba(108, 230, 44, 0.2)",
    fire: "rgba(230, 130, 43, 0.2)",
    poison: "rgba(150, 44, 230, 0.2)",
    water: "rgba(44, 230, 208, 0.2)",
    bug: "rgba(110, 41, 1, 0.2)",
    electric: "rgba(255, 242, 0, 0.2)",
    ground: "rgba(110, 79, 0, 0.2)",
    fairy: "rgba(110, 0, 49, 0.2)",
    fighting: "rgba(0, 10, 110, 0.2)",
    psychic: "rgba(120, 0, 255, 0.2)",
    rock: "rgba(0, 0, 0, 0.2)",
    ghost: "rgba(61, 0, 255, 0.2)",
    ice: "rgba(0, 255, 226, 0.2)",
    dragon: "rgba(255, 0, 88, 0.2)",
    dark: "rgba(0, 0, 0, 0.35)",
    steel: "rgba(150, 149, 122, 0.35)",
    flying: "rgba(122, 150, 127, 0.35)"
};

function adicionarEventoCliqueLogo(){
    const pokedexIcon = document.querySelector("#pokedex2000-logo");
    pokedexIcon.addEventListener("click",()=>{
        window.location.href = "index.html"
    });
}

async function pegarTodosPokemons(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000",{
        headers: header
    });
    const result = await response.json();
    montarPokemons(result.results);
}

async function pegarPokemonDetalhes(nomePokemon){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`,{
        headers: header
    });
    const result = await response.json();
    return result;
}

function adicionarPokemonLocalStorage(pokemon){
    localStorage.setItem("pokemon", pokemon);
}

function mudarParaPaginaPokemon(){
    window.location.href = "pokemon.html";
}

async function montarPokemons(listaPokemon) {
    const ulPokemons = document.querySelector("ul");

    for (let pokemon of listaPokemon) {
        const pokemonDetalhes = await pegarPokemonDetalhes(pokemon.name);
        const liTemplate = `
            <li class="li-${pokemonDetalhes.name}" style="background-color: ${colors[pokemonDetalhes.types[0].type.name]}">
                <div>
                    <img src="${pokemonDetalhes.sprites.front_default}" alt="${pokemonDetalhes.name}">
                </div>
                <p>${pokemonDetalhes.name}</p>
            </li>
        `;
        ulPokemons.insertAdjacentHTML("beforeend", liTemplate);
        adicionarEventoCliquePokemon(pokemonDetalhes);
    }
}

function adicionarEventoCliquePokemon(pokemonDetalhes){
    const ulPokemon = document.querySelector(`.li-${pokemonDetalhes.name}`);
    ulPokemon.addEventListener("click",()=>{
            adicionarPokemonLocalStorage(JSON.stringify(pokemonDetalhes));
            mudarParaPaginaPokemon();
    });
}

adicionarEventoCliqueLogo();
pegarTodosPokemons();