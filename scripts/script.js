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

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

//cursor particles
document.addEventListener("mousemove", (e) => {
  const particle = document.createElement("div");
  particle.classList.add("cursor-particle");

  // ⬇️ Add this: Random size between 4px and 8px
  const size = Math.random() * 4 + 4; // 4 to 8
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particle.style.left = `${e.clientX}px`;
  particle.style.top = `${e.clientY}px`;

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 500); // match fadeOut animation duration
});


