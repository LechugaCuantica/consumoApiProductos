// URL de la API
const API_URL = 'https://69d789f89c5ebb0918c7e45f.mockapi.io/products';

// Formularios
const formCreate = document.getElementById('createProductForm');
const formUpdate = document.getElementById('updateProductForm');

// Eventos para los formularios
formCreate.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(formCreate);
    const data = Object.fromEntries(formData);
    createProduct(data);
});

formUpdate.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(formUpdate);
    formData.append('reference', formUpdate.querySelector('[name="reference"]').value);
    const data = Object.fromEntries(formData);
    updateProduct(data);
});

// Le agregamos el evento de validar el campo a cada input
formCreate.querySelectorAll('input, select, textarea').forEach(input => input.addEventListener('input', validateInput));

formUpdate.querySelectorAll('input, select, textarea').forEach(input => input.addEventListener('input', validateInput));

// Función para obtener los usuarios
async function findAllProducts() {
    // Llamada a la API
    const res = await fetch(API_URL);
    // Respuesta
    const products = await res.json();

    // Limpiar la tabla
    const tbody = document.querySelector('#products')
    tbody.innerHTML = '';
    let filas = '';

    // Recorrer los usuarios
    products.forEach(product => {
        let statusCell = ''
        if (product.status === 'Activo') statusCell = `<span class="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">${product.status}</span>`
        else statusCell = `<span class="inline-flex rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700">${product.status}</span>`

        filas += `
                <tr class="rounded-3xl bg-white/85 shadow-sm" data-aos="fade-left">
                    <td class="rounded-l-3xl px-4 py-4 font-medium">${product.reference}</td>
                    <td class="px-4 py-4">
                        <div class="font-medium text-beige-900">${product.name}</div>
                    </td>
                    <td class="px-4 py-4">${Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}</td>
                    <td class="px-4 py-4">${product.stock} und.</td>
                    <td class="px-4 py-4">
                      ${statusCell}
                    </td>
                    <td class="rounded-r-3xl px-4 py-4">
                        <div class="flex justify-end gap-2">
                        <button type="button" data-open-modal="editModal" onclick="findProductByID('${product.reference}')")
                            class="inline-flex items-center gap-2 rounded-xl border border-beige-200 bg-beige-50 px-4 py-2 font-medium text-beige-800 transition hover:bg-beige-100">
                            <i class="fa-solid fa-pen-to-square text-sm"></i>
                            Editar
                        </button>
                        <button type="button" onclick="deleteProduct('${product.reference}')")
                            class="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2 font-medium text-rose-600 transition hover:bg-rose-100">
                            <i class="fa-solid fa-trash-can text-sm"></i>
                            Eliminar
                        </button>
                        </div>
                    </td>
                </tr>`
    });

    // Agregar las filas a la tabla
    tbody.innerHTML = filas
}

// Función para crear un usuario
async function createProduct(data) {
    // Llamada a la API
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // Si la respuesta es correcta
    if (res.ok) {
        // Actualizar la tabla
        findAllProducts();
        // Cerramos el modal
        closeModal(activeModal);
        // Limpiamos los formularios
        clearForms();

        // Mostramos la alerta
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#faf8f5',
            color: '#3f3125',
            customClass: {
                popup: 'rounded-[1.75rem]',
                confirmButton: 'rounded-xl px-5 py-2 font-medium',
                cancelButton: 'rounded-xl px-5 py-2 font-medium'
            },
            showClass: {
                popup: 'swal2-show'
            },
            hideClass: {
                popup: 'swal2-hide'
            }
        }).fire({
            icon: "success",
            title: "Se ha creado el producto correctamente"
        });

    } else {
        // En caso que no se haya podido crear el producto
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#faf8f5',
            color: '#3f3125',
            customClass: {
                popup: 'rounded-[1.75rem]',
                confirmButton: 'rounded-xl px-5 py-2 font-medium',
                cancelButton: 'rounded-xl px-5 py-2 font-medium'
            },
            showClass: {
                popup: 'swal2-show'
            },
            hideClass: {
                popup: 'swal2-hide'
            }
        }).fire({
            icon: "error",
            title: "Error al crear el producto",
        });
    }
}

function updateProduct(data) {
    // Llamada a la API
    fetch(`${API_URL}/${data.reference}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => {
        // Actualizar la tabla
        findAllProducts();
        // Cerramos el modal
        closeModal(activeModal);
        // Limpiamos los formularios
        clearForms();

        // Mostramos la alerta
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#faf8f5',
            color: '#3f3125',
            customClass: {
                popup: 'rounded-[1.75rem]',
                confirmButton: 'rounded-xl px-5 py-2 font-medium',
                cancelButton: 'rounded-xl px-5 py-2 font-medium'
            },
            showClass: {
                popup: 'swal2-show'
            },
            hideClass: {
                popup: 'swal2-hide'
            }
        }).fire({
            icon: "success",
            title: "Se ha actualizado el producto correctamente"
        })
    });
}


function deleteProduct(id) {
    // Mostramos la alerta para confirmar
    Swal.fire({
        title: '¿Deseas eliminar este producto?',
        html: `<p class="text-sm text-stone-600">Se eliminará el producto permanentemente.</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        background: '#faf8f5',
        color: '#3f3125',
        confirmButtonColor: '#9f1239',
        cancelButtonColor: '#7a5f47',
        customClass: {
            popup: 'rounded-[1.75rem]',
            confirmButton: 'rounded-xl px-5 py-2 font-medium',
            cancelButton: 'rounded-xl px-5 py-2 font-medium'
        },
        showClass: {
            popup: 'swal2-show'
        },
        hideClass: {
            popup: 'swal2-hide'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Llamada a la API
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            }).then(() => {
                // Actualizar la tabla
                findAllProducts();
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#faf8f5',
                    color: '#3f3125',
                    customClass: {
                        popup: 'rounded-[1.75rem]',
                        confirmButton: 'rounded-xl px-5 py-2 font-medium',
                        cancelButton: 'rounded-xl px-5 py-2 font-medium'
                    },
                    showClass: {
                        popup: 'swal2-show'
                    },
                    hideClass: {
                        popup: 'swal2-hide'
                    }
                }).fire({
                    icon: "success",
                    title: "Producto eliminado correctamente.",
                });
            }).catch(() => {
                // En caso que no se haya podido eliminar el producto
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#faf8f5',
                    color: '#3f3125',
                    customClass: {
                        popup: 'rounded-[1.75rem]',
                        confirmButton: 'rounded-xl px-5 py-2 font-medium',
                        cancelButton: 'rounded-xl px-5 py-2 font-medium'
                    },
                    showClass: {
                        popup: 'swal2-show'
                    },
                    hideClass: {
                        popup: 'swal2-hide'
                    }
                }).fire({
                    icon: "error",
                    title: "Error al eliminar el producto.",
                });
            })
        }
    });
}

// Función para obtener los usuarios por ID
async function findProductByID(id) {
    await fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
            // Llenar el formulario
            formUpdate.querySelector('[name="reference"]').value = data.reference;
            formUpdate.querySelector('[name="name"]').value = data.name;
            formUpdate.querySelector('[name="price"]').value = data.price;
            formUpdate.querySelector('[name="stock"]').value = data.stock;
            formUpdate.querySelector('[name="status"]').value = data.status;
        });

    // Habilitar el formulario 
    formUpdate.querySelector('[type="submit"]').disabled = false;
    // Abrir el modal
    openModal('editModal');
}


function validateInput(e) {
    e.preventDefault();
    // Input el cual se está modificando
    const input = e.target;
    const value = input.value;

    // ID para el mensaje de error
    const id = input.getAttribute("aria-describedby");
    const msg = activeModal.querySelector(`#${id}`);
    // Atributo name
    const nameAtributte = input.getAttribute("name");

    let valid = true
    // Limpiar mensajes e inicializar las clases
    msg.textContent = "";
    msg.classList.add("text-green-500");
    input.classList.add("success-input");

    // Validaciones
    if (!value.trim()) {
        input.classList.replace("success-input", "error-input");
        msg.textContent = "Este campo es obligatorio";
        msg.classList.replace("text-green-500", "text-red-500");
        valid = false
    } else {
        input.classList.replace("error-input", "success-input");
        msg.textContent = "Campo válido";
        msg.classList.replace("text-red-500", "text-green-500");
    }

    if (nameAtributte === "name" && !/^[A-Za-z\s]+$/.test(input.value)) {
        input.classList.replace("success-input", "error-input");
        msg.textContent = "Solo se permiten letras";
        msg.classList.replace("text-green-500", "text-red-500");
        valid = false
    } else if (nameAtributte === "stock" && !/^\d+$/.test(input.value)) {
        input.classList.replace("success-input", "error-input");
        msg.textContent = "El stock debe ser un número válido";
        msg.classList.replace("text-green-500", "text-red-500");
        valid = false
    } else if (nameAtributte === "price" && !/^\d+$/.test(input.value)) {
        input.classList.replace("success-input", "error-input");
        msg.textContent = "El precio debe ser un número válido";
        msg.classList.replace("text-green-500", "text-red-500");
        valid = false
    }

    // Validar el input
    if (!valid) activeModal.querySelector('[type="submit"]').disabled = true

    // Validar si todos los campos estan completos
    const allCompletes = [...activeModal.querySelectorAll("input, textarea, select")].every(input => input.value.trim() !== "");

    // si todos los campos y el input es valido activar el boton
    if (allCompletes && valid) activeModal.querySelector('[type="submit"]').disabled = false

}

// Función para limpiar los formularios
function clearForms() {
    formCreate.reset();
    formUpdate.reset();

    formCreate.querySelector('[type="submit"]').disabled = true;
    formUpdate.querySelector('[type="submit"]').disabled = true;

    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.classList.remove('success-input');
        input.classList.remove('error-input');

        const id = input.getAttribute("aria-describedby");

        if (id) {
            const msg = document.querySelector(`#${id}`);
            msg.textContent = "";
        }
    })
}

// Animaciones
AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 40
});

// Modales
const modalRoots = document.querySelectorAll('[data-modal-root]');
let activeModal = null;

// Función para bloquear o desbloquear el scroll
const lockScroll = (shouldLock) => {
    document.body.classList.toggle('overflow-hidden', shouldLock);
};

// Función para animar el modal
const animateModal = (modal, isOpening) => {
    const panel = modal.querySelector('[data-modal-panel]');
    const backdrop = modal.querySelector('[data-modal-backdrop]');

    panel.classList.remove('animate-modalIn', 'animate-modalOut');
    backdrop.classList.remove('animate-backdropIn', 'animate-backdropOut');

    panel.classList.add(isOpening ? 'animate-modalIn' : 'animate-modalOut');
    backdrop.classList.add(isOpening ? 'animate-backdropIn' : 'animate-backdropOut');
};

// Función para abrir y cerrar el modal
const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    activeModal = modal;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    lockScroll(true);
    animateModal(modal, true);
};

// Función para cerrar el modal
const closeModal = (modal = activeModal) => {
    if (!modal) return;


    animateModal(modal, false);

    window.setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        if (activeModal === modal) {
            activeModal = null;
            lockScroll(false);
        }
    }, 200);
};
// Eventos para los modales

// Evento para que el boton de X cierre el modal
document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => {
        closeModal(button.closest('[data-modal-root]'));
    });
});

// Evento para que el modal se cierre si se hace click en el fondo
modalRoots.forEach((modal) => {
    modal.addEventListener('click', (event) => {
        // Verificar si se hizo click en el fondo
        if (event.target === modal || event.target.hasAttribute('data-modal-backdrop')) {
            closeModal(modal);
        }
    });
});

// Evento para que el modal se cierre si se presiona la tecla escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && activeModal) {
        closeModal(activeModal);
    }
});

findAllProducts();

