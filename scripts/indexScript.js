header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function eventoDeCliquePokedexLogo(){
    const pokedexIcon = document.querySelector("#pokedex2000-logo");
    pokedexIcon.addEventListener("click",()=>{
        window.location.href = "index.html"
    })
}
eventoDeCliquePokedexLogo();

async function pegarTodosPokemons(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150",{
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

        const ulPokemons = document.querySelector("ul");
        ulPokemons.insertAdjacentHTML("beforeend",`
        <li class="li-${pokemon.name}">
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