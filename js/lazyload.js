(function() {

  // --------------------------------------
  //
  // Юзаем Intersection Observer API для 
  // ленивой загрузки изображений
  //
  // --------------------------------------

  const images = document.querySelectorAll('.olazy');
  const options = {
    rootMargin: '50px 0px',
    threshold: 0.01
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          const { target } = entry;
          const { src } = target.dataset;
          target.src = src;
          target.onload = function() {
            this.classList.add('loaded');
            if ( this.parentNode.querySelector('.spinner') !== null ) {
              this.parentNode.querySelector('.spinner').remove()
            }
          }
          io.unobserve(target);
        }
      })
    }, options);
  
    images.forEach(image => {
      io.observe(image);
    });

  } else {
    images.forEach(image => {
      const src = image.dataset.src
      image.src = src;
    });
  }

  console.log('Lazyload is ready');
})()