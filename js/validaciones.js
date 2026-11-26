
// ==========================================
// 1. EXPRESIÓN REGULAR DEL CORREO
// ==========================================

const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ==========================================
// 2. FUNCIONES GENERALES DE VALIDACIÓN
// ==========================================

// Mostrar un mensaje de error

function mostrarError(campo, identificadorError, mensaje) {

    const elementoError = document.getElementById(identificadorError);

    campo.classList.add("error");
    campo.setAttribute("aria-invalid", "true");

    elementoError.textContent = mensaje;
}


// Eliminar un mensaje de error

function limpiarError(campo, identificadorError) {

    const elementoError = document.getElementById(identificadorError);

    campo.classList.remove("error");
    campo.removeAttribute("aria-invalid");

    elementoError.textContent = "";
}


// ==========================================
// 3. MOSTRAR Y OCULTAR CONTRASEÑAS
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
// 4. VALIDACIONES DEL REGISTRO
// ==========================================

function configurarRegistro() {

    const formulario = document.getElementById("registroForm");

    if (!formulario) {
        return;
    }

    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const email = document.getElementById("email");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const direccion = document.getElementById("direccion");

    const password = document.getElementById("password");
    const confirmarPassword = document.getElementById("confirmarPassword");

    const aceptarPrivacidad = document.getElementById("aceptarPrivacidad");

    const mensajeRegistro = document.getElementById("mensajeRegistro");


    // Evitar fechas futuras

    fechaNacimiento.max = new Date().toLocaleDateString("en-CA");


    // VALIDAR NOMBRE

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


    // VALIDAR APELLIDOS

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


    // VALIDAR EMAIL

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


    // VALIDAR FECHA DE NACIMIENTO

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


    // VALIDAR DIRECCIÓN

    function validarDireccion() {

        const valor = direccion.value.trim();

        if (valor === "") {
            mostrarError(direccion, "errorDireccion", "La dirección postal es obligatoria.");
            return false;
        }

        limpiarError(direccion, "errorDireccion");
        return true;
    }


    // VALIDAR CONTRASEÑA

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


    // VALIDAR CONFIRMACIÓN DE CONTRASEÑA

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


    // VALIDAR PRIVACIDAD

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


    // VALIDAR TODO EL REGISTRO

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


    // EVENTO DE ENVÍO DEL REGISTRO

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        mensajeRegistro.textContent = "";
        mensajeRegistro.className = "mensaje-formulario";

        if (validarFormulario()) {

            mensajeRegistro.textContent =
                "¡Todos los datos son correctos! El formulario está preparado para el registro.";

            mensajeRegistro.classList.add("mensaje-exito");

        } else {

            mensajeRegistro.textContent =
                "Revisa los campos marcados antes de continuar.";

            mensajeRegistro.classList.add("mensaje-error-general");

        }

    });


    // EVENTOS DE LOS CAMPOS

    nombre.addEventListener("input", validarNombre);
    apellidos.addEventListener("input", validarApellidos);
    email.addEventListener("input", validarEmail);
    fechaNacimiento.addEventListener("change", validarFechaNacimiento);
    direccion.addEventListener("input", validarDireccion);

    password.addEventListener("input", function() {

        validarPassword();

        if (confirmarPassword.value !== "") {
            validarConfirmarPassword();
        }

    });

    confirmarPassword.addEventListener("input", validarConfirmarPassword);

    aceptarPrivacidad.addEventListener("change", validarPrivacidad);

}


// ==========================================
// 5. VALIDACIONES DEL INICIO DE SESIÓN
// ==========================================

function configurarLogin() {

    const formulario = document.getElementById("loginForm");

    if (!formulario) {
        return;
    }

    const email = document.getElementById("emailLogin");
    const password = document.getElementById("passwordLogin");

    const mensajeLogin = document.getElementById("mensajeLogin");


    // VALIDAR EMAIL DEL LOGIN

    function validarEmailLogin() {

        const valor = email.value.trim();

        if (valor === "") {

            mostrarError(
                email,
                "errorEmailLogin",
                "El correo electrónico es obligatorio."
            );

            return false;
        }

        if (!expresionEmail.test(valor)) {

            mostrarError(
                email,
                "errorEmailLogin",
                "Introduce un correo electrónico válido."
            );

            return false;
        }

        limpiarError(email, "errorEmailLogin");

        return true;
    }


    // VALIDAR CONTRASEÑA DEL LOGIN

    function validarPasswordLogin() {

        const valor = password.value;

        if (valor === "") {

            mostrarError(
                password,
                "errorPasswordLogin",
                "La contraseña es obligatoria."
            );

            return false;
        }

        limpiarError(password, "errorPasswordLogin");

        return true;
    }


    // EVENTO DE ENVÍO DEL LOGIN

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        mensajeLogin.textContent = "";
        mensajeLogin.className = "mensaje-formulario";

        const emailCorrecto = validarEmailLogin();
        const passwordCorrecta = validarPasswordLogin();

        if (emailCorrecto && passwordCorrecta) {

            mensajeLogin.textContent =
                "Los datos tienen un formato correcto. El inicio de sesión está preparado para Firebase.";

            mensajeLogin.classList.add("mensaje-exito");

        } else {

            mensajeLogin.textContent =
                "Revisa los campos marcados antes de continuar.";

            mensajeLogin.classList.add("mensaje-error-general");

        }

    });


    // EVENTOS DE LOS CAMPOS

    email.addEventListener("input", validarEmailLogin);

    password.addEventListener("input", validarPasswordLogin);

}


// ==========================================
// 6. INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================

// Configuramos los botones de las contraseñas

configurarMostrarPassword();

// Comprobamos qué formulario está cargado

configurarRegistro();

configurarLogin();
