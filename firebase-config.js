// ============================================================================
// CONFIGURACIÓN DE FIREBASE
// ----------------------------------------------------------------------------
// Reemplaza los valores de abajo con los de TU proyecto de Firebase:
// Panel de Firebase → ⚙️ Configuración del proyecto → tus apps → SDK de Firebase
// Este mismo archivo lo usan index.html y panel.html, así que solo se edita
// aquí una vez.
// ============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDv9Q2x4UTLxNu334r67cVo_MLh8gDMhiE",
  authDomain: "logos-theos.firebaseapp.com",
  projectId: "logos-theos",
  storageBucket: "logos-theos.firebasestorage.app",
  messagingSenderId: "51795363",
  appId: "1:51795363:web:74a3352b8e5832fa6fb616"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
