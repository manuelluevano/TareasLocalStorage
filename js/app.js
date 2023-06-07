// VARIABLES
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const textoPendiente = document.querySelector("#textoPendiente");
const mensaje = document.querySelector("#mensaje");

let pendientes = [];

// EVENT LISTENERS
eventListener();

function eventListener() {
  //CUANDO EL DOCUMENTO ESTA LISTO

  document.addEventListener("DOMContentLoaded", () => {
    //SI NO HAY PENDIENTES EN LOCALSTORAGE, RESETEAMOS EL ARRAY []
    pendientes = JSON.parse(localStorage.getItem("pendientes")) || [];
    console.log("Pendientes: " + pendientes);

    let enviarMensaje = false;
    crearHTML(enviarMensaje);
  });

  formulario.addEventListener("submit", agregarPendiente);
}

// FUNCIONES
function agregarPendiente(e) {
  e.preventDefault();

  // VALIDADCION
  if (textoPendiente.value === "") {
    console.log("Error, campo vacio");
    MensajeError("El campo no puede estar vacio");
    return;
  }

  //AGREGAR EL PENDIENTE AL ARREGLO
  const pendienteObj = {
    id: Date.now(),
    texto: textoPendiente.value.split(),
  };

  pendientes = [...pendientes, pendienteObj];
  console.log(pendientes);

  //CREA HTML
  let enviarMensaje = true;
  crearHTML(enviarMensaje);

  //LIMPIAR INPUT
  formulario.reset();
}

// MOSTRAR MENSJAE DE ERROR
function MensajeError(error) {
  const mensajeE = document.createElement("P");
  mensajeE.textContent = error;
  mensajeE.classList.add("error");

  mensaje.appendChild(mensajeE);

  //ELIMINAR MENSAJE EN 4 SEGUNDOS
  setTimeout(() => {
    mensajeE.remove();
  }, 3000);
}

// MOSTRAR MENSJAE AGREGADO
function MensajeAdd(add) {
  const agregado = document.createElement("P");
  agregado.textContent = add;
  agregado.classList.add("add");

  mensaje.appendChild(agregado);

  //ELIMINAR MENSAJE EN 4 SEGUNDOS
  setTimeout(() => {
    agregado.remove();
  }, 3000);
}

// CREAR RESULTADOS
function crearHTML(enviarMensaje) {
  //EVITAR INSERTAR DUPLICADO
  limpiarHTML();

  if (pendientes.length > 0) {
    pendientes.forEach((element) => {
      //AGREGAR BOTON PARA ELIMINAR
      const btnDelete = document.createElement("a");
      btnDelete.classList.add("btnDelete");
      btnDelete.innerText = "X";

      //AGREGAR LA FUNCION DE ELIMINAR
      btnDelete.onclick = () => {
        borrarTarea(element.id);
      };

      const li = document.createElement("li");
      li.classList.add("tarea");
      li.innerText = element.texto;

      //ASIGNAR EL BOTON
      li.appendChild(btnDelete);

      //INSERTAR DATOS EN RESULTADO
      resultado.appendChild(li);
    });
  }

  //AGREGAR DATOS A LOCAL STORAGE
  sincronizarStorage();

  //ENVIAR MENSAJE SOLO SI PRESIONA BTN
  if (enviarMensaje) {
    // AGREGAR MENSAJE
    MensajeAdd("Tarea creada correctamente");
  }
}

//LIMPIAR EL HTML PARA EVITAR QUE SE REPITAN LOS ELEMENTOS EN PANTALLA
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// LOCALSTORAGE
function sincronizarStorage() {
  console.log("SIncronizar`");
  localStorage.setItem("pendientes", JSON.stringify(pendientes));
}

//ELIMINAR TAREA
function borrarTarea(id) {
  console.log("ID", id);

  //EXTRAEMOS TODOS LOS ELEMENTOS MENOS AL QUE LE DIMOS CLIC
  pendientes = pendientes.filter((taera) => taera.id !== id);
  console.log(pendientes);

  crearHTML();
}
