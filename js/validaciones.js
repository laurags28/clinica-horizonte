
// ==========================================
// 1. SELECCIÓN DE ELEMENTOS DEL FORMULARIO
// ==========================================

const formulario = document.getElementById("registroForm");

const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const direccion = document.getElementById("direccion");

const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmarPassword");

const aceptarPrivacidad = document.getElementById("aceptarPrivacidad");

const mensajeRegistro = document.getElementById("mensajeRegistro");


// ==========================================
// 2. EXPRESIÓN REGULAR DEL CORREO
// ==========================================

const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ==========================================
// 3. FUNCIÓN PARA MOSTRAR ERRORES
// ==========================================

function mostrarError(campo, identificadorError, mensaje) {

    const elementoError = document.getElementById(identificadorError);

    campo.classList.add("error");
    campo.setAttribute("aria-invalid", "true");

    elementoError.textContent = mensaje;
}


// ==========================================
// 4. FUNCIÓN PARA LIMPIAR ERRORES
// ==========================================

function limpiarError(campo, identificadorError) {

    const elementoError = document.getElementById(identificadorError);

    campo.classList.remove("error");
    campo.removeAttribute("aria-invalid");

    elementoError.textContent = "";
}


// ==========================================
// 5. FUNCIÓN PARA VALIDAR EL NOMBRE
// ==========================================

function validarNombre() {

    const valor = nombre.value.trim();

    if (valor === "") {
        mostrarError(nombre, "errorNombre", "El nombre es obligatorio.");
        return false;
    }

    if (valor.length < 2) {
        mostrarError(nombre, "errorNombre", "El nombre debe tener al menos 2 caracteres.");
        return false;
    }

    limpiarError(nombre, "errorNombre");
    return true;
}


// ==========================================
// 6. FUNCIÓN PARA VALIDAR LOS APELLIDOS
// ==========================================

function validarApellidos() {

    const valor = apellidos.value.trim();

    if (valor === "") {
        mostrarError(apellidos, "errorApellidos", "Los apellidos son obligatorios.");
        return false;
    }

    if (valor.length < 2) {
        mostrarError(apellidos, "errorApellidos", "Los apellidos deben tener al menos 2 caracteres.");
        return false;
    }

    limpiarError(apellidos, "errorApellidos");
    return true;
}


// ==========================================
// 7. FUNCIÓN PARA VALIDAR EL CORREO
// ==========================================

function validarEmail() {

    const valor = email.value.trim();

    if (valor === "") {
        mostrarError(email, "errorEmail", "El correo electrónico es obligatorio.");
        return false;
    }

    if (!expresionEmail.test(valor)) {
        mostrarError(email, "errorEmail", "Introduce un correo electrónico válido.");
        return false;
    }

    limpiarError(email, "errorEmail");
    return true;
}


// ==========================================
// 8. FUNCIÓN PARA VALIDAR LA FECHA
// ==========================================

function validarFechaNacimiento() {

    const valor = fechaNacimiento.value;

    if (valor === "") {
        mostrarError(
            fechaNacimiento,
            "errorFechaNacimiento",
            "La fecha de nacimiento es obligatoria."
        );

        return false;
    }

    const fechaIntroducida = new Date(valor + "T00:00:00");
    const fechaActual = new Date();

    fechaActual.setHours(0, 0, 0, 0);

    if (Number.isNaN(fechaIntroducida.getTime())) {
        mostrarError(
            fechaNacimiento,
            "errorFechaNacimiento",
            "Introduce una fecha válida."
        );

        return false;
    }

    if (fechaIntroducida > fechaActual) {
        mostrarError(
            fechaNacimiento,
            "errorFechaNacimiento",
            "La fecha de nacimiento no puede ser futura."
        );

        return false;
    }

    limpiarError(fechaNacimiento, "errorFechaNacimiento");
    return true;
}


// ==========================================
// 9. FUNCIÓN PARA VALIDAR LA DIRECCIÓN
// ==========================================

function validarDireccion() {

    const valor = direccion.value.trim();

    if (valor === "") {
        mostrarError(direccion, "errorDireccion", "La dirección postal es obligatoria.");
        return false;
    }

    limpiarError(direccion, "errorDireccion");
    return true;
}


// ==========================================
// 10. FUNCIÓN PARA VALIDAR LA CONTRASEÑA
// ==========================================

function validarPassword() {

    const valor = password.value;

    if (valor === "") {
        mostrarError(password, "errorPassword", "La contraseña es obligatoria.");
        return false;
    }

    if (valor.length < 8) {
        mostrarError(
            password,
            "errorPassword",
            "La contraseña debe tener al menos 8 caracteres."
        );

        return false;
    }

    limpiarError(password, "errorPassword");

    return true;
}


// ==========================================
// 11. FUNCIÓN PARA CONFIRMAR LA CONTRASEÑA
// ==========================================

function validarConfirmarPassword() {

    const valor = confirmarPassword.value;

    if (valor === "") {
        mostrarError(
            confirmarPassword,
            "errorConfirmarPassword",
            "Debes repetir la contraseña."
        );

        return false;
    }

    if (valor !== password.value) {
        mostrarError(
            confirmarPassword,
            "errorConfirmarPassword",
            "Las contraseñas no coinciden."
        );

        return false;
    }

    limpiarError(confirmarPassword, "errorConfirmarPassword");

    return true;
}


// ==========================================
// 12. FUNCIÓN PARA VALIDAR LA PRIVACIDAD
// ==========================================

function validarPrivacidad() {

    if (!aceptarPrivacidad.checked) {

        mostrarError(
            aceptarPrivacidad,
            "errorPrivacidad",
            "Debes aceptar la información sobre privacidad."
        );

        return false;
    }

    limpiarError(aceptarPrivacidad, "errorPrivacidad");

    return true;
}


// ==========================================
// 13. FUNCIÓN PARA MOSTRAR Y OCULTAR
// LAS CONTRASEÑAS
// ==========================================

function configurarMostrarPassword() {

    const botonesPassword = document.querySelectorAll(
        "[data-toggle-password]"
    );

    botonesPassword.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const identificador = boton.dataset.togglePassword;

            const campo = document.getElementById(identificador);

            if (campo.type === "password") {

                campo.type = "text";

                boton.setAttribute("aria-label", "Ocultar contraseña");
                boton.setAttribute("aria-pressed", "true");

            } else {

                campo.type = "password";

                boton.setAttribute("aria-label", "Mostrar contraseña");
                boton.setAttribute("aria-pressed", "false");

            }

        });

    });

}


// ==========================================
// 14. FUNCIÓN PARA VALIDAR TODO EL FORMULARIO
// ==========================================

function validarFormulario() {

    const nombreCorrecto = validarNombre();

    const apellidosCorrectos = validarApellidos();

    const emailCorrecto = validarEmail();

    const fechaCorrecta = validarFechaNacimiento();

    const direccionCorrecta = validarDireccion();

    const passwordCorrecta = validarPassword();

    const confirmarPasswordCorrecta = validarConfirmarPassword();

    const privacidadCorrecta = validarPrivacidad();


    return nombreCorrecto &&
        apellidosCorrectos &&
        emailCorrecto &&
        fechaCorrecta &&
        direccionCorrecta &&
        passwordCorrecta &&
        confirmarPasswordCorrecta &&
        privacidadCorrecta;
}


// ==========================================
// 15. EVENTO DE ENVÍO DEL FORMULARIO
// ==========================================

formulario.addEventListener("submit", function(event) {

    // Evitamos el envío tradicional del formulario
    event.preventDefault();

    // Limpiamos el mensaje anterior
    mensajeRegistro.textContent = "";
    mensajeRegistro.className = "mensaje-formulario";

    // Ejecutamos todas las validaciones
    const formularioCorrecto = validarFormulario();

    if (formularioCorrecto) {

        mensajeRegistro.textContent =
            "¡Todos los datos son correctos! El formulario está preparado para el registro.";

        mensajeRegistro.classList.add("mensaje-exito");

    } else {

        mensajeRegistro.textContent =
            "Revisa los campos marcados antes de continuar.";

        mensajeRegistro.classList.add("mensaje-error-general");

    }

});


// ==========================================
// 16. VALIDACIÓN AL MODIFICAR LOS CAMPOS
// ==========================================

nombre.addEventListener("input", validarNombre);

apellidos.addEventListener("input", validarApellidos);

email.addEventListener("input", validarEmail);

fechaNacimiento.addEventListener("change", validarFechaNacimiento);

direccion.addEventListener("input", validarDireccion);

password.addEventListener("input", function() {

    validarPassword();

    // Volvemos a comprobar la confirmación
    // si ya se ha introducido alguna contraseña
    if (confirmarPassword.value !== "") {
        validarConfirmarPassword();
    }

});

confirmarPassword.addEventListener("input", validarConfirmarPassword);

aceptarPrivacidad.addEventListener("change", validarPrivacidad);


// ==========================================
// 17. CONFIGURACIÓN INICIAL
// ==========================================

// Evitamos seleccionar fechas futuras
fechaNacimiento.max = new Date().toLocaleDateString("en-CA");

// Activamos los botones para mostrar y ocultar contraseñas
configurarMostrarPassword();
