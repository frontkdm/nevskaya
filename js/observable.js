(function() {

  // --------------------------------------
  // 
  // Юзаем Intersection Observer API для 
  // разных взаимодействий при попадании элемента в viewport
  // (анимации и п.р)
  //
  // --------------------------------------

  const observables = document.querySelectorAll('.observables');
  const options = {
    marginRoot: '50px 0',
    threshold: 0.01
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const { target } = entry;
          target.classList.add('fade-down');
          io.unobserve(target);
        }
      })
    }, options);
  
    observables.forEach(observable => io.observe(observable));

  } else {
    observables.forEach(obs =>  obs.classList.add('fade-down'));
  }

  console.log('Observable is ready');
})();