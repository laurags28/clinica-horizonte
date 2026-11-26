
/* ==========================================
   CONFIGURACIÓN DE FIREBASE
   CLÍNICA HORIZONTE
========================================== */

// Importar funciones de Firebase

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import { getAuth } from
    "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

import { getFirestore } from
    "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";


// Configuración del proyecto Firebase

const firebaseConfig = {
    apiKey: "AIzaSyBuvV0jPDHMUVAsPeugzW78wC4QpP6fbW0",
    authDomain: "clinica-horizonte-6fb1d.firebaseapp.com",
    projectId: "clinica-horizonte-6fb1d",
    storageBucket: "clinica-horizonte-6fb1d.firebasestorage.app",
    messagingSenderId: "89066011602",
    appId: "1:89066011602:web:5bf0da4475b0216d93660b",
    measurementId: "G-W0D07YKWHZ"
};


// Inicializar Firebase

const app = initializeApp(firebaseConfig);


// Inicializar servicios

const auth = getAuth(app);
const db = getFirestore(app);


// Exportar para utilizarlos en otros archivos

export { app, auth, db };
