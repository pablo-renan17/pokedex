const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function adicionarEventoCliqueBtnCadastrar(){
    const btnCadastro = document.querySelector("#btn-cadastro");
    btnCadastro.addEventListener("click",()=>{
        window.location.href = "/html/cadastro.html"
    });
}

function pegarEmailESenhaInput(){
    const inputs = document.querySelectorAll("input");
    const emailUser = inputs[0].value;
    const senhaUser = inputs[1].value;
    
    return {emailUser, senhaUser};
}

function pegarTokenEId(){
    const token = localStorage.getItem("token");
    const id    = localStorage.getItem("idUser");

    return {token, id}
}

function adicionarEventoSubmitForm(){
    const form = document.querySelector("form");
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        const {emailUser, senhaUser} = pegarEmailESenhaInput();
        verificarSeUsuarioExiste(emailUser, senhaUser);
    })
}

async function verificarSeUsuarioExiste(emailUser, senhaUser){
    try {
        const verificarUsuario = await fetch(`http://localhost:3001/login/`,{
            method: "POST",
            headers: header,
            body: JSON.stringify({
                email: emailUser,
                password: senhaUser
            })
        });
        console.log(verificarUsuario);
    } catch (error) {
        console.log(error)
    }
}

adicionarEventoCliqueBtnCadastrar();
adicionarEventoSubmitForm();