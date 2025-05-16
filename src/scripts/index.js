import "../styles/style.css";
import "../styles/reset.css";
import "../styles/fonts.css";
import "../styles/leftbar.css";
import "../styles/header.css";
import "../styles/content.css";
import checked from "../images/checked.svg";
import { Projects, Todo } from "./model.js";
import { renderInbox, renderListItem } from "./inbox.js";
import { renderProjectList, renderProjectListItem } from "./leftbar.js";
import { formatISO } from "date-fns";
import { parseISO } from "date-fns";
("./inbox.js");
renderInbox(Projects.projectList[0].id);
renderProjectList();
const inbox = document.querySelector(".inbox");
const leftBar = document.querySelector(".left-bar");

inbox.dataset.id = Projects.projectList[0].id;
document.addEventListener("click", domControl);
document.addEventListener("keyup", inputControl);

function domControl(event) {
	console.log(event.target);
	if (event.target.matches(".hide-left-button")) {
		leftBar.dataset.state == "open"
			? (leftBar.dataset.state = "close")
			: (leftBar.dataset.state = "open");
	} else if (event.target.matches(".menu-button")) {
		const projectIndex = Projects.projectList.findIndex(function (item) {
			if (item.id == event.target.closest("[data-id]").dataset.id) {
				console.log(item);
				return item;
			}
		});
		if (event.target.dataset.id == Projects.projectList[projectIndex].id) {
			renderInbox(event.target.dataset.id);
			console.log(event.target.dataset.id);
		}

		if (!event.target.classList.contains("selected")) {
			const menuButtons = document.querySelectorAll(".menu-button");
			menuButtons.forEach(function (item, index) {
				item.classList.remove("selected");
			});
			event.target.classList.add("selected");
		}
		console.log(Projects.projectList);
	} else if (event.target.matches(".add-a-task-button")) {
		const inputText = document.querySelector(".add-a-task-input");
		const projectIndex = Projects.projectList.findIndex(function (item) {
			if (item.id == event.target.closest("[data-id]").dataset.id) {
				console.log(item);
				return item;
			}
		});

		const dateInput = document.querySelector(".date-input");
		const dateInputValue = dateInput.value == "" ? null : dateInput.value;

		console.log(Projects.projectList);
		new Todo(inputText.value, null, dateInputValue, false, [], Projects.projectList[projectIndex]);
		renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
		inputText.value = "";
		dateInput.value=""
	} else if (event.target.matches(".checkbox") || event.target.matches(".important-checkbox")) {
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
		if (event.target.checked && event.target.matches(".checkbox")) {
			Projects.projectList[projectIndex].tasks[taskIndex].completed = true;
			console.log(Projects.projectList);
		} else if (!event.target.checked && event.target.matches(".checkbox")) {
			Projects.projectList[projectIndex].tasks[taskIndex].completed = false;
			console.log(Projects.projectList);
		} else if (event.target.checked && event.target.matches(".important-checkbox")) {
			Projects.projectList[projectIndex].tasks[taskIndex].important = true;
		} else {
			Projects.projectList[projectIndex].tasks[taskIndex].important = false;
		}
	} else if (event.target.matches(".new-list")) {
		console.log("girdi");
	} else if (event.target.matches(".date-input")) {
		
		// const result = parseISO(dateInputValue);
		// const result2= formatISO(result, { representation: 'date' })
		// console.log(result)
		// console.log(result2)
	}
}

function inputControl(event) {
	console.log(event.target + "budur");
	if (event.key === "Enter" && event.target.matches(".new-project-input")) {
		const title = event.target.value;
		new Projects(title, false, []);
		event.target.value = "";
		renderProjectListItem(Projects.projectList.at(-1));
		console.log(Projects.projectList);
	}
}
console.log(Projects.projectList);
