const owner = "sterkiherz"; // Replace with your GitHub username
const repo = "art"; // Replace with your repo name
const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/gallery`;
const nav = document.getElementById("categoryNav");
const gallery = document.getElementById("gallery");


// Fetch folders for navigation
async function fetchFolders() {
  const response = await fetch(baseUrl);
  const data = await response.json();
  const folders = data.filter(item => item.type === "dir");

  // Create navigation buttons
  folders.forEach((folder, index) => {
    if (folder.name.toLowerCase() === "nsfw" && !nsfwAllowed) {
      return; // Skip NSFW unless permission is granted
    }

    // Create the button
    const button = document.createElement("button");

    // Icon span
    const icon = document.createElement("span");
    icon.className = "category-icon";

    // Choose emoji based on folder name
    switch (folder.name.toLowerCase()) {
      case "illustration":
        icon.textContent = "🎨 ";
        break;
      case "character work":
        icon.textContent = "🐈 ";
        break;
      case "graphic design":
        icon.textContent = "✨ ";
        break;
      case "nsfw":
        icon.textContent = "🔞 ";
        break;
      default:
        icon.textContent = "🍰 ";
    }

    // Label span
    const label = document.createElement("span");
    label.textContent = folder.name;

    // Combine icon + label into button
    button.appendChild(icon);
    button.appendChild(label);
    button.onclick = () => fetchImages(folder.name);

    // Special handling for NSFW button
    if (folder.name.toLowerCase() === "nsfw") {
      button.classList.add("nsfw-button");

      // Floating hearts animation
      button.addEventListener("mouseenter", () => {
        const heartInterval = setInterval(() => {
          const heart = document.createElement("span");
          heart.className = "heart-particle";
          heart.textContent = "❤";

          const x = Math.random() * button.offsetWidth;
          const y = Math.random() * button.offsetHeight;

          heart.style.left = `${x}px`;
          heart.style.top = `${y}px`;

          button.appendChild(heart);

          setTimeout(() => {
            heart.remove();
          }, 1000);
        }, 150);

        button.addEventListener(
          "mouseleave",
          () => {
            clearInterval(heartInterval);
          },
          { once: true }
        );
      });
    }

    nav.appendChild(button);

    // Load "Illustration" folder by default
    if (folder.name === "Illustration") {
      fetchImages(folder.name);
    }
  });
}

  
// Select popup elements
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const closeBtn = document.getElementById("close");

// Fetch and display images from a specific folder
async function fetchImages(folder) {
  const response = await fetch(`${baseUrl}/${folder}`);
  const data = await response.json();
  gallery.innerHTML = ""; // Clear existing images

  // Display images in the gallery
  data.forEach(file => {
    if (file.type === "file" && /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file.name)) { // Include WebP
      const img = document.createElement("img");
      img.src = file.download_url;
      img.alt = file.name;

      // Add click event for opening popup
      img.onclick = () => {
        popup.classList.remove("hidden");
        popupImg.src = img.src; // Set popup image source
      };

      gallery.appendChild(img);
    }
  });
}

// Close popup when clicking the close button or outside the image
closeBtn.onclick = () => popup.classList.add("hidden");
popup.onclick = (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
};
  
  // Initialize navigation
  fetchFolders();

  function refreshFolders() {
    nav.innerHTML = ""; // Clear current buttons
    fetchFolders();     // Fetch again with updated NSFW permission
  }
  


//-----------------handles the nsfw button------------------------ 
const nsfwToggle = document.getElementById("nsfwToggle");
const nsfwModal = document.getElementById("nsfw-confirm-modal");
const confirmYes = document.getElementById("confirm-nsfw-yes");
const confirmNo = document.getElementById("confirm-nsfw-no");
let userInteracted = false;
let nsfwAllowed = false;

nsfwToggle.addEventListener("click", (e) => {
  // Only trigger modal if user is enabling NSFW and hasn't confirmed yet
  if (nsfwToggle.checked && !nsfwAllowed) {
    e.preventDefault(); // Prevent the toggle from actually switching
    nsfwModal.classList.add("show");
  } else if (!nsfwToggle.checked && nsfwAllowed) {
    // User is unchecking it after previously allowing
    nsfwAllowed = false;
    refreshFolders();
  }
});

confirmYes.addEventListener("click", () => {
  nsfwAllowed = true;
  nsfwToggle.checked = true; // Set it manually since we prevented default toggle
  nsfwModal.classList.remove("show");
  refreshFolders(); // Reload buttons with NSFW
});

confirmNo.addEventListener("click", () => {
  nsfwToggle.checked = false;
  nsfwModal.classList.remove("show");
});

