const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  // Alterna visibilidade entre ícones
  document.getElementById('icon-moon').style.display = document.body.classList.contains('light-mode') ? 'none' : 'inline';
  document.getElementById('icon-sun').style.display = document.body.classList.contains('light-mode') ? 'inline' : 'none';
});
