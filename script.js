function navigateTo(pageId) {
    // 1. Sembunyikan semua halaman
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    // 2. Tampilkan halaman yang diminta
    const target = document.getElementById(pageId);
    if (target) {
        target.style.display = 'block';
        // Sedikit delay agar animasi fade-in berjalan
        setTimeout(() => {
            target.classList.add('active');
        }, 10);
    }
    
    // 3. Scroll ke atas
    window.scrollTo(0, 0);
}

// Inisialisasi: Pastikan dashboard muncul pertama kali
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('page-dashboard');
});
