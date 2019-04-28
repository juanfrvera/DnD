var inputsHistoria = 
[
    'Historia'
]

//Cuando todos los elementos de la página fueron cargados
window.onload = function(){
    inputsHistoria.forEach(function(nombre){Cargar(nombre)});
}

//Al actualizar o cerrar la página
window.onbeforeunload = function(){
    inputsHistoria.forEach(function(nombre){Guardar(nombre)});
    return null;
}