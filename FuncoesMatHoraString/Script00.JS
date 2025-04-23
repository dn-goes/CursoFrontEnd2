console.log(Math.sqrt(25)); //55

//potencia

console.log(Math.pow(3,2)); 
console.log(Math.pow(4,3));
console.log(Math.pow(27,1/3));

//arredondamento
//para o valor mais proximo (round)

console.log(Math.round(4.4));//4
console.log(Math.round(4.7));//5

//para o valor mais alto (ceil)

console.log(Math.ceil(4.1));//5

//para o valor mais baixo (floor)
console.log(Math.floor(4.9));//4

//Aleatorio (Random)
console.log(Math.round()); //0 => 1

//0 => 100
console.log(Math.round(Math.random()*100));
//1 => 100
console.log(Math.ceil(Math.random()*100));
//0 => 99
console.log(Math.floor(Math.random()*100));

//desfio

//0 => 50

//50 => 100

//30 => 40

resposta //0 => 50
console.log(Math.round(Math.random()*50)); 

resposta //50 => 100
console.log(Math.round(Math.random()*50+50)); 

resposta //30 => 40
console.log(Math.round(Math.random()*10+30)); 

//Max,Min,Absolute(Abs)

console.log(Math.max(1,3,6,9,2,5)); //9

console.log(Math.min(1,3,6,9,2,5)); //1

console.log(Math.Abs(-10)); //10

