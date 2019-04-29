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
    'clase', 'raza'
]

//Cuando todos los elementos de la página fueron cargados
window.onload = function(){
    inputs.forEach(function(nombre){Cargar(nombre)});
    selects.forEach(function(nombre){Cargar(nombre)});
}

//Al actualizar o cerrar la página
window.onbeforeunload = function(){
    inputs.forEach(function(nombre){Guardar(nombre)});
    selects.forEach(function(nombre){Guardar(nombre)});
    return null;
}
