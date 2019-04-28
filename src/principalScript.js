var inputsPrincipal =
[
    //--Principales
    'nombrePersonaje','clase','raza','alineacion','fondo','experiencia','nombreJugador',
    //--Cualidades
    'fuerza','destreza','constitucion','inteligencia','sabiduria','carisma',
    //--Cualidades de salvación
    'fuerzaSalvacion','destrezaSalvacion','constitucionSalvacion',
    'inteligenciaSalvacion','sabiduriaSalvacion','carismaSalvacion',
    //--Estado
    'claseDeArmadura','iniciativa','velocidad','vidaMaxima','vidaActual','hitDice',
    //--Personalizacion
    'edad','altura','peso','ojos','piel','cabello'
]

//Cuando todos los elementos de la página fueron cargados
window.onload = function(){
    inputsPrincipal.forEach(function(nombre){Cargar(nombre)});
}

//Al actualizar o cerrar la página
window.onbeforeunload = function(){
    inputsPrincipal.forEach(function(nombre){Guardar(nombre)});
    return null;
}