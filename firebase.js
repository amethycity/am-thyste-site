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

import {

getFirestore,
doc,
setDoc,
getDoc

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* FIREBASE CONFIG */

const firebaseConfig = {

apiKey: "AIzaSyAGGJOBvL8DSYa96bGlqb2581TEB3dGJpM",

authDomain: "amethycitymc.firebaseapp.com",

projectId: "amethycitymc",

storageBucket: "amethycitymc.firebasestorage.app",

messagingSenderId: "1034014694698",

appId: "1:1034014694698:web:f53b2a869291fb16e0d253",

measurementId: "G-BXNRP8C0FB"

};

/* INITIALISATION */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/* INSCRIPTION */

const registerBtn =
document.getElementById("register-btn");

if(registerBtn){

registerBtn.addEventListener("click", async()=>{

const pseudo =
document.getElementById("minecraft-pseudo").value;

const email =
document.getElementById("register-email").value;

const password =
document.getElementById("register-password").value;

if(
pseudo === "" ||
email === "" ||
password === ""
){

alert("Remplis tous les champs");

return;

}

try{

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user = userCredential.user;

/* SAUVEGARDE PROFIL */

await setDoc(doc(db,"users",user.uid),{

pseudo:pseudo,
email:email

});

alert("Compte créé avec succès !");

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

if(
email === "" ||
password === ""
){

alert("Remplis tous les champs");

return;

}

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Connexion réussie !");

window.location.href =
"index.html";

}catch(error){

alert(error.message);

}

});

}

/* MENU PROFIL */

const profileBox =
document.getElementById("profile-box");

if(profileBox){

onAuthStateChanged(auth, async(user)=>{

/* CONNECTÉ */

if(user){

try{

const docRef =
doc(db,"users",user.uid);

const docSnap =
await getDoc(docRef);

if(docSnap.exists()){

const data =
docSnap.data();

profileBox.innerHTML = `

<div class="profile-menu">

<img
src="https://mc-heads.net/avatar/${data.pseudo}"
class="minecraft-skin">

<div class="profile-info">

<div class="profile-pseudo">

${data.pseudo}

</div>

<div class="profile-rank">

JOUEUR AMETHYCITY

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

logoutBtn.addEventListener("click",()=>