// DOM -> Jogo Quiz Interativo

let perguntas = []; //vetor para armazenamento das perguntas
let perguntaAtual = 0; //índice para identificação da pergunta atual

//DOM -> elementoss

let perguntaElement = document.getElementById("pergunta");
let opcoesElement = document.getElementById("opcoes");
let proximaElement = document.getElementById("proxima");
let respostaElement = document.getElementById("resposta");

//fetch -> pegar as perguntas do arquivo Json
fetch("perguntas.json")
  .then((response) => response.json())
  .then((data) => {
    perguntas = data;
    carregarPerguntas(); //função para carregar no html
  })
  .catch((error) => console.error("Erro ao Carregar as Perguntas: ", error)); //tratamento de erros

//DOM -> funções
function carregarPerguntas() {
  respostaElement.innerText = "";
  proximaElement.disabled = true;

  //perguntas foram carregadas -> não
  if (perguntaAtual >= perguntas.length) {
    //identifica se não cheguei ao final das perguntas
    if (perguntaAtual == 0) {
      perguntaElement.innerText = "Erro ao Carregar as Perguntas";
      return;
    }
    perguntaElement.innerText = "Quiz Finalizado!";
    opcoesElement.innerHTML = "";
    proximaElement.style.display = "none";
    return;
  }
  //caso tudo certo -> perguntas carregadas
  //mostar as perguntas na tela
  let p = perguntas[perguntaAtual];
  perguntaElement.innerText = p.pergunta;
  opcoesElement.innerHTML = ""; //limpo as opções
  //preencher as opções
  p.opcoes.forEach((opcao) => {
    let btnOpcao = document.createElement("button");
    btnOpcao.innerText = opcao; //atribuir texto ao botão
    btnOpcao.classList.add("opcao"); //atribuir classe ao botão
    btnOpcao.addEventListener("click",() => verificarResposta(opcao, btnOpcao));
    opcoesElement.appendChild(btnOpcao);
  });
}

//função para verificar a resposta
function verificarResposta(opcao, btnOpcao) {
  const respostaCorreta = perguntas[perguntaAtual].resposta;
  //verificar
  if (opcao === respostaCorreta) {
    btnOpcao.classList.add("correta"); //adicionando a classe correta ao btnOpcao
    respostaElement.innerText = "Acertou!!!";
  } else {
    btnOpcao.classList.add("errada");
    respostaElement.innerText =
      "Errou!! A Resposta Correta é " + respostaCorreta;
  }
  //vou desabilitar os botões de respostas
  document.querySelectorAll(".opcao").forEach((btn) => (btn.disabled = true));
  proximaElement.disabled = false;

  proximaElement.addEventListener("click", () => {
    perguntaAtual++;
    carregarPerguntas();
  });
}
