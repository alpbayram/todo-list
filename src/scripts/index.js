import "../styles/style.css";
import "../styles/reset.css";
import "../styles/fonts.css";
import "../styles/leftbar.css";
import "../styles/rightbar.css";
import "../styles/header.css";
import "../styles/content.css";
import checked from "../images/checked.svg";
import { Projects, Todo } from "./model.js";
import {
	renderSortedProjects,
	renderProjectTasks,
	renderListItem,
	renderGroupProjectTasks,
	renderListGroup,
	UpdateContent,
} from "./inbox.js";
import { renderProjectList, renderProjectListItem } from "./leftbar.js";
import { toggleRightBar } from "./helper.js";

("./inbox.js");
renderProjectTasks(Projects.projectList[0].id);
renderProjectList();
const inbox = document.querySelector(".inbox");
const important = document.querySelector(".important");
const upcoming = document.querySelector(".upcoming");
const completed = document.querySelector(".completed");
const leftBar = document.querySelector(".left-bar");
const newInputButton = document.querySelector(".new-list img");
const newInput = document.querySelector(".new-list input");
const addATaskInputWrapper = document.querySelector(".add-a-task-input-wrapper");
const addATaskInput = document.querySelector(".add-a-task-input");
const newProjectInput = document.querySelector(".new-project-input");
const dateInputP = document.querySelector(".add-a-task-submit-wrapper p");
inbox.dataset.id = Projects.projectList[0].id;
important.dataset.id = Projects.projectList[0].id;
upcoming.dataset.id = Projects.projectList[0].id;
completed.dataset.id = Projects.projectList[0].id;
document.addEventListener("click", domControl);
document.addEventListener("keyup", domControl);
const dateIcon = document.querySelector(".add-a-task-submit-wrapper img");
function domControl(event) {
	console.log(event.target);
	if (event.target.matches(".hide-left-button")) {
		leftBar.dataset.state == "open"
			? (leftBar.dataset.state = "close")
			: (leftBar.dataset.state = "open");
	} else if (event.target.matches(".menu-button")) {
		if (event.target.classList.contains("important")) {
			renderSortedProjects(event.target.closest("[data-id]").dataset.id, "important");
		} else if (event.target.classList.contains("upcoming")) {
			renderSortedProjects(event.target.closest("[data-id]").dataset.id, "upcoming");
		} else if (event.target.classList.contains("completed")) {
			renderSortedProjects(event.target.closest("[data-id]").dataset.id, "completed");
		} else {
			renderProjectTasks(event.target.dataset.id);
		}
		if (!event.target.classList.contains("selected")) {
			const menuButtons = document.querySelectorAll(".menu-button");
			menuButtons.forEach(function (item, index) {
				item.classList.remove("selected");
			});
			event.target.classList.add("selected");
		}
		console.log(Projects.projectList);
	} else if (
		event.target.matches(".add-a-task-button") ||
		(event.key === "Enter" && event.target.matches(".add-a-task-input"))
	) {
		const inputText = document.querySelector(".add-a-task-input");
		const projectIndex = Projects.projectList.findIndex(function (item) {
			if (item.id == event.target.closest("[data-id]").dataset.id) {
				console.log(item);
				return item;
			}
		});
		const dateInput = document.querySelector(".date-input");

		const dataView = event.target.closest("[data-view]");
		const dataViewState = dataView ? dataView.dataset.view : null;
		const dateInputValue = dateInput.value !== "" ? dateInput.value : null;

		if (dataViewState == "important") {
			if (!inputText.checkValidity()) {
				inputText.reportValidity();
			} else {
				new Todo(inputText.value, null, dateInputValue, true, [], projectIndex, false);
				// renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
				renderListGroup(Projects.projectList[projectIndex], dataViewState);
				inputText.value = "";
				dateInput.value = "";
				dateInputP.textContent = "";
			}
		} else if (dataViewState == "upcoming") {
			if (!inputText.checkValidity() || !dateInput.checkValidity()) {
				if (dateInput.validity.rangeOverflow) {
					dateInput.setCustomValidity("Bir ay içinde bir tarih seçmelisinz.");
				} else if (dateInput.validity.rangeUnderflow) {
					dateInput.setCustomValidity("Gelecek bir tarih seçmelisiniz.");
				} else if (dateInput.validity.valueMissing) {
					dateInput.setCustomValidity("Tarih seçmelisiniz.");
				} else {
					dateInput.setCustomValidity("");
				}
				dateInput.reportValidity();
				inputText.reportValidity();
			} else {
				new Todo(inputText.value, null, dateInputValue, false, [], projectIndex, false);
				// renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
				renderListGroup(Projects.projectList[projectIndex], dataViewState);
				inputText.value = "";
				dateInput.value = "";
				dateInputP.textContent = "";
			}
		} else if (dataViewState == "completed") {
			if (!inputText.checkValidity()) {
				inputText.reportValidity();
			} else {
				new Todo(inputText.value, null, dateInputValue, false, [], projectIndex, true);
				// renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
				renderListGroup(Projects.projectList[projectIndex], dataViewState);
				inputText.value = "";
				dateInput.value = "";
				dateInputP.textContent = "";
			}
		} else {
			if (!inputText.checkValidity()) {
				inputText.reportValidity();
			} else {
				new Todo(inputText.value, null, dateInputValue, false, [], projectIndex, false);
				renderListItem(Projects.projectList[projectIndex].tasks.at(-1));
				inputText.value = "";
				dateInput.value = "";
				dateInputP.textContent = "";
			}
		}
	} else if (event.target.matches(".checkbox") || event.target.matches(".important-checkbox")) {
		const dataView = event.target.closest("[data-view]");
		const dataViewState = dataView ? dataView.dataset.view : null;

		const indexes = (function index() {
			for (const project of Projects.projectList) {
				for (const task of project.tasks) {
					if (task.id == event.target.closest("[data-list-id]").dataset.listId) {
						return {
							taskIndex: project.tasks.indexOf(task),
							projectIndex: Projects.projectList.indexOf(project),
						};
					}
				}
			}
		})();

		console.log(indexes);

		console.log(event.target.checked);
		if (event.target.checked && event.target.matches(".checkbox")) {
			Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex].completed = true;
			UpdateContent(
				Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex],
				dataViewState
			);
			console.log(Projects.projectList);
		} else if (!event.target.checked && event.target.matches(".checkbox")) {
			Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex].completed = false;
			UpdateContent(
				Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex],
				dataViewState
			);
			console.log(Projects.projectList);
		} else if (event.target.checked && event.target.matches(".important-checkbox")) {
			Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex].important = true;
			UpdateContent(
				Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex],
				dataViewState
			);
		} else {
			Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex].important = false;
			UpdateContent(
				Projects.projectList[indexes.projectIndex].tasks[indexes.taskIndex],
				dataViewState
			);
		}
	} else if (event.target.matches(".new-list")) {
		console.log("girdi");
	} else if (event.target.matches(".date-input")) {
		// const result = parseISO(dateInputValue);
		// const result2= formatISO(result, { representation: 'date' })
		// console.log(result)
		// console.log(result2)
	} else if (event.target.matches(".task-list-group")) {
		event.target.classList.toggle("collapsed");
		if (
			!event.target.classList.contains("collapsed") &&
			event.target.dataset.loaded == "false"
		) {
			renderGroupProjectTasks(
				event.target.closest("[data-id]").dataset.id,
				event.target.closest("[data-view]").dataset.view,
				false,
				false
			);

			event.target.dataset.loaded = "true";
		} else if (event.target.classList.contains("collapsed")) {
			renderGroupProjectTasks(
				event.target.closest("[data-id]").dataset.id,
				event.target.closest("[data-view]").dataset.view,
				true,
				true
			);
		} else {
			renderGroupProjectTasks(
				event.target.closest("[data-id]").dataset.id,
				event.target.closest("[data-view]").dataset.view,
				false,
				true
			);
		}
	} else if (event.target == newInputButton) {
		newInput.focus();
	} else if (event.target == addATaskInputWrapper) {
		addATaskInput.focus();
	} else if (event.key === "Enter" && event.target.matches(".new-project-input")) {
		if (!newProjectInput.checkValidity()) {
			newProjectInput.reportValidity();
		} else {
			const title = event.target.value;
			new Projects(title, false, []);
			event.target.value = "";
			renderProjectListItem(Projects.projectList.at(-1));
			console.log(Projects.projectList);
		}
	} else if (event.target == dateIcon) {
		const dateInput = document.querySelector(".date-input");
		console.log(dateIcon);

		dateInput.showPicker();
	} else if (event.target.matches(".hide-right-button")) {
		toggleRightBar();
	}
}
const dateInput = document.querySelector(".date-input");
dateInput.addEventListener("change", function () {
	dateInputP.textContent = dateInput.value;
});
console.log(Projects.projectList);
