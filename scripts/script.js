//---------manage single page - navigation
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = link.dataset.section;
    showSection(section);
  });
});

function showSection(section) {
  // Hide all sections
  document.getElementById('homeSection').style.display = 'none';
  document.getElementById('aboutSection').style.display = 'none';
  document.getElementById('contactSection').style.display = 'none';

  // Show the selected section
  if (section === 'home') {
    document.getElementById('homeSection').style.display = '';
  } else if (section === 'about') {
    document.getElementById('aboutSection').style.display = '';
  } else if (section === 'contact') {
    document.getElementById('contactSection').style.display = '';
  }

  // Optional: Update URL without reloading
  history.pushState({ section }, '', `#${section}`);
}
