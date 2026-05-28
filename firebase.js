import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyAGGJOBvL8DSYa96bGlqb2581TEB3dGJpM",

authDomain: "amethycitymc.firebaseapp.com",

projectId: "amethycitymc",

storageBucket: "amethycitymc.firebasestorage.app",

messagingSenderId: "1034014694698",

appId: "1:1034014694698:web:f53b2a869291fb16e0d253",

measurementId: "G-BXNRP8C0FB"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

/* INSCRIPTION */

const registerBtn =
document.getElementById("register-btn");

if(registerBtn){

registerBtn.addEventListener("click", async()=>{

const email =
document.getElementById("register-email").value;

const password =
document.getElementById("register-password").value;

try{

await createUserWithEmailAndPassword(
auth,
email,
password
);

alert("Compte créé !");

window.location.href =
"login.html";

}catch(error){

alert(error.message);

}

});

}

/* CONNEXION */

const loginBtn =
document.getElementById("login-btn");

if(loginBtn){

loginBtn.addEventListener("click", async()=>{

const email =
document.getElementById("login-email").value;

const password =
document.getElementById("login-password").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

window.location.href =
"index.html";

}catch(error){

alert(error.message);

}

});

}

/* PROFIL */

const profileBox =
document.getElementById("profile-box");

if(profileBox){

onAuthStateChanged(auth,(user)=>{

if(user){

profileBox.innerHTML = `

<div class="profile-menu">

<img
src="https://mc-heads.net/avatar/Steve"
class="minecraft-skin">

<div class="profile-info">

<div class="profile-pseudo">

CONNECTÉ

</div>

<div class="profile-rank">

AMETHYCITY

</div>

</div>

<button
class="logout-btn"
id="logout-btn">

Déconnexion

</button>

</div>

`;

const logoutBtn =
document.getElementById("logout-btn");

if(logoutBtn){

logoutBtn.addEventListener("click",()=>{

signOut(auth).then(()=>{

window.location.reload();

});

});

}

}else{

profileBox.innerHTML = `

<a href="login.html"
class="login-link">

CONNEXION

</a>

`;

}

});

}