//Este es un script usado como libreria

//Al input de id "nombre" le asigna el valor guardado con la clave "nombre"
function Cargar(nombre){
    document.getElementById(nombre).value = localStorage.getItem(nombre);
}

//Guarda con clave "nombre" el valor que está en el input de id "nombre"
function Guardar(nombre){
    localStorage.setItem(nombre,document.getElementById(nombre).value);
}