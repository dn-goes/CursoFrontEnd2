// dom para jogo quiz interativo 

let perguntas = [];
let proximaPergunta = 0;

//dom para buscar elementos
let perguntaElement = document.getElementById("pergunta");
let opcoesElement = document.getElementById("opcoes");
let proximaElement = document.getElementById("proxima");
let respostaElement = document.getElementById("resposta");

//fetch para pegar as perguntas do arquivo json 
fetch("perguntas.json")
    .then(response => response.json())
    .then(data =>{
        perguntas = data;
        carregarPerguntas();//funcao para carregar no html
    });

    //dom funcoes
    function carregarPerguntas(){}