/**
 * Tomar screenshot de página web con html2canvas para enviarla a un servidor
 * web con PHP y guardarla como imagen
 * Visita: https://parzibyte.me/blog
 * 
 * @author parzibyte
 */
//Definimos el botón para escuchar su click
const $boton = document.querySelector("#btnCapturar"), // El botón que desencadena
  $objetivo = document.body; // A qué le tomamos la foto

const enviarCapturaAServidor = canvas => {
  // Cuando se resuelva la promesa traerá el canvas
  // Convertir la imagen a Base64
  let imagenComoBase64 = canvas.toDataURL();
  // Codificarla, ya que a veces aparecen errores si no se hace
  imagenComoBase64 = encodeURIComponent(imagenComoBase64);
  // La carga útil como JSON
  const payload = {
    "captura": imagenComoBase64,
    "by": "Parzibyte",
    // Aquí más datos...
  };
  // Aquí la ruta en donde enviamos la foto. Podría ser una absoluta o relativa
  const ruta = "./api/guardar.php";
  fetch(ruta, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    }
  })
    .then(resultado => {
      // A los datos los decodificamos como texto plano
      return resultado.text()
    })
    .then(nombreDeLaFoto => {
      // nombreDeLaFoto trae el nombre de la imagen que le dio PHP
      console.log({ nombreDeLaFoto });
      alert(`Guardada como ${nombreDeLaFoto}`);

    });
};

// Agregar el listener al botón
$boton.addEventListener("click", () => {
  html2canvas($objetivo) // Llamar a html2canvas y pasarle el elemento
    .then(enviarCapturaAServidor); // Cuando se resuelva, enviarla al servidor
});