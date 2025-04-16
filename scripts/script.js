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

//handles the nsfw button
document.addEventListener("DOMContentLoaded", function () {
  const nsfwButton = document.querySelector(".filter-buttons button.nsfw");
  const nsfwToggle = document.querySelector("#nsfwToggle");
  const nsfwModal = document.querySelector("#nsfw-confirm-modal");
  const nsfwConfirm = document.querySelector("#confirm-nsfw-yes");
  const nsfwDecline = document.querySelector("#confirm-nsfw-no");
  

  // Initially hide the NSFW button
  nsfwButton.classList.add("hidden");

  // When the user toggles the NSFW checkbox
  nsfwToggle.addEventListener("change", function () {
    if (nsfwToggle.checked) {
      nsfwModal.style.display = "block"; // Show modal
    } else {
      nsfwButton.classList.add("hidden");
    }
  });

  // When the user confirms NSFW content
  nsfwConfirm.addEventListener("click", function () {
    nsfwButton.classList.remove("hidden"); // Show NSFW button
    nsfwModal.style.display = "none"; // Close modal
  });

  // When the user declines NSFW content
  nsfwDecline.addEventListener("click", function () {
    nsfwToggle.checked = false; // Uncheck the toggle
    nsfwModal.style.display = "none"; // Close modal
  });
});
