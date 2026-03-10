document.addEventListener("DOMContentLoaded", function () {
  const formularioLogin = document.getElementById("formularioLogin");
  if (!formularioLogin) {
    console.error("No se encontró el formulario #formularioLogin en la página.");
    return;
  }

  formularioLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputCorreo = document.getElementById("correo");
    const inputContraseña = document.getElementById("contraseña");

    if (!inputCorreo || !inputContraseña) {
      console.error("No se encontraron los campos de correo o contraseña.");
      return;
    }

    const correo = inputCorreo.value.trim().toLowerCase();
    const contraseña = inputContraseña.value.trim();

    console.log("Intento de inicio de sesión:", { correo });

    // Verifica que usuarios está disponible (cargado desde datos.js)
    if (typeof usuarios === "undefined") {
      console.error("La variable 'usuarios' no está definida. ¿datos.js fue cargado correctamente?");
      alert("Error interno: usuarios no cargados. Revisa la consola del navegador.");
      return;
    }

    // Buscar usuario por correo (normalizado)
    const usuario = usuarios.find(usuario => {
      if (!usuario || !usuario.correo) return false;
      return String(usuario.correo).trim().toLowerCase() === correo;
    });

    console.log("Usuario encontrado:", usuario ? { correo: usuario.correo, nombre: usuario.nombre } : null);

    // Comparación de contraseña más tolerante (trim + String)
    const contraseñaOk = usuario && String(usuario.contraseña).trim() === String(contraseña).trim();

    if (usuario && contraseñaOk) {
      // Guardar en localStorage y redirigir
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      window.location.href = "Cuenta.html";
    } else {
      console.warn("Credenciales incorrectas para:", correo);
      alert("Credenciales incorrectas");
    }
  });
});
