function cadastro(){
  alertSucesso('Cadastro realizado com sucesso!');
}

function emailInvalido() {
  alertErro('E-mail inválido!');
}

function senhaInvalida() {
  alertErro('A senha precisa ter mais que 5 caracteres!');
}

function cadastroErro(){
  alertErro('Erro ao efetuar Cadastro!');
}


function loginSucesso(){
  alertSucesso('Login efetuado com sucesso!');
}

function loginErro(){
  alertErro('Erro ao efetuar login | Senha ou email inválido! \n Se o erro persistir tente fazer o cadastro novamente :)');
}


function pickSucesso(){
  alertSucesso('Musica escolhida com sucesso');
}

function pickErro(){
  alertErro('Musica já escolhida por outro usuario :) \n Entre na sessão de votação e a escolha!');
}


function votoSucesso(){
  alertSucesso('Votado com sucesso! \n Lembrando que seu voto só será computado uma vez.');
}

function votoErro(){
  alertErro('Erro ao votar :( Tente mais tarde.');
}

function sugestaoSucesso(){
  alertSucesso('Sucesso ao enviar sugestão :)');
}

function sugestaoErro(){
  alertErro('Erro ao enviar sugestão, tente mais tarde :(');
}

function filtroVazio(){
  alertErro('Não temos nenhum registro para essa pesquisa :(');
}

function emailEncontrado(bool){
  if(bool){
    alertSucesso('E-mail encontrado :)')
  }else{
    alertErro('E-mail não encontrado :( Tente fazer um novo cadastro com o mesmo.');
  }

}

function resetPassSucesso(str){
  alertSucesso(str)
}

function resetPassErro(str){
  alertErro(str)
}

function alertSucesso(str){
  swal({
    text: str,
    icon: "success",
    button: {
      text: "Ok",
    },
  })
}


function alertNormal(str){
  swal({
    text: str,
    button: {
      text: "Ok",
    },
  })
}


function alertErro(str){
  swal({
    text: str,
    icon: "error",
    button: {
      text: "Ok",
    },
  })
}

function resetSearch(){
  document.getElementById("inputSearchAll").value = '';
}

function playlistSemMusica() {
  alertNormal('Até o momento nenhuma música foi posta nessa playlist. \n Seja o primeiro a fazer isso acessando a opção Ecolha sua Música :)')
}
