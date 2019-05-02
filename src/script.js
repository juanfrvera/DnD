//Este es un script usado como libreria

//Al input de id "nombre" le asigna el valor guardado con la clave "nombre"
function Cargar(nombre){
    var valor = localStorage.getItem(nombre);
    document.getElementById(nombre).value = valor;
    return valor;
}

//Guarda con clave "nombre" el valor que está en el input de id "nombre"
function Guardar(nombre){
    localStorage.setItem(nombre,document.getElementById(nombre).value);
}

const Capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
function Variable(...nombres){
    var cadena = nombres[0].toLowerCase();
    for (let i = 1; i < nombres.length; i++) {
        const nombre = nombres[i];
        cadena += Capitalize(nombre);
    }
    return eval(cadena);
}