const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};


function adicionarEventoCliqueBtnLogar(){
    const btnLogin = document.querySelector("#btn-login");
    btnLogin.addEventListener("click",()=>{
        window.location.href = "/html/login.html"
    });
}

function pegarEmailESenhaInput(){
    const inputs = document.querySelectorAll("input");
    const emailUser = inputs[0].value;
    const senhaUser = inputs[1].value;
    
    return {emailUser, senhaUser};
}

function adicionarEventoSubmitForm(){
    const form = document.querySelector("form");
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        postUsuario();
    }); 
}

async function postUsuario(){
    let {emailUser, senhaUser} = pegarEmailESenhaInput();
    console.log(emailUser,senhaUser);
    try {
        let adicionarUsuario = await fetch("http://localhost:3001/users/",{
            method: "POST",
            headers: header,
            body: JSON.stringify({
                email: emailUser,
                password: senhaUser
            })
        });
        console.log("Usuario Criado Com Sucesso!");
    } catch (error) {
        console.log("Erro!!", error);
    }
}

adicionarEventoCliqueBtnLogar();
adicionarEventoSubmitForm()