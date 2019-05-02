var elementoAyuda;
//Ayudas a la hora de escribir
function CargarAyudas(){
  var elementos = document.getElementsByTagName('input');
  for(var i = 0; i < elementos.length; i++) {
      var elemento = elementos[i];
  
      //Hacemos que pida ayuda solo si hay ayuda para el
      if(ayudas[elemento.id] != undefined)
        elemento.onfocus = MostrarAyuda;
  }
  elementoAyuda = document.createElement("p");
  elementoAyuda.id = "elementoAyuda";
}
//Esta función solo es llamada en los elementos con ayuda
function MostrarAyuda(){
  var elemento = this;
  var ayuda = undefined;
  
  //Primero buscar ayuda en subraza
  ayuda = undefined;
  try{ayuda = Variable("ayuda",raza,subraza)[elemento.id];}
  catch{console.log("No hay ayuda definida para subraza "+subraza);}
  if(ayuda == undefined){
    try{ayuda = Variable("ayuda",raza)[elemento.id];}
    //Si no existe array de ayudas para esta raza
    catch{ayuda=undefined;}
  }
  //Si no hay ayuda específica para esa raza
  if(ayuda == undefined){
    //Cargar ayuda general
    ayuda = ayudas[elemento.id];
  }
  //Esto es porque hay que subir al li, y de ahí, al ul
  elemento.parentNode.appendChild(elementoAyuda);//, elemento.parentNode.nextSibling);
  elementoAyuda.innerHTML = ayuda;
}
function ActualizarTips(){
    var divTips = document.getElementById("Tips");
    divTips.innerHTML = "<h2>Tips para tu personaje</h2>";
    var ulTips = document.createElement("UL");
    ulTips.id="listaDeTips";
    divTips.appendChild(ulTips);
    function CrearTip(tip){
      var node = document.createElement("LI");// Create a <li> node
      var textnode = document.createTextNode(tip);// Create a text node
      node.appendChild(textnode);                              // Append the text to <li>
      ulTips.appendChild(node);     // Append <li> to <ul>
    }
    try {Variable("tips",raza).forEach(tip => {CrearTip(tip)});}
    catch {//No están hechos los tips para esta raza
        CrearTip("No están cargados los tips de esta raza");// Create a text node
    }
    try{Variable("tips",raza,subraza).forEach(tip => {CrearTip(tip)});}
    catch{CrearTip("No están hechos los tips de esta subraza.");}

}
var tipsMediano = [
    "Suertudo: "+
    "Cuando obtienes un 1 en una tirada de ataque,"+
    " prueba de característica o tirada de salvación, puedes volver"+
    " a tirar el dado y debes usar la puntuación obtenida en la nueva tirada.",
    "Valiente: Tienes ventaja en las tiradas de salvación en contra de ser asustado.",
    "Agilidad Mediana: Puedes moverte a través del espacio de cualquier criatura que sea de un tamaño mayor que el tuyo."
];
var tipsMedianoPiesLigeros = [
  "Sigiloso por Naturaleza: Puedes intentar esconderte incluso cuando solamente estás cubierto tras una criatura que"+
  " es al menos un tamaño mayor que tú."
];
var tipsMedianoFornido = [
  "Resistencia Fornida. Tienes ventaja en tiradas de salvación contra veneno, y tienes resistencia contra daño de veneno."
]
var ayudas = {
  nombrePersonaje: "El nombre de tu personaje, ejemplo Chicho",
  alineacion: "Tu personaje es bueno o malo?",
  nombreJugador: "Tu nombre, como por ejemplo: Lau o luxlp",
  //Características
  destreza:"Que tan ágil eres",
  constitucion:"Que tan resistente eres",
  carisma:"Cualidad o don natural para atraer a los demás por su presencia, su palabra o su personalidad",
  //Estado
  velocidad:"Velocidad a pie, usada para calcular movimiento en los turnos",
  //Monedas
  monedasDeOro: "Entregá tu tesorito ;)",
  monedasDeCobre: "Si juntas 10, llegas a una moneda de plata",
  //Personalización
  edad:"Cuántas veces sopló las velitas tu personaje?",
  altura:"Cuántos metros tienes?",
  ojos:"Ojito con perder un ojo o.O",
  piel:"El tipo o color de piel de tu personaje",
  cabello:"Recomiendo comprar shampoo barato y sin perfume. Bañate"
};
var ayudaMediano = {
  //Principal
  alineacion:"Los medianos son una gente afable y alegre. Aprecian las bondades de la familia y la amistad."+
  " Sienten lástima fácilmente y odian ver a cualquier ser vivo sufriendo."+
  " Son generosos, y no tendrán ningún problema en compartir sus bienes incluso en tiempos difíciles",
  //Característica
  destreza:"Medianos + 2 en destreza.",
  //Monedas
  monedasDeOro:"Incluso el más rico de los medianos mantiene sus tesoros bajo llave en una bodega en lugar de mostrarlos"+
  "a la vista de todos",
  //Personalización
  ojos:"El color de ojos de los medianos suele ser castaño o color avellana",
  piel:"La piel de los medianos va desde la tez morena a la pálida con tonos sonrosados",
  cabello:"El pelo de los medianos es normalmente castaño o  castaño claro y ondulado"
};
var ayudaMedianoPiesLigeros = {
  carisma:"Medianos pies ligeros, +1"
}
var ayudaMedianoFornido = {
  constitucion:"Medianos fornidos, +1"
}
//Humano
var ayudaHumano = {
  //Principal
  alineacion: "Los humanos tienden a no tener un alineamiento concreto. En ellos se puede encontrar"+
  " tanto lo mejor como lo peor.",
  //Estado
  velocidad: "Los humanos suelen tener una velocidad a pie de 30",
  //Personalización
  edad: "Los humanos alcanzan la madurez cerca de la veintena y rara vez llegan a vivir un siglo completo.",
  altura: "Los humanos rondan entre los 1.5 y los 1.8 metros, su tamaño es mediano"
}
//Dracónido
var ayudaDraconido = {
  //Principal
  nombrePersonaje:"Los dracónidos ponen el nombre de su clan al principio como marca de honor",
  alineacion:"La conducta de cada dracónido refleja el honor de su clan y traer el deshonor al clan "+
  "puede llevar a la expulsión y el exilio",
  //Personalización
  edad:"Los dracónidos jóvenes crecen rápidamente. Caminan horas después de nacer y alcanzan el tamaño y desarrollo "+
  "de un niño humano de 10 años a los 33, alcanzan la adultez a los 15. Viven alrededor de 80 años",
  altura:"Son altos y su constitución es fuerte, a menudo cerca de los 6 pies y medio (1.8 m).",
  peso:"Los dracónidos pesan 300 libras o más.",
  piel:"Sus pequeñas y finas escamas normalmente son del color del bronce o el latón, algunas veces "+
  "tomando tonos escarlata, óxido, oro o cobre verdoso."
}
var tipsDraconido = [
  "Ascendencia Dracónica. Tienes ascendencia dracónica, elige un tipo de dragón de la tabla. "+
  "Tu arma de aliento y tu resistencia al daño están determinados por el tipo de dragón, tal como se muestra en la tabla.",
  "Arma de Aliento. Puedes usar tu acción para exhalar energía destructiva. Tu ascendencia dracónica determina el tamaño, "+
  "forma y tipo de daño de la exhalación.",
  "Cuando usas tu arma de aliento, todas las criaturas en el área de la exhalación deben hacer una tirada de salvación, "+
  "el tipo de la cual está determinado por tu ascendencia dracónica. La CD para esta tirada de salvación es 8 + tu "+
  "modificador de Constitución + tu bono de competencia. Una criatura recibe 2d6 de daño si falla la tirada y la mitad "+
  "de ese daño si la supera. El daño se incrementa a 3d6 a nivel 6, 4d6 a nivel 11 y 5d6 a nivel 16.",
  "Tras usar tu arma de aliento no puedes volver a usarla hasta completar un descanso corto o prolongado",
  "Resistencia al Daño. Tienes resistencia a un tipo de daño asociado con tu ascendencia dracónica"
];
//Gnomo
var ayudaGnomo = {
  //Principal
  nombrePersonaje:"Los gnomos aman los nombres, y la mayoría tienen media docena o más. La madre del gnomo, "+
  "su padre, el anciano del clan, sus tías y sus tíos, cada uno le pondrán al gnomo un nombre "+
  "y varios apodos y que con el tiempo algunos podrían quedarse, o no",
  alineacion:"Los gnomos poseen buen corazón e incluso aquellos que son bromistas son más juguetones que mezquinos.",
  //Equipamiento
  monedasDeOro :"Algunos gnomos se toman las aventuras como una forma rápida, aunque peligrosa, de hacerse ricos.",
  //Personalización
  edad:"Los gnomos maduran a la misma velocidad que los humanos, y se espera de ellos que entren en "+
  "la edad adulta alrededor de los 40 años. Pueden llegar a vivir 350 e incluso 500 años",
  altura:"Los gnomos miden de media 1 metro.",
  peso:"Los gnomos pesan entre 18 y 20 kilogramos."
}
var tipsGnomo = [
  "Visión en la Oscuridad: Acostumbrado a vivir bajo tierra, tienes una visión superior en condiciones "+
  "de oscuridad y penumbra. Puedes ver en luz tenue dentro de 60 pies (18 m) como si estuviera "+
  "bien iluminado, y en la oscuridad como si hubiese luz tenue. No puedes discernir colores en la "+
  "oscuridad, tan sólo formas y sombras.",
  "Astucia Gnoma: Obtienes ventaja en todas tus tiradas de salvación de Inteligencia, Sabiduría y Carisma contra magia."
]