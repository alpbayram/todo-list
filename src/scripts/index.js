import "../styles/style.css";
import "../styles/reset.css";
import "../styles/fonts.css";
import "../styles/leftbar.css";
import "../styles/header.css";
import "../styles/content.css";
import { deneme } from "./model.js";

console.log(deneme);
document.addEventListener("click", domControl);

const leftBar = document.querySelector(".left-bar");
function domControl(event) {
	console.log(event.target);
	if (event.target.matches(".hide-left-button")) {
		leftBar.dataset.state == "open"
			? (leftBar.dataset.state = "close")
			: (leftBar.dataset.state = "open");
	}
}
