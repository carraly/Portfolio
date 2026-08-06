document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("btnInterativo");
    const textElement = document.getElementById("textoCuriosidade");

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
            textElement.classList.add("hidden");
            setTimeout(() => {
                textElement.textContent = funFacts[randomIndex];
                textElement.classList.remove("hidden");
            }, 400);
        });
    }
});

// --- PROJECT MODAL LOGIC ---

// Select the modal and its close button
const modal = document.getElementById("project-modal");
const closeBtn = document.querySelector(".close-btn");
const modalContent = document.querySelector(".modal-content");

// Select all the empty text spots inside the modal
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTech = document.getElementById("modal-tech");
const modalKey = document.getElementById("modal-key");
const modalLink = document.getElementById("modal-link");

// Select every project card on the page
const projectCards = document.querySelectorAll(".project-card");

// Add a click event to each card
projectCards.forEach((card) => {
    card.addEventListener("click", () => {
        // Grab the hidden data from the specific card that was clicked
        const title = card.getAttribute("data-title");
        const desc = card.getAttribute("data-description");
        const tech = card.getAttribute("data-tech");
        const key = card.getAttribute("data-key");
        const link = card.getAttribute("data-link");

        modalTitle.textContent = title;
        modalDesc.innerHTML = desc;
        if (tech) {
            const techArray = tech.split(",");
            let techHTML = '<ul class="styled-list">';

            techArray.forEach((item) => {
                techHTML += `<li>${item.trim()}</li>`;
            });

            techHTML += "</ul>";
            modalTech.innerHTML = techHTML;
        }
        modalKey.textContent = key;
        modalLink.href = link;

        setTimeout(() => {
            modal.classList.add("show");
            scrollWrapper.scrollTop = 0;
            updateScrollbar();
        }, 10);
    });
});

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });
}

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

// --- CUSTOM SCROLLBAR LOGIC ---
const customThumb = document.querySelector(".custom-thumb");
const customTrack = document.querySelector(".custom-scrollbar");
const scrollWrapper = document.querySelector(".modal-scroll-wrapper");

function updateScrollbar() {
    // 1. Calculate the percentage the user has scrolled in the wrapper
    const scrollPercentage =
        scrollWrapper.scrollTop /
        (scrollWrapper.scrollHeight - scrollWrapper.clientHeight);

    // 2. Calculate dynamic thumb height
    const thumbHeight = Math.max(
        (scrollWrapper.clientHeight / scrollWrapper.scrollHeight) *
            customTrack.clientHeight,
        30,
    );
    customThumb.style.height = `${thumbHeight}px`;

    // 3. Move the thumb down the track
    const maxThumbTop = customTrack.clientHeight - thumbHeight;
    customThumb.style.transform = `translateY(${scrollPercentage * maxThumbTop}px)`;

    // 4. Hide the scrollbar entirely if the text is too short to require scrolling
    customTrack.style.display =
        scrollWrapper.scrollHeight > scrollWrapper.clientHeight
            ? "block"
            : "none";
}

// Listen to the new wrapper instead of the main content box
scrollWrapper.addEventListener("scroll", updateScrollbar);

// --- MAKE THE THUMB DRAGGABLE ---
let isDragging = false;
let startY;
let startScrollTop;

customThumb.addEventListener("mousedown", (e) => {
    isDragging = true;
    startY = e.clientY;
    startScrollTop = scrollWrapper.scrollTop;
    document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const deltaY = e.clientY - startY;
    const maxScroll = scrollWrapper.scrollHeight - scrollWrapper.clientHeight;
    const maxThumb =
        customTrack.clientHeight - parseFloat(customThumb.style.height);
    const scrollRatio = maxScroll / maxThumb;

    scrollWrapper.scrollTop = startScrollTop + deltaY * scrollRatio;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "";
});
