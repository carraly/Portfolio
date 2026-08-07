document.addEventListener("DOMContentLoaded", () => {
    // --- FUN FACT LOGIC ---
    const button = document.getElementById("interactive-btn");
    const textElement = document.getElementById("fun-fact-text");

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

        button.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                button.classList.add("pressed");
            }
        });

        button.addEventListener("keyup", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                button.classList.remove("pressed");
            }
        });
    }

    // --- PROJECT MODAL LOGIC ---
    const modal = document.getElementById("project-modal");
    const closeBtn = document.querySelector(".close-btn");
    const modalContent = document.querySelector(".modal-content");

    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalTech = document.getElementById("modal-tech");
    const modalKey = document.getElementById("modal-key");
    const modalLink = document.getElementById("modal-link");

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            const title = card.getAttribute("data-title");
            const desc = card.getAttribute("data-description");
            const tech = card.getAttribute("data-tech");
            const key = card.getAttribute("data-key");
            const link = card.getAttribute("data-link");

            modalTitle.textContent = title;
            modalKey.textContent = key;
            modalLink.href = link;

            modalDesc.textContent = "";
            if (desc) {
                const descParts = desc.split(/<br\s*\/?>/i);
                descParts.forEach((part, index) => {
                    modalDesc.appendChild(document.createTextNode(part));
                    if (index < descParts.length - 1) {
                        modalDesc.appendChild(document.createElement("br"));
                    }
                });
            }

            modalTech.textContent = "";
            if (tech) {
                const techArray = tech.split(",");
                const ul = document.createElement("ul");
                ul.classList.add("styled-list");

                techArray.forEach((item) => {
                    const li = document.createElement("li");
                    li.textContent = item.trim();
                    ul.appendChild(li);
                });

                modalTech.appendChild(ul);
            }

            setTimeout(() => {
                modal.classList.add("show");
                scrollWrapper.scrollTop = 0;
                updateScrollbar();

                setTimeout(() => {
                    if (closeBtn) closeBtn.focus();
                }, 50);
            }, 10);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                card.click();
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("show");
        });

        closeBtn.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                modal.classList.remove("show");
            }
        });
    }

    if (modal) {
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.remove("show");
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("show")
        ) {
            modal.classList.remove("show");
        }
    });

    if (modal) {
        modal.addEventListener("keydown", (event) => {
            if (event.key === "Tab") {
                const firstElement = closeBtn;
                const lastElement = modalLink;

                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    // --- CUSTOM SCROLLBAR LOGIC ---
    const customThumb = document.querySelector(".custom-thumb");
    const customTrack = document.querySelector(".custom-scrollbar");
    const scrollWrapper = document.querySelector(".modal-scroll-wrapper");

    function updateScrollbar() {
        if (scrollWrapper && customThumb && customTrack) {
            const scrollPercentage =
                scrollWrapper.scrollTop /
                (scrollWrapper.scrollHeight - scrollWrapper.clientHeight);

            const thumbHeight = Math.max(
                (scrollWrapper.clientHeight / scrollWrapper.scrollHeight) *
                    customTrack.clientHeight,
                30,
            );
            customThumb.style.height = `${thumbHeight}px`;

            const maxThumbTop = customTrack.clientHeight - thumbHeight;
            customThumb.style.transform = `translateY(${scrollPercentage * maxThumbTop}px)`;

            customTrack.style.display =
                scrollWrapper.scrollHeight > scrollWrapper.clientHeight
                    ? "block"
                    : "none";
        }
    }

    if (scrollWrapper) {
        scrollWrapper.addEventListener("scroll", updateScrollbar);
    }

    let isDragging = false;
    let startY;
    let startScrollTop;

    if (customThumb) {
        customThumb.addEventListener("mousedown", (e) => {
            isDragging = true;
            startY = e.clientY;
            if (scrollWrapper) startScrollTop = scrollWrapper.scrollTop;
            document.body.style.userSelect = "none";
        });
    }

    document.addEventListener("mousemove", (e) => {
        if (!isDragging || !scrollWrapper || !customTrack || !customThumb)
            return;

        const deltaY = e.clientY - startY;
        const maxScroll =
            scrollWrapper.scrollHeight - scrollWrapper.clientHeight;
        const maxThumb =
            customTrack.clientHeight - parseFloat(customThumb.style.height);

        if (maxThumb > 0) {
            const scrollRatio = maxScroll / maxThumb;
            scrollWrapper.scrollTop = startScrollTop + deltaY * scrollRatio;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.body.style.userSelect = "";
    });
});
