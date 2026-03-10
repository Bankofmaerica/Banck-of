// main.js
function verificarAutenticacion() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuario) {
        window.location.href = "index.html";
    }
    return usuario;
}

function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "index.html";
}

// Función para inicializar la barra de pestañas
function initTabs() {
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cambia la pestaña activa
            document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Función para cargar datos del usuario en la página
function cargarDatosUsuario() {
    const usuario = verificarAutenticacion();
    
    // Actualizar nombre de usuario en todas las páginas
    document.querySelectorAll('.welcome, .user-area span, .right-section span, .usuario span').forEach(el => {
        el.textContent = `Bienvenido, ${usuario.nombre}`;
    });
    
    // En la página de inicio
    if (document.getElementById("nombreCuenta")) {
        document.getElementById("nombreCuenta").textContent = usuario.cuenta.nombre;
        document.getElementById("numeroCuenta").textContent = `Cuenta: ${usuario.cuenta.numero}`;
        document.getElementById("saldoCuenta").textContent = `$${usuario.cuenta.saldo}`;
        document.getElementById("creditosCuenta").textContent = usuario.cuenta.creditos;
        document.getElementById("prestamosCuenta").textContent = usuario.cuenta.prestamos;
        document.getElementById("cantidadMovs").textContent = usuario.cuenta.movimientos.length;

        const listaMovs = document.getElementById("listaMovimientos");
        if (usuario.cuenta.movimientos.length > 0) {
            usuario.cuenta.movimientos.forEach(mov => {
                const div = document.createElement("div");
                div.className = "movement";
                div.innerHTML = `
                    <div class="movement-info">
                        <div>${mov.descripcion}</div>
                        <div class="movement-date">${mov.fecha}</div>
                    </div>
                    <div class="movement-amount">${mov.monto}</div>
                `;
                listaMovs.appendChild(div);
            });
        } else {
            listaMovs.innerHTML = `<p style="color:#777;">No hay movimientos registrados</p>`;
        }
    }
    
    // Configurar botones de cerrar sesión
    document.querySelectorAll('.logout-btn, .cerrar').forEach(btn => {
        btn.addEventListener('click', cerrarSesion);
    });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosUsuario();
    initTabs();
});