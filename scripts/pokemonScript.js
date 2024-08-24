function eventoDeCliquePokedexLogo(){
    const pokedexIcon = document.querySelector("#pokedex2000-logo");
    pokedexIcon.addEventListener("click",()=>{
        window.location.href = "index.html"
    })
}
eventoDeCliquePokedexLogo();

async function pegarPokemon(){
    const pokemonInfo = JSON.parse(localStorage.getItem("pokemon"));
    console.log(pokemonInfo)
}
pegarPokemon();
