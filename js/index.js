function toggleTheme() {
    const theme = document.getElementById('darkmode-toggle').checked ? 'light' : 'dark';
    document.body.setAttribute("data-bs-theme", theme);
}
const checkbox = document.getElementById('check-unit');