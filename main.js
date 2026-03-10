const usuarios = [
  {
    login: "Bank-ofa",
    correo: "edwinrodrigocungachi@gmail.com",
    contraseña: "7528",
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
          fecha: "10/03/2026", 
          monto: "+$17500" 
        }
      ]
    }
  }
];

export default usuarios;
