const containerEl = document.querySelector(".container");
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("randomBtn");
btn.addEventListener("click", generateColors);

function generateColors() {
  // Remove any existing color containers
  const colorContainerEls = document.querySelectorAll(".color-container");
  colorContainerEls.forEach((container) => container.remove());

  // Generate new color containers
  for (let i = 0; i < 10; i++) {
    const colorContainerEl = document.createElement("div");
    colorContainerEl.classList.add("color-container");
    const hexColor = generateHexColor();
    colorContainerEl.style.backgroundColor = hexColor;
    colorContainerEl.innerHTML = hexColor;
    containerEl.appendChild(colorContainerEl);
  }

  function generateHexColor() {
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[getRandomNumber()];
    }
    return hexColor;
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
  }
}

generateColors();
