
/* ==========================================
   AUTENTICACIÓN
   CLÍNICA HORIZONTE
========================================== */

// Importar Firebase Authentication

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// Importar funciones de Firestore

import {
    doc,
    setDoc,
    collection,
    addDoc,
    serverTimestamp,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Importar los servicios del proyecto

import { auth, db } from "./firebase-config.js";


// ==========================================
// 1. REGISTRO DE USUARIOS
// ==========================================

const registroForm = document.getElementById("registroForm");

if (registroForm) {

    registroForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const direccion = document.getElementById("direccion").value.trim();
        const password = document.getElementById("password").value;
        const confirmarPassword = document.getElementById("confirmarPassword").value;
        const aceptarPrivacidad = document.getElementById("aceptarPrivacidad").checked;

        const mensaje = document.getElementById("mensajeRegistro");

        mensaje.textContent = "";
        mensaje.className = "mensaje-formulario";

        if (password !== confirmarPassword) {

            mensaje.textContent = "Las contraseñas no coinciden.";
            mensaje.classList.add("error");

            return;
        }

        if (!aceptarPrivacidad) {

            mensaje.textContent = "Debes aceptar la información sobre privacidad.";
            mensaje.classList.add("error");

            return;
        }

        try {

            // Crear usuario en Firebase Authentication

            const credenciales = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const uid = credenciales.user.uid;

            // Guardar datos personales en Firestore

            await setDoc(doc(db, "usuarios", uid), {

                nombre: nombre,
                apellidos: apellidos,
                email: email,
                telefono: telefono,
                fechaNacimiento: fechaNacimiento,
                direccion: direccion,
                fechaRegistro: serverTimestamp()

            });

            mensaje.textContent = "¡Tu cuenta se ha creado correctamente!";
            mensaje.classList.add("exito");

            registroForm.reset();

        } catch (error) {

            console.error("Error durante el registro:", error);

            let textoError = "No se ha podido completar el registro.";

            if (error.code === "auth/email-already-in-use") {
                textoError = "Este correo electrónico ya está registrado.";
            }

            if (error.code === "auth/invalid-email") {
                textoError = "El correo electrónico no tiene un formato válido.";
            }

            if (error.code === "auth/weak-password") {
                textoError = "La contraseña es demasiado débil.";
            }

            if (error.code === "permission-denied") {
                textoError = "No tienes permisos para guardar los datos.";
            }

            mensaje.textContent = textoError;
            mensaje.classList.add("error");

        }

    });

}


// ==========================================
// 2. INICIO DE SESIÓN
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("emailLogin").value.trim();
        const password = document.getElementById("passwordLogin").value;

        const mensaje = document.getElementById("mensajeLogin");

        mensaje.textContent = "";
        mensaje.className = "mensaje-formulario";

        try {

            // Comprobar credenciales

            const credenciales = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const uid = credenciales.user.uid;

            // Registrar acceso en Firestore

            await addDoc(collection(db, "historial_accesos"), {

                uid: uid,
                email: email,
                fechaAcceso: serverTimestamp()

            });

            // Acceder al panel privado

            window.location.href = "panel.html";

        } catch (error) {

            console.error("Error al iniciar sesión:", error);

            mensaje.textContent = "Correo electrónico o contraseña incorrectos.";
            mensaje.classList.add("error");

        }

    });

}


// ==========================================
// 3. RECUPERACIÓN DE CONTRASEÑA
// ==========================================

const btnRecuperarPassword = document.getElementById("btnRecuperarPassword");

if (btnRecuperarPassword) {

    btnRecuperarPassword.addEventListener("click", async function (event) {

        event.preventDefault();

        const email = document.getElementById("emailLogin").value.trim();

        const mensaje = document.getElementById("mensajeLogin");

        // Limpiar mensajes anteriores

        mensaje.textContent = "";
        mensaje.className = "mensaje-formulario";

        // Comprobar que se ha introducido un correo

        if (email === "") {

            mensaje.textContent =
                "Introduce tu correo electrónico para recuperar la contraseña.";

            mensaje.classList.add("error");

            document.getElementById("emailLogin").focus();

            return;
        }

        try {

            // Enviar correo de recuperación mediante Firebase

            await sendPasswordResetEmail(auth, email);

            mensaje.textContent =
                "Si la cuenta está registrada, recibirás un correo con las instrucciones para restablecer tu contraseña.";

            mensaje.classList.add("exito");

        } catch (error) {

            console.error("Error al recuperar la contraseña:", error);

            if (error.code === "auth/invalid-email") {

                mensaje.textContent =
                    "El correo electrónico no tiene un formato válido.";

            } else if (
                error.code === "auth/too-many-requests"
            ) {

                mensaje.textContent =
                    "Se han realizado demasiadas solicitudes. Inténtalo más tarde.";

            } else {

                mensaje.textContent =
                    "No se ha podido procesar la solicitud. Comprueba el correo e inténtalo de nuevo.";

            }

            mensaje.classList.add("error");

        }

    });

}


// ========================================
// 4. PANEL PRIVADO DE PACIENTES
// ========================================

// Elementos del panel

const nombreUsuario = document.getElementById("nombreUsuario");
const nombreUsuarioSecundario = document.getElementById("nombreUsuarioSecundario");
const emailUsuario = document.getElementById("emailUsuario");
const apellidosUsuario = document.getElementById("apellidosUsuario");
const telefonoUsuario = document.getElementById("telefonoUsuario");
const fechaNacimientoUsuario = document.getElementById("fechaNacimientoUsuario");
const direccionUsuario = document.getElementById("direccionUsuario");

const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const mensajePanel = document.getElementById("mensajePanel");

// Variables del usuario

let usuarioActual = null;
let datosUsuarioActual = null;


// ==========================================
// 4.1. RECUPERAR DATOS DEL USUARIO
// ==========================================

if (nombreUsuario && emailUsuario) {

    onAuthStateChanged(auth, async function (user) {

        if (!user) {

            window.location.href = "login.html";

            return;
        }

        usuarioActual = user;

        try {

            const referenciaUsuario = doc(db, "usuarios", user.uid);

            const documentoUsuario = await getDoc(referenciaUsuario);

            if (documentoUsuario.exists()) {

                datosUsuarioActual = documentoUsuario.data();

                mostrarDatosUsuario(datosUsuarioActual, user);

                cargarFormularioEdicion(datosUsuarioActual);

            } else {

                nombreUsuario.textContent = "Usuario";
                emailUsuario.textContent = user.email;

            }

        } catch (error) {

            console.error("Error al recuperar los datos:", error);

            if (mensajePanel) {

                mensajePanel.textContent =
                    "No se han podido cargar los datos.";

                mensajePanel.classList.add("error");

            }

        }

    });

}


// ==========================================
// 4.2. MOSTRAR DATOS DEL USUARIO
// ==========================================

function mostrarDatosUsuario(datos, user) {

    nombreUsuario.textContent = datos.nombre || "Usuario";

    if (nombreUsuarioSecundario) {

        nombreUsuarioSecundario.textContent =
            (datos.nombre || "") + " " + (datos.apellidos || "");

    }

    emailUsuario.textContent = user.email;

    if (apellidosUsuario) {
        apellidosUsuario.textContent = datos.apellidos || "No disponible";
    }

    if (telefonoUsuario) {
        telefonoUsuario.textContent = datos.telefono || "No disponible";
    }

    if (fechaNacimientoUsuario) {
        fechaNacimientoUsuario.textContent =
            datos.fechaNacimiento || "No disponible";
    }

    if (direccionUsuario) {
        direccionUsuario.textContent = datos.direccion || "No disponible";
    }

}


// ==========================================
// 5. EDICIÓN DE DATOS PERSONALES
// ==========================================

const editarDatosForm = document.getElementById("editarDatosForm");

const seccionEditarDatos = document.getElementById("seccionEditarDatos");

const btnEditarDatos = document.getElementById("btnEditarDatos");

const btnCancelarEdicion = document.getElementById("btnCancelarEdicion");

const mensajeEdicion = document.getElementById("mensajeEdicion");


// ==========================================
// 5.1. CARGAR DATOS EN EL FORMULARIO
// ==========================================

function cargarFormularioEdicion(datos) {

    document.getElementById("nombreEditar").value =
        datos.nombre || "";

    document.getElementById("apellidosEditar").value =
        datos.apellidos || "";

    document.getElementById("telefonoEditar").value =
        datos.telefono || "";

    document.getElementById("fechaNacimientoEditar").value =
        datos.fechaNacimiento || "";

    document.getElementById("direccionEditar").value =
        datos.direccion || "";

}


// ==========================================
// 5.2. ABRIR FORMULARIO DE EDICIÓN
// ==========================================

if (btnEditarDatos && seccionEditarDatos) {

    btnEditarDatos.addEventListener("click", function () {

        if (!datosUsuarioActual) {
            return;
        }

        cargarFormularioEdicion(datosUsuarioActual);

        mensajeEdicion.textContent = "";
        mensajeEdicion.className = "mensaje-formulario";

        seccionEditarDatos.hidden = false;

        seccionEditarDatos.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


// ==========================================
// 5.3. CANCELAR EDICIÓN
// ==========================================

if (btnCancelarEdicion && seccionEditarDatos) {

    btnCancelarEdicion.addEventListener("click", function () {

        cargarFormularioEdicion(datosUsuarioActual);

        mensajeEdicion.textContent = "";
        mensajeEdicion.className = "mensaje-formulario";

        seccionEditarDatos.hidden = true;

    });

}


// ==========================================
// 5.4. GUARDAR CAMBIOS EN FIRESTORE
// ==========================================

if (editarDatosForm) {

    editarDatosForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!usuarioActual) {

            mensajeEdicion.textContent = "Debes iniciar sesión.";
            mensajeEdicion.classList.add("error");

            return;
        }

        const nombre = document.getElementById("nombreEditar").value.trim();

        const apellidos = document.getElementById("apellidosEditar").value.trim();

        const telefono = document.getElementById("telefonoEditar").value.trim();

        const fechaNacimiento = document.getElementById("fechaNacimientoEditar").value;

        const direccion = document.getElementById("direccionEditar").value.trim();

        mensajeEdicion.textContent = "";
        mensajeEdicion.className = "mensaje-formulario";

        try {

            const referenciaUsuario = doc(
                db,
                "usuarios",
                usuarioActual.uid
            );

            await updateDoc(referenciaUsuario, {

                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono,
                fechaNacimiento: fechaNacimiento,
                direccion: direccion,
                fechaActualizacion: serverTimestamp()

            });

            datosUsuarioActual = {

                ...datosUsuarioActual,

                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono,
                fechaNacimiento: fechaNacimiento,
                direccion: direccion

            };

            mostrarDatosUsuario(datosUsuarioActual, usuarioActual);

            mensajeEdicion.textContent =
                "Tus datos se han actualizado correctamente.";

            mensajeEdicion.classList.add("exito");

            setTimeout(function () {

                seccionEditarDatos.hidden = true;

            }, 1500);

        } catch (error) {

            console.error("Error al actualizar los datos:", error);

            mensajeEdicion.textContent =
                "No se han podido actualizar tus datos.";

            mensajeEdicion.classList.add("error");

        }

    });

}


// ==========================================
// 6. CERRAR SESIÓN
// ==========================================

if (btnCerrarSesion) {

    btnCerrarSesion.addEventListener("click", async function () {

        try {

            await signOut(auth);

            window.location.href = "login.html";

        } catch (error) {

            console.error("Error al cerrar sesión:", error);

            if (mensajePanel) {

                mensajePanel.textContent =
                    "No se ha podido cerrar la sesión.";

                mensajePanel.classList.add("error");

            }

        }

    });

}
