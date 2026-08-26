(function () {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navItems = document.querySelector('.navbar-items');

  function closeMenu() {
    navItems.classList.remove('mobile-open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = navItems.classList.toggle('mobile-open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  navItems.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
})();
