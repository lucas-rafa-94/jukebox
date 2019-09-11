function cadastro(){
  alertSucesso('Cadastro realizado com sucesso!');
}

function cadastroErro(){
  alertErro('Erro ao efetuar Cadastro');
}


function loginSucesso(){
  alertSucesso('Login efetuado com sucesso');
}

function loginErro(){
  alertErro('Erro ao efetuar login | Senha ou email inválido!');
}


function pickSucesso(){
  alertSucesso('Musica escolhida com sucesso');
}

function pickErro(){
  alertErro('Musica já escolhida por outro usuario :) Entre na sessão de votação e a escolha!');
}


function votoSucesso(){
  alertSucesso('Votado com sucesso! Lembrando que seu voto só será computado uma vez');
}

function votoErro(){
  alertErro('Erro ao votar');
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
    alertErro('E-mail não encontrado :( Tente fazer um novo cadastro com o mesmo');
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
