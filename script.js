//............................................................... Script ...................................................................
// Data for the sections
let h1Texts = ["Jake", "Beemo", "Finn"]; // Add your h1 texts here
let logoColors = [
  "var(--Jake-logo)",
  "var(--Beemo-logo)",
  "var(--Finn-logo)"
]; // Add your logo colors here
let keyframes = ["wave-pear-effect", "wave-apple-effect", "wave-exotic-effect"]; // Add your keyframes here

// Normal GSAP animation
gsap.from(".fruit-image", { y: "-100vh", delay: 0.5 });
gsap.to(".fruit-image img", {
  x: "random(-20, 20)",
  y: "random(-20, 20)",
  zIndex: 22,
  duration: 2,
  ease: "none",
  yoyo: true,
  repeat: -1
});

// Get the elements
const waveEffect = document.querySelector(".wave");
const sections = document.querySelectorAll(".section");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const caneLabels = document.querySelector(".cane-labels");
const sectionContainer = document.querySelector(".section-container");
const h1Element = document.querySelector("h1"); // Assuming your h1 is just h1, not .h1
const logoElement = document.querySelector(".logo");

// Set index and current position
let index = 0;
let currentIndex = 0;
let currentPosition = 0;

// Add event listeners to the buttons
nextButton.addEventListener("click", () => {
  if (currentIndex < h1Texts.length - 1) {
    currentIndex++;
    if (currentPosition > -200) {
      currentPosition -= 100;
      caneLabels.style.left = `${currentPosition}%`;
      sectionContainer.style.left = `${currentPosition}%`;
    }

    // Update the h1 text
    if (currentIndex < h1Texts.length) {
      h1Element.innerHTML = h1Texts[currentIndex];
    }

    // GSAP animation for next section components
    gsap.to(logoElement, {
      opacity: 1,
      duration: 1,
      color: logoColors[currentIndex]
    });
    gsap.from(h1Element, { y: "20%", opacity: 0, duration: 0.5 });
    gsap.from(".fruit-image", { y: "-100vh", delay: 0.4, duration: 0.4 });

    // Disable the nextButton if the last section is active
    if (currentIndex === h1Texts.length - 1) {
      nextButton.style.display = "none";
    }
    // Enable the prevButton if it's not the first section
    if (currentIndex > 0) {
      prevButton.style.display = "block";
    }

    // Button colors and animations
    if (currentIndex < logoColors.length - 1) {
      nextButton.style.color = logoColors[currentIndex + 1];
      nextButton.style.animationName = keyframes[currentIndex + 1];
    }
    if (currentIndex > 0) {
      prevButton.style.color = logoColors[currentIndex - 1];
      prevButton.style.animationName = keyframes[currentIndex - 1];
    }
  }
});

// Add event listeners to the buttons
prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    if (currentPosition < 0) {
      currentPosition += 100;
      caneLabels.style.left = `${currentPosition}%`;
      sectionContainer.style.left = `${currentPosition}%`;
      sectionContainer.style.transition = `all 0.5s ease-in-out`;
    }

    if (currentIndex >= 0) {
      h1Element.innerHTML = h1Texts[currentIndex];
    }

    // GSAP animation for previous section components
    gsap.to(logoElement, { color: logoColors[currentIndex], duration: 1 });
    gsap.from(h1Element, { y: "20%", opacity: 0, duration: 0.5 });
    gsap.from(".fruit-image", { y: "100vh", delay: 0.5 });

    // Enable the nextButton if it was disabled
    nextButton.style.display = "block";
    // Disable the prevButton if it's the first section
    if (currentIndex === 0) {
      prevButton.style.display = "none";
    }

    // Button colors and animations
    if (currentIndex < logoColors.length - 1) {
      nextButton.style.color = logoColors[currentIndex + 1];
      nextButton.style.animationName = keyframes[currentIndex + 1];
    }
    if (currentIndex > 0) {
      prevButton.style.color = logoColors[currentIndex - 1];
      prevButton.style.animationName = keyframes[currentIndex - 1];
    }
  }
});
