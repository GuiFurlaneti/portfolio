(function () {
  const toggleBtn = document.getElementById('theme-toggle');

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');

    try {
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    } catch (e) {}
  });
})();
