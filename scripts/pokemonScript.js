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
    ulPokemonInfo.insertAdjacentHTML("beforeend",`
        <li class="pokemon-li-container">
            <h2>Types:</h2>
            <ul id="sub-ul-types">
                
            </ul>
        </li>
        <li class="pokemon-li-container">
            <h2>Abilites:</h2>
            <ul id="sub-ul-abilities">
                
            </ul>
        </li>
        `);
        pokemonInfo.types.forEach(pokInfo => {
            const subUlTypes = document.querySelector("#sub-ul-types");
            subUlTypes.insertAdjacentHTML("beforeend",`
                <li class="pokemon-li-param">
                ${pokInfo.type.name}
                </li>
                `)
        });
        pokemonInfo.abilities.forEach(pokInfo => {
            const subUlTypes = document.querySelector("#sub-ul-abilities");
            subUlTypes.insertAdjacentHTML("beforeend",`
                <li class="pokemon-li-param">
                ${pokInfo.ability.name}
                </li>
                `)
        });
        montarPokemonStats(pokemonInfo);
}

function montarPokemonStats(pokemonInfo){
    const divPokemonInfo = document.querySelector(".pokemon-info");
    divPokemonInfo.insertAdjacentHTML("beforeend",`
        <div class="pokemon-li-container">
            <h2>Stats:</h2>
            <ul id="sub-ul-stats">
                
            </ul>
        </div>
        `);
    pokemonInfo.stats.forEach((pokInfo)=>{
        const subUlStats = document.querySelector("#sub-ul-stats");
        subUlStats.insertAdjacentHTML("beforeend",`
            <li class="pokemon-li-param">
                ${pokInfo.stat.name}: ${pokInfo.base_stat}
            </li>
            `);
    })
}