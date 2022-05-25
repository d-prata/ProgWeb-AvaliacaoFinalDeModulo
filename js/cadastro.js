let inputEmail = document.querySelector("#emailcadastro");
let labelEmail = document.querySelector("#label-input-email-cadastro");
let validaEmail = false;

let inputSenha = document.querySelector("#senhacadastro");
let labelSenha = document.querySelector("#label-input-senha-cadastro");
let validaSenha = false;

let inputRepeteSenha = document.querySelector("#repetesenha");
let labelRepeteSenha = document.querySelector(
  "#label-input-repete-senha-cadastro"
);
let validaRepeteSenha = false;

let formCadastro = document.querySelector("#formcadastro");

let regraSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// *EVENTOS:

inputEmail.addEventListener("keyup", verificarEmail);
inputSenha.addEventListener("keyup", verificarSenha);
inputRepeteSenha.addEventListener("keyup", confirmarSenha);
formCadastro.addEventListener("submit", verificarInputs);

// *FUNÇÕES:

function verificarEmail() {
  if (inputEmail.value.length < 10) {
    labelEmail.style.color = "red";
    labelEmail.innerHTML = "* Insira um e-mail válido:";
    inputEmail.style.border = "5px solid red";
    validaEmail = false;
  } else {
    labelEmail.style.color = "lime";
    labelEmail.innerHTML = "E-mail";
    inputEmail.style.border = "5px solid lime";
    validaEmail = true;
  }
}

function verificarSenha() {
  let senhaValida = inputSenha.value.match(regraSenha);

  if (inputSenha.value.length < 8) {
    labelSenha.style.color = "red";
    labelSenha.innerHTML = "* A senha deve conter no mínimo 8 caracteres:";
    inputSenha.style.border = "0.2px solid red";
    validaSenha = false;
  } else if (senhaValida === null) {
    labelSenha.innerHTML =
      "* A senha deve conter uma letra maiuscula e caracter especial:";
    validaSenha = false;
  } else {
    labelSenha.style.color = "lime";
    labelSenha.innerHTML = "Senha";
    inputSenha.style.border = "5px solid lime";
    validaSenha = true;
  }
}

function confirmarSenha() {
  if (inputSenha.value !== inputRepeteSenha.value) {
    labelRepeteSenha.style.color = "red";
    labelRepeteSenha.innerHTML =
      "Confirmar senha: * As senhas devem corresponder";
    inputRepeteSenha.style.border = "0.2px solid red";
    validaRepeteSenha = false;
  } else {
    labelRepeteSenha.style.color = "lime";
    labelRepeteSenha.innerHTML = "Confirme a senha";
    inputRepeteSenha.style.border = "5px solid lime";
    validaRepeteSenha = true;
  }
}

function verificarInputs(e) {
  e.preventDefault();
  if (
    inputEmail.value === "" ||
    inputSenha.value === "" ||
    inputRepeteSenha.value === ""
  ) {
    alert(
      "Algo deu errado! Verifique os campos e tente novamente."
    );
    return;
  } else if (!validaEmail || !validaSenha || !validaRepeteSenha) {
    alert(
      "Campos incorretos! Verifique o preenchimento e tente novamente."
    );
    return;
  } else {
    alert("Conta cadastrada com sucesso!");
  }
  salvarLocalStorage();
}

function salvarLocalStorage() {
  let emailUser = document.querySelector("#emailcadastro").value;
  let senhaUser = inputSenha.value;
  let recadosUser = [];
  let listaUsers = buscaListaUser()
  let dadosUser = {
    emailUser,
    senhaUser,
    recadosUser,
  };

  console.log(dadosUser);
  listaUsers.push(dadosUser);

  atualizaUser()

  let irLogin = confirm("Deseja ir para a página de login?");

  if (irLogin) {
    window.location = "./login.html";
  }

  function buscaListaUser() {
    return JSON.parse(localStorage.getItem("usuario")) || [];
  }

  function atualizaUser(){
    return window.localStorage.setItem("usuario", JSON.stringify(listaUsers));
  }
}
