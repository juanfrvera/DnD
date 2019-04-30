var inputs =
[
    //--Principales
    'nombrePersonaje','alineacion','experiencia','nombreJugador',
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
    'edad','altura','peso','ojos','piel','cabello'
]
var selects =
[
    'raza','clase'
]
var listaHabilidades = "";

//Cuando todos los elementos de la página fueron cargados
window.onload = function(){
    inputs.forEach(function(nombre){Cargar(nombre)});
    selects.forEach(function(nombre){Cargar(nombre)});
    listaHabilidades = localStorage.getItem("listaHabilidades");
    if(listaHabilidades != null && listaHabilidades.length > 0){
        listaHabilidades = listaHabilidades.split(",");
        EscribirHabilidades();
    }

    //eval(document.getElementById('clase').value + 'Cantidad') );
}

//Al actualizar o cerrar la página
window.onbeforeunload = function(){
    inputs.forEach(function(nombre){Guardar(nombre)});
    selects.forEach(function(nombre){Guardar(nombre)});

    localStorage.setItem("listaHabilidades",listaHabilidades);

    return null;
}

var cantidadHabilidades;
var divHabilidades;
function ElegirHabilidades(){
    var clase = document.getElementById("clase").value;
    cantidadHabilidades = eval(clase+'Cantidad');
    divHabilidades = document.getElementById("Habilidades");
    divHabilidades.innerHTML = '<h4>Habilidades<h4/>';
    divHabilidades.innerHTML += '<p>Elige '+cantidadHabilidades+' habilidades:</p>';
    divHabilidades.innerHTML += '<ul id="listaHabilidades"></ul>';
    var ul = document.getElementById("listaHabilidades");
    var habilidadesElegibles = eval(clase+'Habilidades');
    if(habilidadesElegibles.length == 0)
        habilidadesElegibles = habilidades;
    else{
        for(i = 0; i < habilidadesElegibles.length; i++){
            habilidadesElegibles[i] = habilidades[habilidadesElegibles[i]];
        }
    }
        
    habilidadesElegibles.forEach(function(habilidad){
        ul.innerHTML+='<li><input name="habilidad" type="checkbox" value="'+habilidad+'">'+habilidad+'</li>'
    });

    divHabilidades.innerHTML += '<button onclick="AceptarHabilidades()">Aceptar</button>'
}

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
    if(habilidadesElegidas == cantidadHabilidades){
       EscribirHabilidades();
    }
    else
        alert("Por favor elige "+cantidadHabilidades+" habilidades.");
}
function EscribirHabilidades(){
    divHabilidades = document.getElementById("Habilidades");

    divHabilidades.innerHTML = '<h4>Habilidades</h4>';
    divHabilidades.innerHTML += '<ul id="listaHabilidades"></ul>';
    var ul = document.getElementById("listaHabilidades");
    
    listaHabilidades.forEach(function(habilidad){
        ul.innerHTML += '<li>'+habilidad+'</li>';
    })

    divHabilidades.innerHTML += '<button onclick="ElegirHabilidades()">Cambiar</button>';
}