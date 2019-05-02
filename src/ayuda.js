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
  carisma:"Facilidad de trato",
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
  altura: "Los humanos rondan entre los 1.5 y los 1.8 metros, su tamaño es mediano",
  edad: "Los humanos alcanzan la madurez cerca de la veintena y rara vez llegan a vivir un siglo completo."
}