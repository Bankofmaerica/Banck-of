document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) {
    console.error("No se encontró el formulario #loginForm en la página.");
    return;
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (!emailInput || !passwordInput) {
      console.error("No se encontraron los inputs de email o password.");
      return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    console.log("Intento de login:", { email /* no muestres password en prod */ });

    // Asegúrate de que la variable 'usuarios' está cargada (viene de data.js)
    if (typeof usuarios === "undefined") {
      console.error("La variable 'usuarios' no está definida. ¿data.js fue cargado correctamente?");
      alert("Error interno: usuarios no cargados. Revisa la consola del navegador.");
      return;
    }

    // Buscar usuario por email (normalizado)
    const usuario = usuarios.find(user => {
      if (!user || !user.email) return false;
      return String(user.email).trim().toLowerCase() === email;
    });

    console.log("Usuario encontrado:", usuario ? { email: usuario.email, nombre: usuario.nombre } : null);

    // Comparación de contraseña más tolerante (trim + String)
    const passOk = usuario && String(usuario.password).trim() === String(password).trim();

    if (usuario && passOk) {
      // Guardar en localStorage y redirigir
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      window.location.href = "Cuenta.html";
    } else {
      console.warn("Credenciales incorrectas para:", email);
      alert("Credenciales incorrectas");
    }
  });
});
