let nsfwVisible = true; // Flag to track whether NSFW button should be visible

async function loadGallery() {
  const res = await fetch("gallery.json");
  const data = await res.json();

  const gallery = document.getElementById("gallery");
  const filters = document.getElementById("filterButtons");
  const nsfwToggle = document.getElementById("nsfwToggle");

  let currentFilter = "All";

  function isNSFWCategory(category) {
    return category.trim().toLowerCase() === "nsfw";
  }

  function displayGallery(filter) {
    gallery.innerHTML = "";

    Object.entries(data).forEach(([category, images], index) => {
      const isNSFW = isNSFWCategory(category);
      const showNSFW = nsfwToggle.checked;

      // Skip NSFW unless toggled on
      if (isNSFW && !showNSFW) return;

      // Apply filter
      if (filter !== "All" && filter !== category) return;

      // Add separator (except before the first category shown)
      if (index > 0) {
        const separator = document.createElement("hr");
        separator.classList.add("category-separator");
        gallery.appendChild(separator);
      }

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

    const baseCategories = Object.keys(data).filter(cat => !isNSFWCategory(cat));
    const allCategories = nsfwToggle.checked
      ? ["All", ...baseCategories, ...Object.keys(data).filter(isNSFWCategory)]
      : ["All", ...baseCategories];

    allCategories.forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      if (isNSFWCategory(cat)) btn.classList.add("nsfw");
      if (cat === currentFilter) btn.classList.add("active");

      btn.addEventListener("click", () => {
        currentFilter = cat;
        document.querySelectorAll("#filterButtons button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        displayGallery(currentFilter);
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

  nsfwToggle.addEventListener("change", () => {
    const wantsNSFW = nsfwToggle.checked;
  
    if (wantsNSFW && nsfwVisible) {
      const modal = document.getElementById("nsfw-modal");
      const modalYes = document.getElementById("modal-yes");
      const modalNo = document.getElementById("modal-no");
  
      modal.style.display = "block";
  
      // Prevent duplicate listeners
      modalYes.onclick = () => {
        modal.style.display = "none";
        nsfwVisible = true;
        buildFilterButtons();
        displayGallery(currentFilter);
      };
  
      modalNo.onclick = () => {
        modal.style.display = "none";
        nsfwVisible = false;
        nsfwToggle.checked = false;
        currentFilter = "All";
        buildFilterButtons();
        displayGallery(currentFilter);
      };
    } else {
      if (!wantsNSFW && isNSFWCategory(currentFilter)) {
        currentFilter = "All";
      }
      buildFilterButtons();
      displayGallery(currentFilter);
    }
  });
  

  buildFilterButtons();
  displayGallery(currentFilter);
}

// Fade-in animation function
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
