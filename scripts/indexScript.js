header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

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
    result = result.sprites.front_default;
    return result;
}

function adicionarPokemonLocalStorage(pokemon){
    localStorage.setItem("pokemonId", pokemon);
}

function mudarParaPaginaPokemon(){
    window.location.href = "pokemon.html";
}

async function montarPokemons(listaPokemon){

    for(let pokemon of listaPokemon){
        const imagemPokemon = await pegarPokemonImagem(pokemon.name);

        const ulPokemons = document.querySelector("ul");
        ulPokemons.insertAdjacentHTML("beforeend",`
        <li class="li-${pokemon.name}">
            <div>
                <img src="${imagemPokemon}">
            </div>
            <p>
                ${pokemon.name}
            </p>
        </li> 
        `);
        const ulPokemon = document.querySelector(`.li-${pokemon.name}`);
        ulPokemon.addEventListener("click",()=>{
            adicionarPokemonLocalStorage(pokemon.name);
            mudarParaPaginaPokemon();
        });
    }
}

pegarTodosPokemons();