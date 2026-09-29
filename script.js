// Rotate through focus areas without requiring any external libraries.
const typedWord = document.querySelector(".typed-word");
const interests = ["AI Explorer 🤖", "Python Coder 🐍", "Data Enthusiast 📊", "IoT Builder ⚡", "Future AI Engineer 🚀"];
let interestIndex = 0;

function rotateInterest() {
	if (!typedWord) return;
	interestIndex = (interestIndex + 1) % interests.length;
	typedWord.textContent = interests[interestIndex];
}

if (typedWord) window.setInterval(rotateInterest, 2400);

// Reveal content as it enters the viewport; keep it visible for reduced-motion users.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Keep the active navigation item in step with the visible section.
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");
if ("IntersectionObserver" in window) {
	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			navigationLinks.forEach((link) => {
				const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
				link.classList.toggle("is-current", isCurrent);
			});
		});
	}, { rootMargin: "-35% 0px -55% 0px" });
	sections.forEach((section) => sectionObserver.observe(section));
}

// Mobile menu closes after navigation, Escape, or clicking outside the menu.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");

function closeMenu() {
	if (!menuToggle || !navigation) return;
	menuToggle.setAttribute("aria-expanded", "false");
	menuToggle.setAttribute("aria-label", "Open navigation");
	navigation.classList.remove("is-open");
	document.body.classList.remove("menu-open");
}

if (menuToggle && navigation) {
	menuToggle.addEventListener("click", () => {
		const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
		menuToggle.setAttribute("aria-expanded", String(!isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
		navigation.classList.toggle("is-open", !isOpen);
		document.body.classList.toggle("menu-open", !isOpen);
	});
	navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") closeMenu();
	});
	document.addEventListener("click", (event) => {
		if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
	});
}

// Give the small hero assistant a second friendly response when activated.
const assistantButton = document.querySelector(".assistant-note");
if (assistantButton) {
	const assistantMessage = assistantButton.querySelector(".assistant-message");
	assistantButton.addEventListener("click", () => {
		if (assistantMessage) assistantMessage.textContent = "Let's make something clever together!";
	});
}

const yearLabel = document.querySelector("#current-year");
if (yearLabel) yearLabel.textContent = new Date().getFullYear();
