document.addEventListener("DOMContentLoaded", function () {
  const formularioLogin = document.getElementById("formularioLogin");

  // Si no estamos en la página de login, salimos silenciosamente
  if (!formularioLogin) return;

  formularioLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputCorreo    = document.getElementById("correo");
    const inputContrasena = document.getElementById("contrasena");

    if (!inputCorreo || !inputContrasena) {
      console.error("No se encontraron los campos de correo o contraseña.");
      return;
    }

    const correo    = inputCorreo.value.trim().toLowerCase();
    const contrasena = inputContrasena.value.trim();

    // Verificar que datos.js fue cargado
    if (typeof usuarios === "undefined") {
      alert("Error interno: datos de usuarios no cargados.");
      console.error("La variable 'usuarios' no está definida. ¿datos.js fue cargado?");
      return;
    }

    // Buscar usuario por correo
    const usuario = usuarios.find(function (u) {
      if (!u || !u.correo) return false;
      return String(u.correo).trim().toLowerCase() === correo;
    });

    // Verificar contraseña
    const contrasenaOk = usuario &&
      String(usuario.contrasena).trim() === String(contrasena).trim();

    if (usuario && contrasenaOk) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      window.location.href = "Cuenta.html";
    } else {
      alert("Correo o contraseña incorrectos. Inténtalo de nuevo.");
      console.warn("Credenciales incorrectas para:", correo);
    }
  });
});
