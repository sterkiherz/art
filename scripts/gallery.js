let nsfwVisible = true; // Flag to track whether NSFW button should be visible
const owner = "sterkiherz"; // Replace with your GitHub username
const repo = "art"; // Replace with your repo name
const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/gallery`; // Specific to 'gallery' folder
const nav = document.getElementById("nav");
const gallery = document.getElementById("gallery");
const nsfwToggle = document.getElementById("nsfwToggle");
const loader = document.getElementById("gallery-loader");

loader.style.display = "block"; // Show loader
gallery.style.display = "none"; // Hide gallery while loading

// Fetch folders inside the 'gallery' folder for navigation
async function fetchFolders() {
  const response = await fetch(baseUrl);
  const data = await response.json();
  const folders = data.filter(item => item.type === "dir");

  // Create navigation buttons for each folder (category)
  folders.forEach((folder, index) => {
    const button = document.createElement("button");
    button.textContent = folder.name;
    button.onclick = () => fetchImages(folder.name);
    nav.appendChild(button);

    // Optionally, load the first folder (category) by default
    if (index === 0) fetchImages(folder.name);
  });
}

// Select popup elements
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const closeBtn = document.getElementById("close");

// Fetch and display images from a specific category folder
async function fetchImages(folder) {
  const response = await fetch(`${baseUrl}/${folder}`);
  const data = await response.json();
  gallery.innerHTML = ""; // Clear existing images

  // Display images in the gallery for the selected category
  data.forEach(file => {
    if (file.type === "file" && /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file.name)) { // Include common image formats
      const img = document.createElement("img");
      img.src = file.download_url;
      img.alt = file.name;

      // Add click event for opening image in popup
      img.onclick = () => {
        popup.classList.remove("hidden");
        popupImg.src = img.src; // Set popup image source
      };

      gallery.appendChild(img);
    }
  });

  loader.style.display = "none"; // Hide loader after images are fetched
  gallery.style.display = "block"; // Show gallery after images are loaded
}

// Close popup when clicking the close button or outside the image
closeBtn.onclick = () => popup.classList.add("hidden");
popup.onclick = (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
};

// NSFW Toggle functionality
nsfwToggle.addEventListener("change", () => {
  const wantsNSFW = nsfwToggle.checked;
  const categoryButtons = nav.querySelectorAll("button");

  categoryButtons.forEach(button => {
    if (wantsNSFW) {
      button.style.display = "block"; // Show all categories when NSFW is enabled
    } else {
      // Hide NSFW categories unless toggled on
      if (button.textContent.toLowerCase() === "nsfw") {
        button.style.display = "none";
      } else {
        button.style.display = "block";
      }
    }
  });
});

// Initialize navigation by fetching folders
fetchFolders();
