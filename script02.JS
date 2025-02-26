//Funcoes de Texto (String)                                                                

let texto = "Aula de JavaScript";

//contar os caracteres (length)
console.log(texto.length);//18

//MAIUSCULAS e minuscula
console.log(texto.toUpperCase()); //MAIUSCULAS
console.log(texto.toLowerCase()); //minussculas

//partes do texto
//substring (inicio, fim)
console.log(texto.substring(0,4)); //Aula
//slice(Quantidade)
console.log(texto.slice(-10));//JavaScript

//substituir parte do texto
console.log(texto.replace("Java", "Type"))

//Tesoura (Trim)
let texto1 = " JavaScript ";
console.log(texto1); // "  JavaScript  "
console.log(texto1.trim());

//separar texto (split) -caracter comum
let linguagens = "JavaScript, Python, Java, C#";
let vetorlinguagens = linguagens.split(", ")
console.log(linguagens);
console.log(vetorlinguagens);

//desafio
let caracter = "Bom Dia Com Muita Alegria";
let caracterSemEspacaco = caracter.replaceAll(" ", "");
console.log(caracter);
console.log(caracter.length);
console.log(caracterSemEspacaco);
console.log(caracterSemEspacaco.length);



