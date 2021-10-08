window.onload = function(){
    iniciarEventos();
}

let operandoUno = 0;
let operandoDos = 0;
let operacion = "";

function iniciarEventos(){
    // TOMAR TODOS LOS BOTONES DE NÚMERO Y LE VAS A ADICIONAR 
    // UN EVENTLISTENER AL EVENT CLICK.

    let listaBotonesNumero = document.getElementsByClassName("btnNumero");
    for(let i=0; i<listaBotonesNumero.length; i++){
        listaBotonesNumero[i].addEventListener("click", escribirNumero);
    }

    // TOMAR TODOS LOS BOTONES DE OPERACIÓN Y LE ADICIONAMOS UN EVENTLISTENER
    // AL EVENT CLICK
    let listaBotonesOperaciones = document.getElementsByClassName("btnOperacion");
    for(let i=0; i<listaBotonesOperaciones.length; i++){
        listaBotonesOperaciones[i].addEventListener("click", realizarOperacion);
    }

}

function escribirNumero(event){
    let numero = event.target.textContent;
    document.getElementById("resultado").value += numero;
}

function realizarOperacion(event){
    let operacionActual = event.target.textContent;
    if(operacionActual === "="){
        operandoDos = document.getElementById("resultado").value;
        let resultado;

        // EVALUA UNA VARIABLE Y SEGÚN SU VALOR EJECUTA UN ACCIÓN.
        // ACCIÓN -> CASE.
        switch(operacion){
            case "+":
               resultado = parseFloat(operandoUno) + parseFloat(operandoDos);
            break;

            case "-":
                resultado = parseFloat(operandoUno) - parseFloat(operandoDos);
            break;

            case "*":
                resultado = parseFloat(operandoUno) * parseFloat(operandoDos);
            break;

            case "/":
                if(operandoDos === "0"){
                    resultado = "División por 0";
                }
                else{
                    resultado = parseFloat(operandoUno) / parseFloat(operandoDos);
                }
            break;
        }

        document.getElementById("resultado").value = resultado;
    }
    else{
        operandoUno = document.getElementById("resultado").value;
        document.getElementById("resultado").value = "";
        operacion = operacionActual;
    }
}