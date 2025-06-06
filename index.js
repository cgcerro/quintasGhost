window.addEventListener('load', function() {
    videoLogoPlay();
    arrowMobile();
    arrowTabletVertical();
    arrowTabletHorizontal();
    arrowDesktop();
    videoTrailer();
});

 isAppleDevice = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

  

videoLogoPlay = () => {
    var video = document.getElementById('logo-video');
    var videoTabletVertical = document.getElementById('logo-video-tablet-vertical');
    var videoTabletHorizontal = document.getElementById('logo-video-tablet-horizontal');
    var videoDesktop = document.getElementById('logo-video-desktop');
   
    
   
    const imageLogo = document.createElement('img');
    imageLogo.src = 'videos/logo.gif';

    video.replaceWith(imageLogo);

    const imageLogoTabletVertical = document.createElement('img');
    imageLogoTabletVertical.src = 'videos/logo.gif';

    videoTabletVertical.replaceWith(imageLogoTabletVertical);

    const imageLogoTabletHorizontal = document.createElement('img');
    imageLogoTabletHorizontal.src = 'videos/logo.gif';
    videoTabletHorizontal.replaceWith(imageLogoTabletHorizontal);

    const imageLogoTabletDesktop = document.createElement('img');
    imageLogoTabletDesktop.src = 'videos/logo.gif';
    videoDesktop.replaceWith(imageLogoTabletDesktop);
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

arrowTabletHorizontal = () => {
  const arrowTabletHorizontal = document.getElementById('arrow-tablet-horizontal');
  const aboutTabletHorizontal = document.getElementById('about-tablet-horizontal');
  

  arrowTabletHorizontal.addEventListener('click', (event) => {
    event.preventDefault();
    aboutTabletHorizontal.classList.add('active');
  });
}

arrowDesktop = () => {
  const arrowDesktop = document.getElementById('arrow-desktop');
  const aboutDesktop = document.getElementById('about-desktop');
  

  arrowDesktop.addEventListener('click', (event) => {
    event.preventDefault();
    aboutDesktop.classList.add('active');
  });
}

videoTrailer = () => {
    const trailerButton = document.getElementById('trailer-button');
    const trailerButtonTabletVertical = document.getElementById('trailer-button-tablet');
    const trailerButtonTabletHorizontal = document.getElementById('trailer-button-tablet-horizontal');
    const trailerButtonDesktop = document.getElementById('trailer-button-desktop');

    trailerButton.addEventListener('click', playVideoFullscreen);
    trailerButtonTabletVertical.addEventListener('click', playVideoFullscreen);
    trailerButtonTabletHorizontal.addEventListener('click', playVideoFullscreen);
    trailerButtonDesktop.addEventListener('click', playVideoFullscreen);
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
    trailerVideo.src = 'videos/teaser.mov'; // <-- tu ruta
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

      window.addEventListener("orientationchange", function() {
        trailerVideo.style.position = 'fixed';
        trailerVideo.style.top = '0';
        trailerVideo.style.left = '0';
        trailerVideo.style.width = '100%';
        trailerVideo.style.height = '100%';
      });
    
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
    const contactLinkTabletHorizontal = document.getElementById('contact-link-tablet-horizontal');
    const contactLinkDesktop = document.getElementById('contact-link-desktop');

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
    contactLinkTabletHorizontal.addEventListener('click', function(e) {
        e.preventDefault();
        contactOverlay.classList.add('active');
    });
    contactLinkDesktop.addEventListener('click', function(e) {
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

