import "../styles/style.css";
import "../styles/reset.css";
import "../styles/fonts.css";
import "../styles/leftbar.css";
import "../styles/header.css";
import "../styles/content.css";
import checked from "../images/checked.svg";
import { Projects, Todo } from "./model.js";
import { renderInbox, renderListItem } from "./inbox.js";
("./inbox.js");

const inbox = document.querySelector(".inbox");
const leftBar = document.querySelector(".left-bar");
const menuButtons = document.querySelectorAll(".menu-button");
inbox.dataset.id = Projects.projectList[0].id;
document.addEventListener("click", domControl);

function domControl(event) {
	console.log(event.target);
	if (event.target.matches(".hide-left-button")) {
		leftBar.dataset.state == "open"
			? (leftBar.dataset.state = "close")
			: (leftBar.dataset.state = "open");
	} else if (event.target.matches(".menu-button")) {
		if (event.target.dataset.id == Projects.projectList[0].id) {
			renderInbox(event.target.dataset.id);
			console.log(event.target.dataset.id);
		}

		if (!event.target.classList.contains("selected")) {
			menuButtons.forEach(function (item, index) {
				item.classList.remove("selected");
			});
			event.target.classList.add("selected");
		}
	} else if (event.target.matches(".add-a-task-button")) {
		const inputText = document.querySelector(".add-a-task-input");
		const projectIndex = Projects.projectList.findIndex(function (item) {
			if (item.id == event.target.closest("[data-id]").dataset.id) {
				console.log(item);
				return item;
			}
		});

		console.log(projectIndex);
		new Todo(inputText.value, null, null, true, [], Projects.projectList[projectIndex]);
		renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
		inputText.value = "";
	} else if (event.target.matches(".checkbox")) {
		const projectIndex = Projects.projectList.findIndex(function (item) {
			if (item.id == event.target.closest("[data-id]").dataset.id) {
				// console.log(item);
				return item;
			}
		});
		const taskIndex = Projects.projectList[projectIndex].tasks.findIndex(function (item) {
			if (item.id == event.target.closest("[data-list-id]").dataset.listId) {
				// console.log(item);
				return item;
			}
		});
		console.log(event.target.checked);
		if (event.target.checked) {
			Projects.projectList[projectIndex].tasks[taskIndex].completed = true;
			console.log(Projects.projectList);
		} else {
			Projects.projectList[projectIndex].tasks[taskIndex].completed = false;
			console.log(Projects.projectList);
		}
	}
}

console.log(Projects.projectList);
