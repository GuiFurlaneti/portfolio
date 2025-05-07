const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  // Atualiza o ícone conforme o modo
  if (document.body.classList.contains('light-mode')) {
    themeIcon.classList.remove('bi-moon-fill');
    themeIcon.classList.add('bi-sun-fill');
  } else {
    themeIcon.classList.remove('bi-sun-fill');
    themeIcon.classList.add('bi-moon-fill');
  }
});
