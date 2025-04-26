window.addEventListener('load', function() {
    videoPlay();
    arrowMobile();    
});
  

videoPlay = () => {
    var video = document.getElementById('logo-video');
    video.play();
}

arrowMobile = () => {
  const arrowMobile = document.getElementById('arrow-mobile');
  const initialViewMobile = document.getElementById('about-mobile-primary');
  const secondaryViewMobile = document.getElementById('about-mobile-secondary');

  arrowMobile.addEventListener('click', (event) => {
    event.preventDefault();
    initialViewMobile.style.display = 'none'; // Oculta título y flecha
    secondaryViewMobile.classList.add('active'); // Muestra el contenido desplazándose
  });
}  