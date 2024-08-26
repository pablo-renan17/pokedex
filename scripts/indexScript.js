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
}

function eventoDeCliquePokedexLogo(){
    const pokedexIcon = document.querySelector("#pokedex2000-logo");
    pokedexIcon.addEventListener("click",()=>{
        window.location.href = "index.html"
    })
}
eventoDeCliquePokedexLogo();

async function pegarTodosPokemons(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000",{
        headers: header
    });
    const result = await response.json();
    montarPokemons(result.results)
}

async function pegarPokemonImagem(nomePokemon){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`,{
        headers: header
    });
    let result = await response.json();
    return result;
}

function adicionarPokemonLocalStorage(pokemon){
    localStorage.setItem("pokemon", pokemon);
}

function mudarParaPaginaPokemon(){
    window.location.href = "pokemon.html";
}

async function montarPokemons(listaPokemon){

    for(let pokemon of listaPokemon){
        const pokemonInfo = await pegarPokemonImagem(pokemon.name);
        console.log(pokemonInfo, "info")
        const ulPokemons = document.querySelector("ul");
        ulPokemons.insertAdjacentHTML("beforeend",`
        <li class="li-${pokemon.name}" style="background-color: ${colors[pokemonInfo.types[0].type.name]}">
            <div>
                <img src="${pokemonInfo.sprites.front_default}">
            </div>
            <p>
                ${pokemon.name}
            </p>
        </li> 
        `);
        const ulPokemon = document.querySelector(`.li-${pokemon.name}`);
        ulPokemon.addEventListener("click",()=>{
            adicionarPokemonLocalStorage(JSON.stringify(pokemonInfo));
            mudarParaPaginaPokemon();
        });
    }
}

pegarTodosPokemons();