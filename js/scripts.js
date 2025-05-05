const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se há tema salvo no localStorage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggleBtn.textContent = '🌙'; // modo escuro
}

// Alterna o tema ao clicar
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        toggleBtn.textContent = '🌙'; // volta para escuro
        localStorage.setItem('theme', 'light');
    } else {
        toggleBtn.textContent = '☀️'; // volta para claro
        localStorage.setItem('theme', 'dark');
    }
});