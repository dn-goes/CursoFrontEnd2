//situacao de aprendizagem 01 - Array e Matrix
//Calculadora de Media
const prompt = require("prompt-sync")();
var notas = []; //declaracao de um vetor

//funcao para adicionar nota em meida 
function adicionarNota() {
    let notas = Number(prompt("Iforme a nota: "))
    notas.push(nota);
    console.log("Nota Adionada com Sucesso ");
}
//funcao para calcular a media 
function calcularMedia() {
    if(notas.length === 0) return;
    let soma = notas.reduce((x,y)=>x+y);
    let mediaFinal = soma/notas.length;
    console.log("A soma é "+mediaFinal);
}

//menu de opcoes
function menuOpcoes() {
    let continuar = true;
    while(continuar) { 
    console.log("===Calculadora Media===");
    console.log("|1. Adicionar Nota    |");
    console.log("|2. Calcular Media   |");
    console.log("|3. Sair    |");
    console.log("======================|");
    let operacao = prompt("Informe a Opção Desejada")
    switch(operacao){
        case "1": adicionarNota();
        break;
        case"2": calcularMedia();
        break;
        case"3": continuar = false;
        break;
        default: console.log("Opção Inválida");
        break;
    }//fim do swith
  }//fim do while
  console.log("Saindo...");
}//fim da function

menuOpcoes();
