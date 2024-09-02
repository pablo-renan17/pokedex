const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function adicionarEventoCliqueLogoMenu(){
    const menuIcon = document.querySelector(".icon-menu");
    menuIcon.addEventListener("click",()=>{
        window.location.href = "http://127.0.0.1:5500/html/pokedexUser.html";
    })
}

function adicionarEventoCliqueLogo(){
    const pokedexIcon = document.querySelector("#pokedex2000-logo");
    pokedexIcon.addEventListener("click",()=>{
        window.location.href = "/index.html";
    });
}

async function verificarSeUsuarioEstaLogado(){
    try {
        const userTokenEId = await pegarTokenEId();
        const userEmail = await pegarEmailUser(userTokenEId);
        ajustarNomeDeUsuario(userEmail);
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
        <div class="container-button">
            <button id="btn-${pokemonInfo.name}">Save to Pokedex</button>
        </div> 
        <ul class="d-flex pokemon-ul-container">
        </ul>
        `);
    adicionarEventoBotaoSavePokedex(pokemonInfo.name);
    montarPokemonParametros(pokemonInfo);
    verificarSeUsuarioTemPokemon(pokemonInfo.name);
}

async function verificarSeUsuarioTemPokemon(pokemonName){
    const userTokenEId = await pegarTokenEId();
    let {pokemonsAtualUsuario, userPrimaryKey} = await pegarPokemonsUsuarioEPrimaryKey(userTokenEId.userId);
    if(pokemonsAtualUsuario.includes(pokemonName)){
        const containerButton = document.querySelector(".container-button");
        containerButton.insertAdjacentHTML("beforeend",`
            <button id="btn-remover-${pokemonName}">Remove from Pokedex</button>
            `)

            const adicionarButton = document.querySelector(`#btn-${pokemonName}`);
            adicionarButton.remove();
    }
}

function adicionarEventoBotaoSavePokedex(pokemonName){
    const buttonSavePokedex = document.querySelector(`#btn-${pokemonName}`);
    buttonSavePokedex.addEventListener("click",()=>{
        verificarSeUsuarioTemPokedex(pokemonName);
    });
}

async function pegarTokenEId(){
    const userInfoRaw = localStorage.getItem("userInfo");
    const userTokenEId = JSON.parse(userInfoRaw);
    return userTokenEId;
}

async function verificarSeUsuarioTemPokedex(pokemonName){
    const userTokenEId = await pegarTokenEId();
    const userPokedexRaw = await fetch(`http://localhost:3001/pokedex/?userId=${userTokenEId.userId}`,{
        method: "GET",
        headers: header
    });
    const userPokedex = await userPokedexRaw.json();
    if(userPokedex.length < 1){
        console.log("Usuario não tem pokemons cadastrados");
        adicionarPokemonPokedexPost(userTokenEId.userId, pokemonName);
    }else{
        console.log("Usuario possui pokemons cadastrados");
        adicionarPokemonPokedexPut(userTokenEId.userId, pokemonName);
    }
}

async function adicionarPokemonPokedexPost(userId, pokemonName){
    const adicionarPokedexRaw = await fetch(`http://localhost:3001/pokedex/`,{
        method: "POST",
        headers: header,
        body: JSON.stringify({
            "pokemon": [pokemonName],
            "userId": userId
        })
    })
    const adiconarPokedex = await adicionarPokedexRaw.json();
    console.log(adiconarPokedex)
    window.location.reload();
}

async function adicionarPokemonPokedexPut(userId, pokemonName){
    let {pokemonsAtualUsuario, userPrimaryKey} = await pegarPokemonsUsuarioEPrimaryKey(userId);

    try {
        pokemonsAtualUsuario = JSON.parse(pokemonsAtualUsuario);
    } catch (error) {

    }
    
    console.log(pokemonsAtualUsuario)

    if(pokemonsAtualUsuario.includes(pokemonName)){
        console.log("Usuario ja tem esse pokemon!");
        return
    }

    pokemonsAtualUsuario.push(pokemonName);

    const response = await fetch(`http://localhost:3001/pokedex/${userPrimaryKey}`,{
        method: "PUT",
        headers: header,
        body: JSON.stringify({
            "pokemon": JSON.stringify(pokemonsAtualUsuario),
            "userId": userId
        })
    });
    const result = await response.json();
    console.log(result);
    window.location.reload();
}

async function pegarPokemonsUsuarioEPrimaryKey(userId){
    const response = await fetch(`http://localhost:3001/pokedex/?userId=${userId}`);
    const result   = await response.json();
    const pokemonsAtualUsuario = result[0].pokemon;
    const userPrimaryKey = result[0].id;
    return {pokemonsAtualUsuario, userPrimaryKey};
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
adicionarEventoCliqueLogoMenu();
recuperarPokemon();