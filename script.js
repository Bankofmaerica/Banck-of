documento.addEventListener("DOMCargado", function () {
  const formularioLogin = document.getElementById("formularioLogin");
  if (!formularioLogin) {
    console.error("No se encontró el formulario #formularioLogin en la página.");
    return;
  }

  formularioLogin.addEventListener("enviar", function (e) {
    e.preventDefault();

    const inputCorreo = document.getElementById("correo");
    const inputContraseña = document.getElementById("contraseña");

    if (!inputCorreo || !inputContraseña) {
      console.error("No se encontraron los campos de correo o contraseña.");
      return;
    }

    const correo = inputCorreo.value.trim().toLowerCase();
    const contraseña = inputContraseña.value.trim();

    console.log("Intento de inicio de sesión:", { correo /* no muestres contraseña en prod */ });

    // Asegúrate de que la variable 'usuarios' está cargada (viene de datos.js)
    if (typeof usuarios === "indefinido") {
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
      // Guardar en almacenamientoLocal y redirigir
      almacenamientoLocal.setItem("usuarioConectado", JSON.stringify(usuario));
      ventana.ubicacion.href = "Cuenta.html";
    } else {
      console.advertencia("Credenciales incorrectas para:", correo);
      alert("Credenciales incorrectas");
    }
  });
});
