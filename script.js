function navigateTo(pageId) {
    // Navigasi internal dashboard
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    const target = document.getElementById(pageId);
    if (target) {
        target.style.display = 'block';
        setTimeout(() => {
            target.classList.add('active');
        }, 10);
    }
    window.scrollTo(0, 0);
}

// Default: Buka halaman home dashboard saat file dashboard.html dimuat
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('page-dashboard');
});
