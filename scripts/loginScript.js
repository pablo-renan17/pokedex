const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function adicionarEventoCliqueBtnCadastrar() {
  const btnCadastro = document.querySelector("#btn-cadastro");
  btnCadastro.addEventListener("click", () => {
    window.location.href = "/html/cadastro.html";
  });
}

function pegarEmailESenhaInput() {
  const inputs = document.querySelectorAll("input");
  const emailUser = inputs[0].value;
  const senhaUser = inputs[1].value;

  return { emailUser, senhaUser };
}

function pegarTokenEId() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("idUser");

  return { token, id };
}

function adicionarEventoSubmitForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { emailUser, senhaUser } = pegarEmailESenhaInput();
    verificarSeUsuarioExiste(emailUser, senhaUser);
  });
}

async function verificarSeUsuarioExiste(emailUser, senhaUser) {
  const verificarUsuario = await fetch(`http://localhost:3001/login/`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      email: emailUser,
      password: senhaUser,
    }),
  });
  if (verificarUsuario.status === 400) {
    return;
  } else {
    const result = await verificarUsuario.json();
    adicionarTokenEIdLocalStorage(result.accessToken, result.user.id);
    redirecionarParaPokedex();
  }
}

function adicionarTokenEIdLocalStorage(token, id) {
  let userIdEToken = {
    userToken: token,
    userId: id,
  };
  localStorage.setItem("userInfo", JSON.stringify(userIdEToken));
}

function redirecionarParaPokedex() {
  window.location.href = "http://127.0.0.1:5500/index.html";
}

adicionarEventoCliqueBtnCadastrar();
adicionarEventoSubmitForm();
