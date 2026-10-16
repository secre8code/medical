const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
	menuToggle.addEventListener("click", () => {
		const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
		siteNav.classList.toggle("is-open", isOpen);
	});

	siteNav.addEventListener("click", (event) => {
		if (event.target.closest("a")) {
			siteNav.classList.remove("is-open");
			menuToggle.setAttribute("aria-expanded", "false");
			menuToggle.setAttribute("aria-label", "Open navigation");
		}
	});
}

const instituteForm = document.querySelector("#institute-form");

if (instituteForm) {
	const typeSelect = document.querySelector("#institute-type");
	const instituteSelect = document.querySelector("#institute-name");
	const programSelect = document.querySelector("#institute-program");
	const result = document.querySelector("#lookup-result");

	const setOptions = (select, placeholder, options) => {
		select.replaceChildren(new Option(placeholder, ""), ...options.map(([label, value]) => new Option(label, value)));
		select.disabled = options.length === 0;
	};

	typeSelect.addEventListener("change", () => {
		setOptions(instituteSelect, "Select an institute", typeSelect.value === "medical" ? [["Meraki School of Higher Education", "meraki"]] : []);
		setOptions(programSelect, "Select a program", []);
		result.hidden = true;
	});

	instituteSelect.addEventListener("change", () => {
		setOptions(programSelect, "Select a program", instituteSelect.value === "meraki" ? [["MBBS · Medical Science", "mbbs"]] : []);
		result.hidden = true;
	});

	programSelect.addEventListener("change", () => {
		result.hidden = true;
	});

	instituteForm.addEventListener("submit", (event) => {
		event.preventDefault();
		if (!typeSelect.value || !instituteSelect.value || !programSelect.value) return;
		result.hidden = false;
	});
}
