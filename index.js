window.addEventListener('load', function() {
    videoLogoPlay();
    arrowMobile();
    videoTrailer();
});
  

videoLogoPlay = () => {
    var video = document.getElementById('logo-video');
    video.play();
}

arrowMobile = () => {
  const arrowMobile = document.getElementById('arrow-mobile');
  const aboutMobile = document.getElementById('about-mobile');
  

  arrowMobile.addEventListener('click', (event) => {
    event.preventDefault();
    aboutMobile.classList.add('active');
  });
}

videoTrailer = () => {
    const trailerButton = document.getElementById('trailer-button');
    trailerButton.addEventListener('click', playVideoFullscreen);
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

