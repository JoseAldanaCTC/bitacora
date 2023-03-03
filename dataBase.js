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
    div.addClass("border border-primary text-center");
    div.attr('id',bitacoraDB.id);
    let tituloBD=$("<h1></h1>");
    tituloBD.append(bitacoraDB.data().titulo);
    let mensajeBD=$("<h4></h4>");
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
  var bitacoraId = $(this).closest('div').attr('id');
  var editado = doc(db, "BDBitacoras", bitacoraId);
  var nuevoTitulo = "";
  var nuevoContenido = "";

  // Create the popup form
  var popupForm = $("<div></div>");
  popupForm.attr('id', 'myForm');
  popupForm.addClass("modal fade");
  popupForm.append('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Editar Bitácora</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><form><div class="form-group"><label for="input1">Título</label><input type="text" class="form-control" id="input1" value=""></div><div class="form-group"><label for="input2">Contenido</label><textarea class="form-control" id="input2" rows="3"></textarea></div></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button><button type="button" class="btn btn-primary" id="saveBtn">Guardar</button></div></div></div>');

  // Append the popup form to the body
  $("body").append(popupForm);

  // Get the current data and fill in the inputs of the popup form
  var bitacoraDB = await getDoc(doc(db, "BDBitacoras", bitacoraId));
  nuevoTitulo = bitacoraDB.data().titulo;
  nuevoContenido = bitacoraDB.data().contenido;
  $('#input1').val(nuevoTitulo);
  $('#input2').val(nuevoContenido);

  // Show the popup form
  $('#myForm').modal('show');

  // Save the new data when the "Guardar" button is clicked
  $('#saveBtn').click(async function() {
    nuevoTitulo = $('#input1').val();
    nuevoContenido = $('#input2').val();

    await updateDoc(editado, {
      titulo: nuevoTitulo,
      contenido: nuevoContenido
    });

    // Update the corresponding HTML elements with the new data from Firestore
    var bitacoraDB= await getDoc(doc(db, "BDBitacoras", bitacoraId));
    $('#' + bitacoraId + ' h1').text(bitacoraDB.data().titulo);
    $('#' + bitacoraId + ' h4').text(bitacoraDB.data().contenido);

    // Destroy the popup form
    $('#myForm').modal("hide");
    $('#myForm').remove();
  });
});

$("#listaBitacora").on("click", "#eliminar", async function () {
  var bitacoraId = $(this).closest('div').attr('id');
  await deleteDoc(doc(db, "BDBitacoras", bitacoraId));
  $(this).closest("div").remove(); // remove the parent card element of the clicked button
  alert("eliminaste");
});


