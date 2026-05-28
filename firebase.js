// FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// CONFIG

const firebaseConfig = {

apiKey: "AIzaSyAGGJOBvL8DSYa96bGlqb2581TEB3dGJpM",

authDomain: "amethycitymc.firebaseapp.com",

projectId: "amethycitymc",

storageBucket: "amethycitymc.firebasestorage.app",

messagingSenderId: "1034014694698",

appId: "1:1034014694698:web:f53b2a869291fb16e0d253",

measurementId: "G-BXNRP8C0FB"

};

// INIT

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// INSCRIPTION

const registerBtn = document.getElementById("register-btn");

if(registerBtn){

registerBtn.addEventListener("click", () => {

const email = document.getElementById("register-email").value;

const password = document.getElementById("register-password").value;

createUserWithEmailAndPassword(auth,email,password)

.then(() => {

alert("Compte créé avec succès !");

window.location.href = "login.html";

})

.catch((error) => {

alert(error.message);

});

});

}

// CONNEXION

const loginBtn = document.getElementById("login-btn");

if(loginBtn){

loginBtn.addEventListener("click", () => {

const email = document.getElementById("login-email").value;

const password = document.getElementById("login-password").value;

signInWithEmailAndPassword(auth,email,password)

.then(() => {

alert("Connexion réussie !");

window.location.href = "index.html";

})

.catch((error) => {

alert(error.message);

});

});

}