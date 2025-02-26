//array end matrix (vetores e matrizes)
let array = [];
let numberArray = [1,2,3,4,5,6,7,8,9];
let textArray = ["Sapato", "Bola", "Caixa"];
let mixArray = [1, "Nome", true];

//como faco para acessar os elementos(index)

console.log(textArray[1]);//Bola
console.log(numberArray[8]);//9

//contar elementos de um array 

console.log(numberArray.length);//9
console.log(textArray.length);//3

//adicionar elementos em um array
//no comeco(0) unshift
textArray.unshift("Cachorro");
console.log(textArray);

//adicionar no final - push()
textArray.push("Casa");
console.log(textArray);

//alterar o valor de elemento array
textArray[2] = "Carro"
console.log(textArray); 

//remover elementos do array
//do comeco - shift
textArray.shift();
console.log(textArray);

//do meio - splice(indice,+quantidade)
textArray.splice(1,1); //Carro
console.log(textArray);

//do fim
textArray.pop();//Casa
console.log(textArray);

//percorrer um array
for(let i=0; 1<numberArray.length; i++){
    console.log(
        "Numero["+i+"]="+numberArray[i]
 )};

//foreach
numberArray.forEach(Element => {
    console.log(Element)
});

//indexOf == Retorna o indice do elemento
console.log(mixArray.indexOf("Nome"));
console.log(numberArray.indexOf(10));




