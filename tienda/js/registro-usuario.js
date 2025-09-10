function validarFormularioRegistro(){
    let errores = [];

    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let comentario = document.getElementById("comentario").value.trim();
    let clave1 = document.getElementById("clave1").value;
    let clave2 = document.getElementById("clave2").value;

    correos_validos = ["@duoc.cl","@profesor.duoc.cl","@gmail.com"]

    // Validaciones
    
    // Validacion nombre vacío
    if(nombre === "") {
        errores.push("El nombre no puede estar vacío.")
    }
    // Validacion nombre mayor a 100 caracteres
    if (nombre.length > 100){
        errores.push("El nombre no puede ser mayor a 100 caracteres.")
    }
    // Validacion email mayor a 100 caracteres
    if (email.length > 100){
        errores.push("El correo no puede ser mayor a 100 caracteres.")
    }
    // Validacion correos permitidos
    if (!email.includes("@duoc.cl") && !email.includes("@profesor.duoc.cl") && !email.includes("@gmail.com")) {
    errores.push("Solo pueden ser correos @duoc.cl, @profesor.duoc.cl o @gmail.com")
}

    // Validacion longitud caracteres contraseña
    if (clave1.length < 4 || clave1.length > 10) {
        errores.push("La contraseña debe tener entre al menos 4 y 10 caracteres.")
    }
    // Validacion contraseña vacia
    if (clave1 === ""){
        errores.push("La contraseña no puede estar vacía")
    }
    
    // Validacion contraseñas iguales
    if (clave2 !== clave1){
        errores.push("Las contraseñas no coinciden")
    }

    // Validacion comentario vacio
    if (comentario === ""){
        errores.push("El comentario no puede estar vacío")
    }

    // Validacion comentario caracteres
    if (comentario.length > 500){
        errores.push("No puede ser mayor a 500 caracteres")
    }
    
    // Mostrar mensajes

    let mensajesDiv = document.getElementById("mensajes");
  mensajesDiv.innerHTML = "";

    if (errores.length > 0) {
    mensajesDiv.innerHTML = `<div class="alert alert-danger"><ul><li>${errores.join("</li><li>")}</li></ul></div>`;
  } else {
    mensajesDiv.innerHTML = `<div class="alert alert-success">✅ Registro exitoso</div>`;
  }

}