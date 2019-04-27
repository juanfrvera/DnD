var atributos = 
[
    'nombrePersonaje',
    'clase',
    'raza',
    'alineacion',
    'fondo',
    'experiencia',
    'nombreJugador',
    //----
    'fuerza','destreza','constitucion','inteligencia','sabiduria','carisma'
]

window.onload = function(){
    atributos.forEach(function(nombre){Cargar(nombre)});
}

window.onbeforeunload = function(){
    atributos.forEach(function(nombre){Guardar(nombre)});
    return null;
}

//Funciones
function Cargar(nombre){
    document.getElementById(nombre).value = localStorage.getItem(nombre);
}
function Guardar(nombre){
    localStorage.setItem(nombre,document.getElementById(nombre).value);
}