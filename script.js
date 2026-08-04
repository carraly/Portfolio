document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("btnInterativo");
    const textElement = document.getElementById("textoCuriosidade");

    // Translated fun facts
    const funFacts = [
        "Did you know I was coded with love?",
        "My favorite color is orange, just like my feet!",
        "I'm ready to code the next big game!",
        "HTML and CSS are like the skeleton and skin of the web.",
        "Don't forget to stay hydrated while coding!",
        "I recently started building games with Godot and Raylib!",
        "When I'm not coding, you can probably find me deep into a fantasy tabletop campaign.",
        "I love building interactive worlds, whether it's through code or game design.",
        "React and Django are my current go-to tools for full-stack web quests.",
    ];

    if (button) {
        button.addEventListener("click", () => {
            const randomIndex = Math.floor(Math.random() * funFacts.length);
            textElement.textContent = funFacts[randomIndex];
        });
    }
});
