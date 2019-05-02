var cantidadHabilidades;
var divHabilidades;
//Muestra las habilidades elegibles por la clase junto con checkbox para elegir
function ElegirHabilidades(){
    //Obtener cantidad de habilidades elegibles según la clase
    cantidadHabilidades = eval(clase+'Cantidad');
    //Obtener referencia al div de habilidadess
    divHabilidades = document.getElementById("Habilidades");
    divHabilidades.innerHTML = '<h2>Habilidades<h2/>';
    divHabilidades.innerHTML = '<p>Como eres un '+clase+' puedes elegir '+
    cantidadHabilidades+' de las siguientes habilidades: </p>';
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
    if(habilidadesElegidas == cantidadHabilidades){
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

//Cada clase puede tener ciertas Habilidades
var habilidades = [
    'Acrobacias (Destreza)',//0
    'Manejo de animales (Sabiduría)',//1
    'Arcana (Inteligencia)',//2
    'Atletismo (Fuerza)',//3
    'Engaño (Carisma)',//4
    'Historia (Inteligencia)',//5
    'Perspicacia (Sabiduría)',//6
    'Intimidación (Carisma)',//7
    'Investigación (Inteligencia)',//8
    'Medicina (Sabiduría)',//9
    'Naturaleza (Inteligencia)',//10
    'Percepción (Sabiduría)',//11
    'Actuación (Carisma)',//12
    'Persuación (Carisma)',//13
    'Religión (Inteligencia)',//14
    'Juego de manos (Destreza)',//15
    'Sigilo (Destreza)',//16
    'Supervivencia (Sabiduría)'//17
]
//---barbaro
//Skills: Choose two from Animal Handling, Athletics,Intimidation, Nature, Perception, and Survival
var barbaroCantidad = 2
var barbaroHabilidades = [1, 3, 10, 11, 17]
//---bardo
//Skills: Choose any three
var bardoCantidad = 3
var bardoHabilidades = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
//---cleric
//Skills: Choose two from History, lnsight, Medicine,Persuasion, and Religion
var clerigoCantidad = 2
var clerigoHabilidades = [5, 6, 9, 13, 14]
//---druida
//Skills: Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception,Religion, and Survival
var druidaCantidad = 2
var druidaHabilidades = [2, 1, 6, 9, 10, 11, 14, 17]
//---figther
//Skills: Choose two skills from Acrobatics, Animal Handling, Athletics, History, Insight, intimidation,Perception, and Survival
var guerreroCantidad = 2
var guerreroHabilidades = [0, 1, 3, 5, 6, 7, 11, 17]
//---Monje
//Skills: Choose two from Acrobatics, Athletics, History, lnsight, Religion, and Stealth
var monjeCantidad = 2
var monjeHabilidades = [0, 3, 5, 6, 14, 16]
//---Paladin
//Skills: Choose two from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion
var paladinCantidad = 2
var paladinHabilidades = [3,6,7,9,13,14]
//---Ranger
//Skills: Choose three from Animal Handling, Athletics, Insight, [nvestigation, Nature, Perception, Stealth, and Survival
var exploradorCantidad = 3
var exploradorHabilidades = [1,3,6,8,10,11,16,17]
//---Picaro
//Skills: Choose four from Acrobatics, Athletics,Deception, Insight, Intimidation, Investigation, Perception, Pcrformance, Persuasion. Sleight of Hanel, anel Stealth
var picaroCantidad = 4
var picaroHabilidades = [0,3,4,6,7,8,11,12,13]
//---hechicero
//Skills: Choose two from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion
var hechiceroCantidad = 2
var hechiceroHabilidades = [2,4,6,7,13,14]
//---Brujo
//Skills: Choose lwo skills from Arcana, Deceplion, Hislory, !nlimidalion, Invesligalion, Nalure, and Religion
var brujoCantidad = 2
var brujoHabilidades = [2,4,5,7,8,10,14]
//---Mago
//Skills: Choose two from Areana, History, Insight, Investigation, Medicine, and Religion
var magoCantidad = 2
var magoHabilidades = [2,5,6,8,9,14]