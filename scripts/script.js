//---------manage single page - navigation
   document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.dataset.section;
      showSection(section);
    });
  });
  
  function showSection(section) {
    // Hide all
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('aboutSection').style.display = 'none';
    document.getElementById('contactSection').style.display = 'none';
  
    // Show selected
    if (section === 'home') {
      document.getElementById('homeSection').style.display = '';
      loadGallery(); // <--- Call loader here
    } else if (section === 'about') {
      document.getElementById('aboutSection').style.display = '';
    } else if (section === 'contact') {
      document.getElementById('contactSection').style.display = '';
    }
  
    // Optional: Update URL without reloading
    history.pushState({ section }, '', `#${section}`);
  }
  
  // Optional: Handle back/forward browser buttons
  window.addEventListener('popstate', (e) => {
    const section = e.state?.section || 'home';
    showSection(section);
  });
  
  // Load section from URL on initial load
  window.addEventListener('DOMContentLoaded', () => {
    const sectionFromHash = location.hash.replace('#', '') || 'home';
    showSection(sectionFromHash);
  });
  