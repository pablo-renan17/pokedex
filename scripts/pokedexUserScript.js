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
        window.location.href = "/index.html";
    });
}

async function verificarSeUsuarioEstaLogado(){
    try {
        const userInfoRaw = localStorage.getItem("userInfo");
        const userTokenEId = JSON.parse(userInfoRaw);
        console.log(userTokenEId, "user token e id");
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
    console.log(userInfo, "user email");  

    return userInfo.email;
}

//De agora em diante é quase tudo do index

async function pegarTodosPokemonsPokedexUser(){
    const userTokenEId = await pegarTokenEId();
    const response = await fetch(`http://localhost:3001/pokedex/?userId=${userTokenEId.userId}`,{
        headers: header
    });
    const result = await response.json();

    montarPokemons(JSON.parse(result[0].pokemon));
}

async function pegarTokenEId(){
    const userInfoRaw = localStorage.getItem("userInfo");
    const userTokenEId = JSON.parse(userInfoRaw);
    return userTokenEId;
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
    window.location.href = "http://127.0.0.1:5500/html/pokemon.html";
}

async function montarPokemons(listaPokemon) {
    const ulPokemons = document.querySelector("ul");

    for (let pokemon of listaPokemon) {
        const pokemonDetalhes = await pegarPokemonDetalhes(pokemon);
        const pokemonName = capitalizarPrimeiraLetra(pokemon);
        const liTemplate = `
            <li class="li-${pokemonDetalhes.name}" style="background-color: ${colors[pokemonDetalhes.types[0].type.name]}">
                <div>
                    <img src="${pokemonDetalhes.sprites.front_default}" alt="${pokemonName}">
                </div>
                <p>${pokemonName}</p>
                <svg class="icon-add" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" style="margin-right: 16px;">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
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

function capitalizarPrimeiraLetra(pokemonName){
    let palavraPrimeiraLetraCapitalizada = pokemonName[0].toUpperCase() + pokemonName.slice(1)
    return palavraPrimeiraLetraCapitalizada
}

pegarTodosPokemonsPokedexUser();
verificarSeUsuarioEstaLogado();
adicionarEventoCliqueLogo();