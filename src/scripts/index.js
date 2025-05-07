import "../styles/style.css";
import "../styles/reset.css";
import "../styles/fonts.css";
import "../styles/leftbar.css";
import "../styles/header.css";
import "../styles/content.css";

document.addEventListener("click", domControl);
const hideLeftButton = document.querySelector(".hide-left-button");
const leftBar = document.querySelector(".left-bar");
function domControl(event) {
	console.log(event.target);
	if (event.target.matches(".hide-left-button")) {
		leftBar.dataset.state == "open"
			? (leftBar.dataset.state = "close")
			: (leftBar.dataset.state = "open");
	}
}

// const mq = window.matchMedia("(max-width: 55rem)");
// function barState(event) {
// 	if (event.matches) {
// 		leftBar.dataset.state = "close";
// 	}
// }
// mq.addEventListener("change", barState);