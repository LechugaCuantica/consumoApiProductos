const API_URL = "https://69d789f89c5ebb0918c7e45f.mockapi.io/usuarios";

// ==========================
// 🔹 GET - CONSULTAR
// ==========================
function obtenerUsuarios() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            let filas = data.map(u => `
        <tr>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>
            <button onclick="editarUsuario('${u.id}', '${u.name}', '${u.email}')">Editar</button>
            <button onclick="eliminarUsuario('${u.id}')">Eliminar</button>
          </td>
        </tr>
      `).join("");

            document.getElementById("tabla").innerHTML = filas;
        });
}

// ==========================
// 🔹 POST - CREAR
// ==========================
function crearUsuario() {
    const name = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    })
        .then(() => {
            limpiar();
            obtenerUsuarios();
        });
}

// ==========================
// 🔹 PUT - EDITAR
// ==========================
function editarUsuario(id, nombreActual, emailActual) {

    const nuevoNombre = prompt("Nuevo nombre:", nombreActual);
    const nuevoEmail = prompt("Nuevo email:", emailActual);

    if (nuevoNombre && nuevoEmail) {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: nuevoNombre,
                email: nuevoEmail
            })
        })
            .then(() => obtenerUsuarios());
    }
}

// ==========================
// 🔹 DELETE - ELIMINAR
// ==========================
function eliminarUsuario(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
        .then(() => obtenerUsuarios());
}

// ==========================
// 🔹 LIMPIAR CAMPOS
// ==========================
function limpiar() {
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
}

// Cargar al inicio
obtenerUsuarios();

// Crear un proyecto que permita consumir una API de productos
// Atributos: Referencia, Nombre, Precio Stock y estado
// Crear los 4 metódos HTTP básicos: GET, POST, PUT, DELETE