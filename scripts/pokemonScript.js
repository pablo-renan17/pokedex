const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function adicionarEventoCliqueLogo(){
    const pokedexIcon = document.querySelector("#pokedex2000-logo");
    pokedexIcon.addEventListener("click",()=>{
        window.location.href = "/index.html";
    });
}

async function verificarSeUsuarioEstaLogado(){
    try {
        const userInfoRaw = localStorage.getItem("userInfo");
        const userTokenEId = JSON.parse(userInfoRaw);
        console.log(userTokenEId);
        const emailUser = await pegarEmailUser(userTokenEId);
        ajustarNomeDeUsuario(emailUser);
    } catch (error) {
        console.log(error)
    }
}

function ajustarNomeDeUsuario(emailUser){
    const userNameP = document.querySelector("#user-name");
    userNameP.innerHTML = emailUser;
}

async function pegarEmailUser(userTokenEId){
    const userInfoRaw = await fetch(`http://localhost:3001/users/${userTokenEId.userId}`,{
        method: 'GET', 
        headers: {...header, 'Authorization': `Bearer ${userTokenEId.userToken}`}
    });
    const userInfo = await userInfoRaw.json();
    console.log(userInfo);  

    return userInfo.email;
}

function recuperarPokemon(){
    const pokemonInfo = JSON.parse(localStorage.getItem("pokemon"));
    montarPokemonMainInfo(pokemonInfo);
}

function montarPokemonMainInfo(pokemonInfo){
    const divPokemonInfo = document.querySelector(".pokemon-info");
    const pokemonName = capitalizarPrimeiraLetra(pokemonInfo.name);
    divPokemonInfo.insertAdjacentHTML("beforeend",`
        <img src="${pokemonInfo.sprites.front_default}">
        <p>${pokemonName}</p>
        <p>${pokemonInfo.species.name}</p>
        <button>Save to Pokedex</button>
        <ul class="d-flex pokemon-ul-container">
        </ul>
        `);
    montarPokemonParametros(pokemonInfo);
}

function montarPokemonParametros(pokemonInfo){
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
        preencherTipos(pokemonInfo.types);
        preencherHabilidades(pokemonInfo.abilities);
        montarPokemonStatos(pokemonInfo.stats);
}

function preencherTipos(tipos){
    tipos.forEach(tipo => {
        const subUlTypes = document.querySelector("#sub-ul-types");
        subUlTypes.insertAdjacentHTML("beforeend",`
            <li class="pokemon-li-param">
            ${tipo.type.name}
            </li>
            `);
    });
}

function preencherHabilidades(habilidades){
    habilidades.forEach(habilidade => {
        const subUlTypes = document.querySelector("#sub-ul-abilities");
        subUlTypes.insertAdjacentHTML("beforeend",`
            <li class="pokemon-li-param">
            ${habilidade.ability.name}
            </li>
            `);
    });
}

function montarPokemonStatos(statos){
    const divPokemonInfo = document.querySelector(".pokemon-info");
    divPokemonInfo.insertAdjacentHTML("beforeend",`
        <div class="pokemon-li-container">
            <h2>Stats:</h2>
            <ul id="sub-ul-stats">
                
            </ul>
        </div>
        `);
    preencherPokemonStatos(statos);
}

function preencherPokemonStatos(statos){
    statos.forEach((stato)=>{
        const subUlStats = document.querySelector("#sub-ul-stats");
        subUlStats.insertAdjacentHTML("beforeend",`
            <li class="pokemon-li-param">
                ${stato.stat.name}: ${stato.base_stat}
            </li>
            `);
    });
}

function capitalizarPrimeiraLetra(pokemonName){
    let palavraPrimeiraLetraCapitalizada = pokemonName[0].toUpperCase() + pokemonName.slice(1)
    return palavraPrimeiraLetraCapitalizada
}

verificarSeUsuarioEstaLogado();
adicionarEventoCliqueLogo();
recuperarPokemon();