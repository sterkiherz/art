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
      const button = document.createElement("button");
      button.textContent = folder.name;
      button.onclick = () => fetchImages(folder.name);
      nav.appendChild(button);
  
      // Load the first folder by default
      if (index === 0) fetchImages(folder.name);
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