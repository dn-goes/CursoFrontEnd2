//criar uma calculadora simples em JS
//import da biblioteca
const prompt = require("prompt-sync")();

//funçoes-operações
//soma
function soma(a, b){
    return (a+b);
}

function sub(a, b){ 
    return (a-b);
}

//multiplicacao
function multi(a, b){
    return (a*b);
}

//divisao
function div(a, b){
    return (a/b);
}

//menu de operacoes
function menuOperacoes(){
    console.log("===Calculadora Simples===");
    console.log("| 1. Soma               |");
    console.log("| 2. Subtração          |");
    console.log("| 3. Multiplicação      |");
    console.log("| 4. Divisão            |");
    console.log("|    =================  |");
    let operacao = prompt("Escolha a Operação Desejada: ");

    
    //entrada dos numeros
    let numero1 = Number(prompt("Digite numero 1: "));
    let numero2 = Number(prompt("Digite numero 2: "));

    let resultado;

    //condicional
    switch (operacao) {
        case "1":
          resultado = soma(numero1,numero2);
            break;

        case "2": 
          resultado = sub(numero1,numero2);
          break;

        case "3":
          resultado = multi(numero1,numero2);

        case "4": 
        if (numero2 == 0){
          console.log("Não Dividiras por Zero!!!")
          resultado = null
        }
        else {
            resultado = div (numero1,numero2);
        }
          break;

        default: 
        console.log("Operação Invalida")
            break;
    } 
    console.log ("Resultado: "+resultado);
} 
//execução do programa

var continuar = true;
while (continuar) {
    menuOperacoes();
    let Sair = prompt("1. Continuar,| 2. Sair | ")
    if (sair == "2") {
        continuar = false;
        console.log ("Saindo...")
    }
}
