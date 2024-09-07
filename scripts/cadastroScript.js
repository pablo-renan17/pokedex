const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function adicionarEventoCliqueBtnLogar() {
  const btnLogin = document.querySelector("#btn-login");
  btnLogin.addEventListener("click", () => {
    window.location.href = "/html/login.html";
  });
}

function pegarEmailSenhaConfirmarEmailInput() {
  const inputs = document.querySelectorAll("input");
  const emailUser = inputs[0].value;
  const emailConfirmar = inputs[1].value;
  const senhaUser = inputs[2].value;

  return { emailUser, emailConfirmar, senhaUser };
}

function adicionarEventoSubmitForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    postUsuario();
  });
}

async function postUsuario() {
  let { emailUser, emailConfirmar, senhaUser } =
    pegarEmailSenhaConfirmarEmailInput();

  if (
    verificarSeOsCamposEstaoPreenchidos(emailUser, emailConfirmar, senhaUser)
  ) {
    criarModalCadastroErro("Todos os campos devem estar preenchidos.");
    return;
  }

  if (emailUser !== emailConfirmar) {
    criarModalCadastroErroEmailsDiferentes(
      "Os emails estão diferentes, por favor coloque emails iguais."
    );
    return;
  }

  try {
    let adicionarUsuario = await fetch("http://localhost:3001/users/", {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        email: emailUser,
        password: senhaUser,
      }),
    });
    criarModalCadastroSucesso();
  } catch (error) {
    console.log("Erro!!", error);
  }
}

function verificarSeOsCamposEstaoPreenchidos(
  emailUser,
  emailConfirmar,
  senhaUser
) {
  if (!emailUser || !emailConfirmar || !senhaUser) {
    return true;
  }

  return false;
}

function criarModalCadastroSucesso() {
  const body = document.body;
  body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal-wrapper">
      <div class="modal">
        <div class="modal-header" style="background-color: var(--color-green)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            fill="currentColor"
            class="bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
            />
            <path
              d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"
            />
          </svg>
          <h2>Atenção</h2>
          <button class="modal-button">X</button>
        </div>
        <div class="modal-body">
          <p>
            O usuario foi cadastrado com sucesso!
            Se redirecione para a tela de login para logar.
          </p>
        </div>
      </div>
    </div>
    `
  );

  adicionarEventoBtnFecharModal();
}

function criarModalCadastroErro(mensagem) {
  const body = document.body;
  body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal-wrapper">
      <div class="modal">
        <div class="modal-header" style="background-color: var(--color-red)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            fill="currentColor"
            class="bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
            />
            <path
              d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"
            />
          </svg>
          <h2>Atenção</h2>
          <button class="modal-button">X</button>
        </div>
        <div class="modal-body">
          <p>
            ${mensagem}
          </p>
        </div>
      </div>
    </div>
    `
  );

  adicionarEventoBtnFecharModal();
}

function adicionarEventoBtnFecharModal() {
  const buttonClose = document.querySelector(".modal-button");
  buttonClose.addEventListener("click", () => {
    const modalWrapper = document.querySelector(".modal-wrapper");
    modalWrapper.remove();
  });
}

adicionarEventoCliqueBtnLogar();
adicionarEventoSubmitForm();
