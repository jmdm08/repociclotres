window.onload = function(){
    iniciarEventos();
    cargarDatosStorage();
}

function iniciarEventos(){
    document.getElementById("btnGuardar").addEventListener("click", guardarDatos);
}

function cargarDatosStorage(){
    // CARGAR EL STORAGE.
    let datosStorage = localStorage.getItem("datosPersonales");

    // VALIDAR SI EXISTEN DATOS EN EL STORAGE
    if(datosStorage){
        datosStorage = JSON.parse(datosStorage);
    }
    else{
        datosStorage = [];
    }

    datosStorage.forEach( datos =>  {
        adicionarFila(datos);
    });
}

function guardarDatos(event){
    let nombres = document.getElementById("nombres").value;
    let apellidos = document.getElementById("apellidos").value;
    let edad = document.getElementById("edad").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let estadoCivil = document.querySelector("#estadoCivil option:checked").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let accion = document.getElementById("accion").value;

    let datosPersonales = {
        "nombres": nombres,
        "apellidos": apellidos,
        "edad": edad,
        "telefono": telefono,
        "fechaNacimiento": fechaNacimiento,
        "estadoCivil": estadoCivil,
        "direccion": direccion
    }

    // TRAEMOS LA INFORMACIÓN DEL STORAGE -> ES UN STRING.
    let datosStorage = localStorage.getItem("datosPersonales");

    // SE PREGUNTA SI HAY DATOS EN ESA CADENA O ES NULL
    if(datosStorage){
        // SI HAY DATOS, SE CONVIERTEN A ARRAY/OBJETO (JSON.PARSE)
        datosStorage = JSON.parse(datosStorage);
    }
    else{
        // SI NO HAY DATOS, SE CREA UN ARRAY.
        datosStorage = [];
    }

    if(accion === "crear"){
         // SE ADICIONA LOS NUEVOS DATOS AL ARRAY.
        datosStorage.push(datosPersonales);
        adicionarFila(datosPersonales);
    }
    else{
        let index = document.getElementById("fila").value;
        let fila = document.getElementById("datos-"+index);
        let datosFila = fila.getElementsByTagName("td");
        datosFila[0].textContent = datosPersonales.nombres;
        datosFila[1].textContent = datosPersonales.apellidos;
        datosFila[2].textContent = datosPersonales.edad;
        datosFila[3].textContent = datosPersonales.fechaNacimiento;
        datosFila[4].textContent = datosPersonales.estadoCivil;
        datosFila[5].textContent = datosPersonales.telefono;
        datosFila[6].textContent = datosPersonales.direccion;

        datosStorage[parseInt(index) - 1] = datosPersonales;
    }

    // SE GUARDAN EN EL STOROGE LOS DATOS CONVIERTIENDO UN ARRAY/OBJETO A STRING (JSON.STRINGIFY)
    localStorage.setItem("datosPersonales", JSON.stringify(datosStorage) );
    document.getElementById("btnReset").click();
    document.getElementById("accion").value = "crear";
}

function adicionarFila(datosPersonales){
    let tabla = document.getElementById("datosTabla");

    let row = tabla.rows.length;

    let html = "";
    html += "<tr id='datos-"+ (row) +"'>";
    html += "   <td>" + datosPersonales.nombres + "</td>";
    html += "   <td>" + datosPersonales.apellidos + "</td>";
    html += "   <td>" + datosPersonales.edad + "</td>";
    html += "   <td>" + datosPersonales.fechaNacimiento + "</td>";
    html += "   <td>" + datosPersonales.estadoCivil + "</td>";
    html += "   <td>" + datosPersonales.telefono + "</td>";
    html += "   <td>" + datosPersonales.direccion + "</td>";
    html += "   <td>";
    html += "       <button type='button' class='btnEditar'><i class='fas fa-edit'></i></button>"
    html += "       <button type='button' class='btnEliminar'><i class='fas fa-trash-alt'></i></button>";
    html += "   </td>"
    html += "</tr>";

    tabla.tBodies[0].innerHTML += html;

    // CAPTURO LOS BOTONES DE ELIMINAR USANDO LA CLASE.
    let botoneEliminar = document.getElementsByClassName("btnEliminar");
    for(let i=0; i<botoneEliminar.length; i++){
        // SE RECORRE UNO A UNO LOS BOTONES DE ELIMINAR Y SE LE AGREGA EL EVENTO "CLICK"
        botoneEliminar[i].addEventListener("click", eliminarFila);
    }

    // SE CAPUTRAN LOS BOTONES EDITAR USANDO LA CLASE
    let botoneEditar = document.getElementsByClassName("btnEditar");
    for(let i=0; i<botoneEditar.length; i++){
        botoneEditar[i].addEventListener("click",editarFila);
    }
}

function editarFila(event){
    let fila = event.target.closest("tr");
    let datosFila = fila.getElementsByTagName("td");
    let index = fila.rowIndex;
    
    let datosStorage = JSON.parse( localStorage.getItem('datosPersonales') );
    let datosPersonales = datosStorage[index - 1];

    document.getElementById("nombres").value = datosFila[0].textContent.trim();
    document.getElementById("apellidos").value = datosFila[1].textContent.trim();
    document.getElementById("edad").value = datosFila[2].textContent.trim();
    document.getElementById("fechaNacimiento").value = datosFila[3].textContent.trim();
    document.getElementById("estadoCivil").value = datosFila[4].textContent.trim();
    document.getElementById("telefono").value = datosPersonales.telefono;
    document.getElementById("direccion").value = datosPersonales.direccion;
    document.getElementById("accion").value = "editar";
    document.getElementById("fila").value = index;
}

function eliminarFila(event){
    // SE VA A ELIMINAR TODO LA FILA DEL ELEMENTO BODY DE LA TABLA.
    // CLOSEST -> BUSCA EL PRIMER ELEMENTO SUPERIOR CON UN CONDICIÓN.
    let fila = event.target.closest("tr");
    let index = fila.rowIndex;
    /*
        TABLA
        #   NOMBRE  APELLIDO    ACCIONES
        1   JOSE    DAGER       ELIMINAR EDITAR 
        2   ISA     DAGER       ELIMINAR EDITAR
        3   RAIF    DAGER       ELIMINAR EDITAR ***

        STORAGE
        [
            0 -> {NOMBRE:JOSE, APELLIDO;DAGER},
            1 -> {NOMBRE:ISA, APELLIDO:DAGER},
            2 -> {NOMBRE:RAIF, APELLIDO:DAGER}
        ]

        indexTabla = 3;
        indexArray = 2;    
    */

    let datosStorage = JSON.parse(localStorage.getItem('datosPersonales'));
    // SPLICE -> DADA UNA POSICIÓN, ELIMINA N ELEMENTOS DESDE ESA POSICIÓN.
    datosStorage.splice(index - 1, 1);

    localStorage.setItem('datosPersonales', JSON.stringify(datosStorage));

    fila.remove();
}