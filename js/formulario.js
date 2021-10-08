function botonGuardar(){
    // MENSAJE EN LA CONSOLA
    let nombreEl = document.getElementById("nombres");
    let apellidosEl = document.getElementById("apellidos");
    let contrasenaEl = document.getElementById("contrasena");
    nombreEl.classList.remove("error");
    apellidosEl.classList.remove("error");
    contrasenaEl.classList.remove("error");

    let nombres = nombreEl.value;
    let apellidos = apellidosEl.value;
    let contrasena = contrasenaEl.value;
    
    /*
        PATRÓN -> TEXTO, FÓRMULA.
        ASERCIONES -> INICIO(^), FIN($).
        CUANTIFICADORES -> REPETICIÓN DEL PATRÓN -> + *
        CARACTERES ESPECIALES -> TABULACIÓN, ESPACIOS.
        GRUPOS Y RANGOS -> DIVIDIR Y CONTAR.
        CARECTERES UNICODES -> VALIDAR CARACTERES UNICODE.
        MODIFICADORES -> EVUALAR MULTILINEA, GLOBAL, SENSIBLE A LAS MAYÚSCULAS.
    */

    /*
        match() -> Tomar una cadena le aplica una RegExp y devuelve la/las coincidencias.
        * test() -> Devuelve true/false si la cadena completa cumple con el patrón.
        * exec() -> Devuelve la primera coincidencia del patrón. 
    */

    let patron = /^[A-Z0-9\s]+$/gi;

    let cumple = patron.test(nombres);

    if(cumple){
        alert("Cumple con el patrón")
    }
    else{
        document.getElementById("nombres").id = "Error";
    }

    if(nombres === "" || (nombres.length < 6 || nombres.length > 30)){
        nombreEl.classList.add("error");
        alert("Digite un nombre mínimo de 6 caracteres")
    }

    if(apellidos === ""){
        apellidosEl.classList.add("error");
    }

    validarContrasena(contrasenaEl);

    if(nombres !== "" && apellidos !== "" && contrasena !== ""){
        let datospersonales = {
            nombres : nombres,
            apellidos : apellidos,
            contrasena : contrasena
        }

        console.log(datospersonales);
    }
    else{
        alert("....")
    }

    console.log(nombres,apellidos);
}

function validarContrasena(contrasenaEl){
    alert("Validar Contraseña");
}