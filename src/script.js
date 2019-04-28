var atributos = 
[
    //--Principales
    'nombrePersonaje','clase','raza','alineacion','fondo','experiencia','nombreJugador',
    //--Cualidades
    'fuerza','destreza','constitucion','inteligencia','sabiduria','carisma',
    //--Cualidades de salvación
    'fuerzaSalvacion','destrezaSalvacion','constitucionSalvacion',
    'inteligenciaSalvacion','sabiduriaSalvacion','carismaSalvacion',
    //--Estado
    'claseDeArmadura','iniciativa','velocidad','vidaMaxima','vidActual','hitDice',
    //--Personalizacion
    'edad','altura','peso','ojos','piel','cabello'
]

//Cuando todos los elementos de la página fueron cargados
window.onload = function(){
    atributos.forEach(function(nombre){Cargar(nombre)});
}

//Al actualizar o cerrar la página
window.onbeforeunload = function(){
    atributos.forEach(function(nombre){Guardar(nombre)});
    return null;
}
//Prueba commit
//------Funciones---------

//Al input de id "nombre" le asigna el valor guardado con la clave "nombre"
function Cargar(nombre){
    document.getElementById(nombre).value = localStorage.getItem(nombre);
}

//Guarda con clave "nombre" el valor que está en el input de id "nombre"
function Guardar(nombre){
    localStorage.setItem(nombre,document.getElementById(nombre).value);
}