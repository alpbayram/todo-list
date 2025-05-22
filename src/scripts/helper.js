export function toggleRightBar() {
	const rightBar = document.querySelector(".right-bar");
	rightBar.dataset.state == "open"
		? (rightBar.dataset.state = "close")
		: (rightBar.dataset.state = "open");
}
