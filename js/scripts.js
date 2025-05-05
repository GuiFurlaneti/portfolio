const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Verifica se há tema salvo
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggleBtn.textContent = '🌙'; // indica que o modo atual é claro
} else {
    toggleBtn.textContent = '☀️'; // indica que o modo atual é escuro
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    // Salvar preferência
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = '🌙';
    } else {
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = '☀️';
    }
});
