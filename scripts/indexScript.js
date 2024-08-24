header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

async function pegarPokemons(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150",{
        headers: header
    });
    const result = await response.json();
    console.log(result.results);
    montarPokemons(result.results);
}
pegarPokemons();

async function montarPokemons(result){

    for(let pokemon of result){
        const resultadoPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,{
            headers: header
        });
        const responsePokemon = await resultadoPokemon.json();
        console.log(responsePokemon.sprites);

        const ulPokemons = document.querySelector("ul");
        ulPokemons.insertAdjacentHTML("beforeend",`
        <li>
            <div>
                <img src="${responsePokemon.sprites.front_default}">
            </div>
            <p>
                ${pokemon.name}
            </p>
            
        </li> 
        `);
    }
}