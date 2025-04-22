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
  let targetSection;
  if (section === 'home') {
    targetSection = document.getElementById('homeSection');
  } else if (section === 'about') {
    targetSection = document.getElementById('aboutSection');
  } else if (section === 'contact') {
    targetSection = document.getElementById('contactSection');
  }

  if (targetSection) {
    targetSection.style.display = '';

    // Scroll to the section after it's shown
    setTimeout(() => {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // slight delay to ensure it's visible
  }

  // Optional: Update URL without reloading
  history.pushState({ section }, '', `#${section}`);
}
//OLD
// function showSection(section) {
//   // Hide all sections
//   document.getElementById('homeSection').style.display = 'none';
//   document.getElementById('aboutSection').style.display = 'none';
//   document.getElementById('contactSection').style.display = 'none';

//   // Show the selected section
//   if (section === 'home') {
//     document.getElementById('homeSection').style.display = '';
//   } else if (section === 'about') {
//     document.getElementById('aboutSection').style.display = '';
//   } else if (section === 'contact') {
//     document.getElementById('contactSection').style.display = '';
//   }

//   // Optional: Update URL without reloading
//   history.pushState({ section }, '', `#${section}`);
// }

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

// landing page logic - auto fade after 4s
window.addEventListener("DOMContentLoaded", () => {
  const landing = document.getElementById("landing");
  const content = document.querySelector(".content");

  setTimeout(() => {
    landing.classList.add("fade-out");

    // Reveal content after fade-out completes
    setTimeout(() => {
      landing.remove(); // completely remove the landing div
      content.classList.remove("hidden");
      content.classList.add("fade-in");
    }, 1000); // matches your CSS transition duration
  }, 4250); // 4 seconds = duration of GIF
});







