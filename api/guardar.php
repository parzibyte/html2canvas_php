<?php
/**
 * Recibir screenshot tomada con html2canvas desde JavaScript
 * Visita: https://parzibyte.me/blog
 *
 * @author parzibyte
 */

$payload = json_decode(file_get_contents("php://input"));
if (!$payload) {
    exit("¡No hay payload!");
}

$captura = $payload->captura;
$by = $payload->by;
// Aquí obtener más datos si existen...

// Quitar "data:image..." de la cadena
$capturaLimpia = str_replace("data:image/png;base64,", "", urldecode($captura));
//Venía codificada pero sólo la codificamos así para que viajara por la red,
//ahora la decodificamos y
//guardamos el contenido dentro de un archivo
$imagenDecodificada = base64_decode($capturaLimpia);

//Calcular un nombre único
// Nota: el nombre podría enviarse con la carga útil desde JS
$nombreImagenGuardada = "captura_" . uniqid() . ".png";
//Escribir el archivo
file_put_contents($nombreImagenGuardada, $imagenDecodificada);
echo $nombreImagenGuardada;
