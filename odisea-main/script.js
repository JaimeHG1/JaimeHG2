

document.addEventListener("DOMContentLoaded", function() {

    const imagen = document.querySelector("#introduccion .imagen");
    const popup = document.querySelector("#introduccion .popup");
    const cerrarPopup = document.querySelector("#introduccion .popup .cerrar_popup");
 


    // Comprueba si ambos elementos existen y abre y cierra el popup
    if (imagen && popup) {
        imagen.addEventListener("click", function() {
            console.log('Abriendo el popup del video YT');
            popup.classList.add("activo"); // Añade la clase 'activo' al popup
            document.body.style.overflow = "hidden";
        });
    }

    if (cerrarPopup) {
        cerrarPopup.addEventListener("click", function() {
            console.log('Cerrando el popup del video YT');
            popup.classList.remove("activo"); // Borra la clase 'activo' al popup
            document.body.style.overflow = "auto"; 

        });
    }

    // Esto hace que el scroll sea suave y que vaya mas arriba de donde esta en elemento para que se vea bien el titulo y se vea un españcio por encima
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          const offset = 80; // Ajusta este valor
          const position = target.offsetTop - offset;
      
          window.scrollTo({
            top: position,
            behavior: 'smooth' // Opcional, para un desplazamiento suave
          });
        });
      });


      // Verificar si el navegador soporta la API de Geolocalización
      if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Obtener las coordenadas
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    // Mostrar la información en la página
                    const locationInfo = document.getElementById("location-info");
                    locationInfo.innerHTML = `<p>Estás viendo esta página desde: Latitud: ${lat} Longitud: ${lon}</p>`;

                    console.log("Ubicación obtenida: ", { lat, lon }); // Depuración

                    // Opcional: Mostrar un enlace a Google Maps
                    const mapLink = document.createElement("a");
                    mapLink.href = `https://www.google.com/maps?q=${lat},${lon}`;
                    mapLink.textContent = "Ver en Google Maps";
                    mapLink.target = "_blank";
                    locationInfo.appendChild(mapLink);
                },
                (error) => {
                    // Manejar errores
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert("El usuario negó el permiso para la geolocalización.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("La ubicación no está disponible.");
                            break;
                        case error.TIMEOUT:
                            alert("La solicitud de ubicación expiró.");
                            break;
                        default:
                            alert("Ocurrió un error desconocido.");
                    }
                }
            );
        } else {
            alert("La geolocalización no está soportada por este navegador.");
        }
  
});