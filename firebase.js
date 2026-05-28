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

const firebaseConfig = {

apiKey: "AIzaSyAGGJOBvL8DSYa96bGlqb2581TEB3dGJpM",

authDomain: "amethycitymc.firebaseapp.com",

projectId: "amethycitymc",

storageBucket: "amethycitymc.firebasestorage.app",

messagingSenderId: "1034014694698",

appId: "1:1034014694698:web:f53b2a869291fb16e0d253",

measurementId: "G-BXNRP8C0FB"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/* INSCRIPTION */

const registerBtn = document.getElementById("register-btn");

if(registerBtn){

registerBtn.addEventListener("click", async()=>{

const pseudo =
document.getElementById("minecraft-pseudo").value;

const email =
document.getElementById("register-email").value;

const password =
document.getElementById("register-password").value;

createUserWithEmailAndPassword(auth,email,password)

.then(async(userCredential)=>{

const user = userCredential.user;

await setDoc(doc(db,"users",user.uid),{

pseudo:pseudo,
email:email

});

alert("Compte créé avec succès !");

window.location.href="login.html";

})

.catch((error)=>{

alert(error.message);

});

});

}

/* CONNEXION */

const loginBtn =
document.getElementById("login-btn");

if(loginBtn){

loginBtn.addEventListener("click",()=>{

const email =
document.getElementById("login-email").value;

const password =
document.getElementById("login-password").value;

signInWithEmailAndPassword(auth,email,password)

.then(()=>{

alert("Connexion réussie !");

window.location.href="index.html";

})

.catch((error)=>{

alert(error.message);

});

});

}

/* PROFIL */

const profileBox =
document.getElementById("profile-box");

if(profileBox){

onAuthStateChanged(auth,async(user)=>{

if(user){

const docRef =
doc(db,"users",user.uid);

const docSnap =
await getDoc(docRef);

if(docSnap.exists()){

const data = docSnap.data();

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

document
.getElementById("logout-btn")

.addEventListener("click",()=>{

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