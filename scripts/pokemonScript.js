function eventoDeCliquePokedexLogo(){
    const pokedexIcon = document.querySelector("#pokedex2000-logo");
    pokedexIcon.addEventListener("click",()=>{
        window.location.href = "index.html"
    })
}
eventoDeCliquePokedexLogo();

function pegarPokemon(){
    const pokemonInfo = JSON.parse(localStorage.getItem("pokemon"));
    console.log(pokemonInfo);
    montarPokemonMainInfo(pokemonInfo);
}
pegarPokemon();

function montarPokemonMainInfo(pokemonInfo){
    const divPokemonInfo = document.querySelector(".pokemon-info");
    divPokemonInfo.insertAdjacentHTML("beforeend",`
        <img src="${pokemonInfo.sprites.front_default}">
        <p>${pokemonInfo.name}</p>
        <p>${pokemonInfo.species.name}</p>
        <button>Save to Pokedex</button>
        <ul class="d-flex pokemon-ul-container">
        </ul>
        `)
    montarPokemonParamsLi(pokemonInfo);
}

function montarPokemonParamsLi(pokemonInfo){
    const ulPokemonInfo = document.querySelector(".pokemon-ul-container");
    ulPokemonInfo.insertAdjacentHTML("beforebegin",`
          <li class="pokemon-li-container">
                <h2>Types:</h2>
                <ul id="sub-ul-types">
                    
                </ul>
            </li>
        `);
        pokemonInfo.types.forEach(typeArray => {
            const subUlTypes = document.querySelector("#sub-ul-types");
            subUlTypes.insertAdjacentHTML("beforeend",`
                <li class="pokemon-li-param">
                ${typeArray.type.name}
                </li>
                `)
        });
}

function montarPokemonsSubUlLi(){
    const subUl = document.querySelector("#sub-ul");
    subUl
}