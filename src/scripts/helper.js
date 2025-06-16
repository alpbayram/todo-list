export function toggleRightBar(state) {
	const rightBar = document.querySelector(".right-bar");
	console.log(state)
	if (state) {
		rightBar.dataset.state = "open";
		console.log("open yapıldı")
	} else if (state) {
		rightBar.dataset.state = "close";
		console.log("close yapıldı")
	} else if (state === undefined) {
		rightBar.dataset.state == "open"
			? (rightBar.dataset.state = "close")
			: (rightBar.dataset.state = "open");
	}
}
