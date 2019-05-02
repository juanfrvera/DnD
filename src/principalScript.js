var inputs =
[
    //--Principales
    'nombrePersonaje','subclase','alineacion','experiencia','nombreJugador',
    //--Cualidades
    'fuerza','destreza','constitucion','inteligencia','sabiduria','carisma',
    //--modificadorDestreza
    'modificadorFuerza','modificadorDestreza','modificadorConstitucion','modificadorInteligencia','modificadorSabiduria','modificadorCarisma',
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
    CalcularSumas();
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

var cantidadHabilidades;
var divHabilidades;

//Muestra las habilidades elegibles por la clase junto con checkbox para elegir
function ElegirHabilidades(){
    //Obtener clase del select con id clase
    var clase = document.getElementById("clase").value;
    //Obtener cantidad de habilidades elegibles según la clase
    cantidadHabilidades = eval(clase+'Cantidad');
    cantidadHabilidades >= 0;
    //Obtener referencia al div de habilidadess
    divHabilidades = document.getElementById("Habilidades");
    divHabilidades.innerHTML = '<h2>Habilidades<h2/>';
    divHabilidades.innerHTML = '<p>Como eres un '+clase+' te corresponde elegir '+
    cantidadHabilidades+' de las siguientes habilidades más las que considere necesaria de tu historia: </p>';
    divHabilidades.innerHTML += '<ul id="listaHabilidades"></ul>';
    var ul = document.getElementById("listaHabilidades");
    //Obtener lista de indices según la clase
    var indicesClase = eval(clase+'Habilidades');
    var habilidadesElegibles = [];
    //Que la lista proveída por la clase no tenga habilidades significa que puede elgir de la lista completa
    if(indicesClase.length == 0)
        habilidadesElegibles = habilidades;
    else{
        for(let i = 0; i < indicesClase.length; i++){
            habilidadesElegibles.push(habilidades[indicesClase[i]]);
        }
    }

    habilidadesElegibles.forEach(function(habilidad){
        ul.innerHTML+='<li><input class="checkbox" name="habilidad" type="checkbox" value="'+habilidad+'">'+habilidad+'</li>'
    });

    divHabilidades.innerHTML += '<button onclick="AceptarHabilidades()">Aceptar</button>'
}

//Acepta las habilidades elegidas
function AceptarHabilidades(){
    var checkboxes = document.getElementsByName("habilidad");
    var habilidadesElegidas = 0;
    listaHabilidades = [];
    checkboxes.forEach(function(checkbox){
        if(checkbox.checked){
            habilidadesElegidas += 1;
            listaHabilidades.push(checkbox.value);
        }
    })
    if(habilidadesElegidas >= -1){
       EscribirHabilidades();
    }
    else
        alert("Por favor elige "+cantidadHabilidades+" habilidades.");
}

//Escribe las habilidades que han sido elegidas en la planilla
function EscribirHabilidades(){
    divHabilidades = document.getElementById("Habilidades");

    divHabilidades.innerHTML = '<h2>Habilidades</h2>';
    divHabilidades.innerHTML += '<ul id="listaHabilidades"></ul>';
    var ul = document.getElementById("listaHabilidades");

    listaHabilidades.forEach(function(habilidad){
        ul.innerHTML += '<li>'+habilidad+'</li>';
    })

    divHabilidades.innerHTML += '<button onclick="ElegirHabilidades()">Cambiar</button>';
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
  
  var subrazas = Variable(raza,"SubRazas");

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
function SubRazaCambiada(select){
  subraza = select.value;
  ActualizarTips();
  CalcularSumas();
}

var caracteristicasRaza = [];
var caracteristicasSubRaza = [];
function CalcularSumas(){
  var modificables = document.getElementsByClassName("sumable");
  try{caracteristicasRaza = Variable(raza,"Caracteristicas");}
  catch{console.log("No hay característica definida para "+raza);}
  try{caracteristicasSubRaza = Variable(raza,subraza,"Caracteristicas");}
  catch{console.log("No hay característica definida para "+subraza);}
  for(let i = 0; i < modificables.length; i++) {
    var elemento = modificables[i];
    CaracteristicaCambiada(elemento);
  }
}
//Devuelve el valor de suma al nombre de característica indicado
function SumaCaracteristica(nombre){
  var caracteristica = caracteristicasSubRaza[nombre];
  //Si no se encontró modificador en la subraza, buscar en la raza
  if(caracteristica == undefined){
    caracteristica = caracteristicasRaza[nombre];
    if(caracteristica == undefined)
      caracteristica = 0;
  }
  return caracteristica;
}
function CaracteristicaCambiada(caracteristica){
  var resultado = document.getElementById("suma"+Capitalize(caracteristica.id));
  var suma = SumaCaracteristica(caracteristica.id);
  resultado.innerHTML = ("+ "+suma+" = ") + (parseInt(caracteristica.value) + suma);
}
function MostrarModificadores(){}