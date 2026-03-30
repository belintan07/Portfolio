// Typing Animation
const text = "Hi, I'm Belintan - Frontend Developer 🚀";

let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 80);
    }
}

// function setTheme(theme) {
//     const body = document.body;
//     if (theme === 'nebula') {
//         body.classList.add('nebula-theme');
//     } else {
//         body.classList.remove('nebula-theme');
//     }

//     // Optional: Add a "Warp Speed" animation effect during transition
//     body.style.filter = "brightness(1.5) blur(1px)";
//     setTimeout(() => {
//         body.style.filter = "none";
//     }, 300);
// }

// typeEffect();

// AOS Initialization
AOS.init({
    duration: 1200,
});