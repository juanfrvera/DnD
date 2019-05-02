var inputs =
[
    //--Principales
    'nombrePersonaje','subclase','alineacion','experiencia','nombreJugador',
    //--Cualidades
    'fuerza','destreza','constitucion','inteligencia','sabiduria','carisma',
    //--Cualidades de salvación
    'fuerzaSalvacion','destrezaSalvacion','constitucionSalvacion',
    'inteligenciaSalvacion','sabiduriaSalvacion','carismaSalvacion',
    //--Estado
    'claseDeArmadura','iniciativa','velocidad','vidaMaxima','vidaActual','hitDice',
    //--Monedas
    'monedasDeOro', 'monedasDePlata', 'monedasDeCobre',
    //--Personalizacion
    'edad','altura','peso','ojos','piel','cabello',
    //--Hechizos
    'listaHechizos','areaHechizos',
    //--idiomas
    'idiomaConocido1','idiomaConocido2',
    //--Otras capacidades
    'sabiduriaPasiva','capacidades'
]
var listaHabilidades = "";

//Cuando todos los elementos de la página fueron cargados
window.onload = function(){
    inputs.forEach(function(nombre){Cargar(nombre)});
    raza = Cargar('raza');
    CargarSubRazas();//Cargar en este orden para que quede bien
    subraza = Cargar('subraza');
    clase = Cargar('clase');
    CargarArmas();
    listaHabilidades = localStorage.getItem("listaHabilidades");
    if(listaHabilidades != "null" && listaHabilidades.length > 0){
        listaHabilidades = listaHabilidades.split(",");
        EscribirHabilidades();
    }
    CargarAyudas();
    ActualizarTips();
    EnlazarModificadores();
}

//Al actualizar o cerrar la página guardar
window.onbeforeunload = function(){
    inputs.forEach(function(nombre){Guardar(nombre)});
    Guardar('raza');
    Guardar('subraza');
    Guardar('clase');
    GuardarArmas();
    localStorage.setItem("listaHabilidades",listaHabilidades);

    return null;
}

var cantidadArmas = 1;
var ulArmas;
function AgregarArma(){
    GuardarArmas();

    cantidadArmas++;
    var li = document.createElement("li");
    ulArmas.innerHTML += "<li>"+
        "<h3>Arma "+cantidadArmas+"</h3>"+
        '<input type="text" id="nombreArma'+cantidadArmas+'"/ >'+
        "<p>Daño de ataque</p>"+
        '<input type="number" id="ataqueArma'+cantidadArmas+'" />'+
        "<p>Tipo de daño</p>"+
        '<input type="text" id="tipoArma'+cantidadArmas+'" />'+
    "</li>";

    CargarDatosArmas();
}
function QuitarArma(){
    if(cantidadArmas > 1){
      localStorage.removeItem("nombreArma"+cantidadArmas);
      localStorage.removeItem("ataqueArma"+cantidadArmas);
      localStorage.removeItem("tipoArma"+cantidadArmas);

      cantidadArmas--;
      document.location.reload();
    }
    else
        alert("No se puede eliminar la primera arma");
}
function CargarArmas(){
    ulArmas = document.getElementById("listaDeArmas");

    var armasGuardadas = localStorage.getItem("cantidadArmas");
    if(armasGuardadas == "null")armasGuardadas=1;
    cantidadArmas = 1;

    CargarDatosArmas();
    for(let i = 2; i <= armasGuardadas; i++){AgregarArma();}
}
function CargarDatosArmas(){
    for(let i = 1; i <= cantidadArmas; i++){
        document.getElementById("nombreArma"+i).value = localStorage.getItem("nombreArma"+i);
        document.getElementById("ataqueArma"+i).value = localStorage.getItem("ataqueArma"+i);
        document.getElementById("tipoArma"+i).value = localStorage.getItem("tipoArma"+i);
    }
}
function GuardarArmas(){
    localStorage.setItem("cantidadArmas",cantidadArmas);

    for(let i = 1; i <= cantidadArmas; i++){
        localStorage.setItem("nombreArma"+i,document.getElementById("nombreArma"+i).value);
        localStorage.setItem("ataqueArma"+i,document.getElementById("ataqueArma"+i).value);
        localStorage.setItem("tipoArma"+i,document.getElementById("tipoArma"+i).value);
    }
}
//Carga las sub razas en el select de subrazas
function CargarSubRazas(){
  var select = document.getElementById("subraza");

  select.options.length = 0;
  
  var subrazas = eval(raza+"SubRazas");

  for (let index = 0; index < subrazas.length; index++) {
    const element = subrazas[index];
    select.options[select.options.length] = new Option(subrazas[index], subrazas[index]);
  }
}
var raza, subraza, clase;
function RazaCambiada(select){
  raza = select.value;
  ActualizarTips();
  CargarSubRazas();
}
function ClaseCambiada(select){
  clase = select.value;
  ActualizarTips();
}
function SubRazaCambiada(select){}

function EnlazarModificadores(){
  var modificables = document.getElementsByClassName("modificable");
  var modificadoresRaza = eval(raza+"Modificadores");
  var modificadoresSubRaza = eval(subraza+"Modificadores");
  for(let i = 0; i < modificables.length; i++) {
    var elemento = modificables[i];
    var nombre = elemento.parentNode.firstElementChild.innerHTML;
    var modificador = modificadoresSubRaza[nombre];
    //Si no se encontró modificador en la subraza, buscar en la raza
    if(modificador == undefined){
      modificador = modificadoresRaza[nombre];
      if(modificador == undefined)
        modificador = 0;
    }
    //Si no hay un resultado creado
    var resultado = elemento.parentNode.lastElementChild;
    //Si no había un resultado creado, crearlo
    if(resultado.className != "modificador"){
      resultado = document.createElement("p");
      resultado.className = "modificador";
      elemento.parentNode.appendChild(resultado);
    }
    resultado.innerHTML = ("+ "+modificador+" = ") + (parseInt(elemento.value) + modificador);
    elemento.onchange = function(){resultado.innerHTML = ("+ "+modificador+" = ") + (parseInt(elemento.value) + modificador);};
  }
}
function MostrarModificadores(){}