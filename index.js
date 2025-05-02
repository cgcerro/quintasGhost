window.addEventListener('load', function() {
    videoLogoPlay();
    arrowMobile();
    arrowTabletVertical();
    videoTrailer();
});

 isAppleDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const plataforma = navigator.platform;

  const esIphone = /iPhone/.test(userAgent);
  const esMac = /Mac/.test(plataforma);

  return esIphone || esMac;
}
  

videoLogoPlay = () => {
    var video = document.getElementById('logo-video');
    var videoTabletVertical = document.getElementById('logo-video-tablet-vertical');
    // change video logo src, if is iphone or mac to logo.mov
    if (isAppleDevice()) {
        video.src = 'videos/logo.mov';
        videoTabletVertical.src = 'videos/logo.mov';
    }
    
    video.play();
    videoTabletVertical.play();
}

arrowMobile = () => {
  const arrowMobile = document.getElementById('arrow-mobile');
  const aboutMobile = document.getElementById('about-mobile');
  

  arrowMobile.addEventListener('click', (event) => {
    event.preventDefault();
    aboutMobile.classList.add('active');
  });
}

arrowTabletVertical = () => {
  const arrowTabletVertical = document.getElementById('arrow-tablet-vertical');
  const aboutTabletVertical = document.getElementById('about-tablet-vertical');
  

  arrowTabletVertical.addEventListener('click', (event) => {
    event.preventDefault();
    aboutTabletVertical.classList.add('active');
  });
}

videoTrailer = () => {
    const trailerButton = document.getElementById('trailer-button');
    const trailerButtonTabletVertical = document.getElementById('trailer-button-tablet');
    trailerButton.addEventListener('click', playVideoFullscreen);
    trailerButtonTabletVertical.addEventListener('click', playVideoFullscreen);
  }

isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  
  const lockOrientationLandscape = async () => {
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock('landscape');
      } catch (err) {
        console.warn('No se pudo bloquear orientación:', err);
      }
    }
  };
  
  const openFullscreen = element => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { 
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  
  const playVideoFullscreen = async () => {

    // Crear el video dinámicamente
    const trailerVideo = document.createElement('video');
    trailerVideo.src = 'videos/logo.webm'; // <-- tu ruta
    trailerVideo.controls = true;
    trailerVideo.style.position = 'fixed';
    trailerVideo.style.top = '0';
    trailerVideo.style.left = '0';
    trailerVideo.style.width = '100%';
    trailerVideo.style.height = '100%';
    trailerVideo.style.zIndex = '9999';
    trailerVideo.style.backgroundColor = 'black'; // por si acaso
    trailerVideo.style.objectFit = 'contain'; // para que no se deforme
    trailerVideo.autoplay = true;

    document.body.appendChild(trailerVideo);

    if (isMobile()) {
        await lockOrientationLandscape();
    }
      
      openFullscreen(trailerVideo);
    
      trailerVideo.play();
    
      // Cuando el vídeo termina o el usuario sale del fullscreen, quitarlo
      function cleanup() {
        trailerVideo.pause();
        trailerVideo.remove();
      }
    
      trailerVideo.addEventListener('ended', cleanup);
      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
          cleanup();
        }
      });
  };

// Contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactLink = document.getElementById('contact-link');
    const contactLinkTabletVertical = document.getElementById('contact-link-tablet');
    const contactOverlay = document.getElementById('contact-form-overlay');
    const closeButton = document.getElementById('close-contact-form');
    const contactForm = document.getElementById('contact-form');
    const result = document.getElementById('contact-result');

    // Open form
    contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        contactOverlay.classList.add('active');
    });
    contactLinkTabletVertical.addEventListener('click', function(e) {
        e.preventDefault();
        contactOverlay.classList.add('active');
    });

    // Close form
    closeButton.addEventListener('click', function() {
        contactOverlay.classList.remove('active');
    });

    // Close form when clicking outside
    contactOverlay.addEventListener('click', function(e) {
        if (e.target === contactOverlay) {
            contactOverlay.classList.remove('active');
        }
    });

    // Manejar envío del formulario
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      result.innerHTML = "Enviando mensaje..."
    
      fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
                // Esperar 2 segundos antes de cerrar el formulario
                setTimeout(() => {
                    contactOverlay.classList.remove('active');
                    contactForm.reset();
                    result.innerHTML = "";
                }, 2000);
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "¡Algo salió mal! Por favor, inténtalo de nuevo.";
        });
    });
});

