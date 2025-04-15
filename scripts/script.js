async function loadGallery() {
  const res = await fetch("gallery.json");
  const data = await res.json();

  const gallery = document.getElementById("gallery");
  const filters = document.getElementById("filterButtons");

  const categories = Object.keys(data).filter(cat => cat.toLowerCase() !== "nsfw");
  const nsfwEnabled = document.getElementById("nsfwToggle");

  function displayGallery(filter) {
    gallery.innerHTML = "";
    const showNSFW = nsfwEnabled.checked;

    Object.entries(data).forEach(([category, images]) => {
      if (category.toLowerCase() === "nsfw" && !showNSFW) return;
      if (filter && filter !== category) return;

      const section = document.createElement("section");
      section.classList.add("gallery-section");

      const h2 = document.createElement("h2");
      h2.textContent = category;
      section.appendChild(h2);

      const grid = document.createElement("div");
      grid.className = "gallery-grid";

      images.forEach(src => {
        const img = document.createElement("img");
        img.src = decodeURIComponent(src);
        img.alt = category;
        img.className = "gallery-image";
        img.addEventListener("click", () => openLightbox(img.src));
        grid.appendChild(img);
      });

      section.appendChild(grid);
      gallery.appendChild(section);
    });

    observeFadeIn();
  }

  function buildFilterButtons() {
    filters.innerHTML = "";
    ["All", ...categories].forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.className = cat === "All" ? "active" : "";
      btn.addEventListener("click", () => {
        document.querySelectorAll("#filterButtons button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        displayGallery(cat === "All" ? null : cat);
      });
      filters.appendChild(btn);
    });
  }

  function openLightbox(src) {
    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-img");
    lbImg.src = src;
    lb.classList.remove("hidden");
  }

  document.getElementById("lightbox-close").addEventListener("click", () => {
    document.getElementById("lightbox").classList.add("hidden");
  });

  nsfwEnabled.addEventListener("change", () => {
    displayGallery(document.querySelector("#filterButtons .active")?.textContent || null);
  });

  buildFilterButtons();
  displayGallery();
}

// Fade-in on scroll
function observeFadeIn() {
  const sections = document.querySelectorAll(".gallery-section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
}

loadGallery();
