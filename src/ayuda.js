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
  
  try{ayuda = eval("ayuda"+raza)[elemento.id];}
  //Si no existe array de ayuudas para esta clase
  catch{ayuda=undefined;}
  //Si no hay ayuda específica para esa clase
  if(ayuda == undefined){
    //Cargar ayuda general
    ayuda = ayudas[elemento.id];
  }
  elemento.parentNode.insertBefore(elementoAyuda, elemento.nextSibling);
  elementoAyuda.innerHTML = ayuda;
}
function ActualizarTips(){
    var divTips = document.getElementById("Tips");
    divTips.innerHTML = "<h2>Tips para tu personaje</h2>";
    var ulTips = document.createElement("UL");
    ulTips.id="listaDeTips";
    divTips.appendChild(ulTips);
    try {
        var tips = eval("tips"+raza);
        tips.forEach(tip => {
            var node = document.createElement("LI");// Create a <li> node
            var textnode = document.createTextNode(tip);// Create a text node
            node.appendChild(textnode);                              // Append the text to <li>
            ulTips.appendChild(node);     // Append <li> to <ul>
        });
    } catch {//No están hechos los tips para esta raza
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode("No están cargados los tips de esta raza");// Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        ulTips.appendChild(node);     // Append <li> to <ul>
    }
}
var tipsmediano = [
    "Suertudo: "+
    "Cuando obtienes un 1 en una tirada de ataque,"+
    " prueba de característica o tirada de salvación, puedes volver"+
    " a tirar el dado y debes usar la puntuación obtenida en la nueva tirada.",
    "Valiente: Tienes ventaja en las tiradas de salvación en contra de ser asustado.",
    "Agilidad Mediana: Puedes moverte a través del espacio de cualquier criatura que sea de un tamaño mayor que el tuyo."
];
var ayudas = {
    nombrePersonaje: "El nombre de tu personaje, ejemplo Chicho",
    alineacion: "Tu personaje es bueno o malo?",
    nombreJugador: "Tu nombre, como por ejemplo: Lau o luxlp",
    //Monedas
    monedasDeOro: "Entregá tu tesorito ;)",
    monedasDeCobre: "Si juntas 10, llegas a una moneda de plata",
    //Personalización
    ojos:"Ojito con perder un ojo o.O",
    piel:"El tipo o color de piel de tu personaje",
    cabello:"Recomiendo comprar shampoo barato y sin perfume. Bañate"
  };
  var ayudamediano = {
    //Principal
    alineacion:"Los medianos son una gente afable y alegre. Aprecian las bondades de la familia y la amistad."+
    " Sienten lástima fácilmente y odian ver a cualquier ser vivo sufriendo."+
    " Son generosos, y no tendrán ningún problema en compartir sus bienes incluso en tiempos difíciles",
    //Monedas
    monedasDeOro:"Incluso el más rico de los medianos mantiene sus tesoros bajo llave en una bodega en lugar de mostrarlos"+
    "a la vista de todos",
    //Personalización
    ojos:"El color de ojos de los medianos suele ser castaño o color avellana",
    piel:"La piel de los medianos va desde la tez morena a la pálida con tonos sonrosados",
    cabello:"El pelo de los medianos es normalmente castaño o  castaño claro y ondulado"
  };