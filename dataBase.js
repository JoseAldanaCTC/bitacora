// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore,doc, setDoc, getDoc,updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpqSS5puSW8Ba0kqOPBj0CVFsy4EazGuU",
  authDomain: "fir-app-prueba-bf1ab.firebaseapp.com",
  projectId: "fir-app-prueba-bf1ab",
  storageBucket: "fir-app-prueba-bf1ab.appspot.com",
  messagingSenderId: "124582412098",
  appId: "1:124582412098:web:4f568009220096154392db",
  measurementId: "G-60BK199GDH"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//alert("marcado1");
let index=0;

$("#guardar").click( async function () {
    var titulos=$("#tituloBitacora").val();
    var mensaje=$("#mensaje").val();
    index=index+1;
    var bitacoraActual="bitacora"+index;



    await setDoc(doc(db, "BDBitacoras", bitacoraActual), {
      titulo: titulos,
      contenido: mensaje
      
    });
    var bitacoraDB= await getDoc(doc(db,"BDBitacoras",bitacoraActual));

    alert(bitacoraDB.data().titulo);
    alert(bitacoraDB.data().contenido);


    let div=$("<div></div>");
    div.addClass("border border-primary");
    let tituloBD=$("<h1></h1>");
    tituloBD.append(bitacoraDB.data().titulo);
    let mensajeBD=$("<h3></h3>");
    mensajeBD.append(bitacoraDB.data().contenido);
    let editar=$("<button></button>");
    editar.append("editar");
    editar.addClass("btn btn-primary");
    editar.attr('id', 'editar');
    let eliminar=$("<button></button>");
    eliminar.append("eliminar");
    eliminar.addClass("btn btn-primary");
    eliminar.attr('id', 'eliminar');
    div.append(tituloBD);
    div.append(mensajeBD);
    div.append(editar);
    div.append(eliminar);
    $("#listaBitacora").append(div);



    alert("salida");
    
})

$("#listaBitacora").on("click", "#editar", async function () {
  alert("editando");
  var editado=doc(db,"BDBitacoras", "bitacora1");
    $('#myForm').modal('show');

    $('#saveBtn').click(function() {
      var nuevoTitulo = $('#input1').val();
      var nuevoContenido = $('#input2').val();
      
       updateDoc(editado, {
        titulo : nuevoTitulo,
        contenido: nuevoContenido
      });
      
      $('#myForm').modal('hide');;
    });
  alert("editaste");


});

$("#listaBitacora").on("click", "#eliminar", async function () {

  await deleteDoc(doc(db, "BDBitacoras", "bitacora1"));

  alert("eliminaste");
});

