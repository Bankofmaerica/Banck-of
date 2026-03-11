// ✅ Datos de usuarios incluidos directamente (sin depender de datos.js externo)
const usuarios = [
  {
    inicioSesion: "Bank-ofa",
    correo: "edwincungachi56@gmail.com",
    contrasena: "7528",
    nombre: "EDWIN RODRIGO CUNGACHI TACURI",
    cuenta: {
      nombre: "Cuenta Ahorros",
      numero: "4177 7300 8891 6385",
      saldo: 17500,
      creditos: 0,
      prestamos: 0,
      movimientos: [
        {
          descripcion: "Depósito inicial",
          fecha: "26/02/2026",
          monto: "+$17500"
        }
      ]
    }
  }
];

document.addEventListener("DOMContentLoaded", function () {
  const formularioLogin = document.getElementById("formularioLogin");

  if (!formularioLogin) return;

  formularioLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputCorreo     = document.getElementById("correo");
    const inputContrasena = document.getElementById("contrasena");

    if (!inputCorreo || !inputContrasena) {
      console.error("No se encontraron los campos del formulario.");
      return;
    }

    const correo     = inputCorreo.value.trim().toLowerCase();
    const contrasena = inputContrasena.value.trim();

    const usuario = usuarios.find(function (u) {
      if (!u || !u.correo) return false;
      return String(u.correo).trim().toLowerCase() === correo;
    });

    const contrasenaOk = usuario &&
      String(usuario.contrasena).trim() === String(contrasena).trim();

    if (usuario && contrasenaOk) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      window.location.href = "Cuenta.html";
    } else {
      alert("Correo o contraseña incorrectos. Inténtalo de nuevo.");
    }
  });
});
