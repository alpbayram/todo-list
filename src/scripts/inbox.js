import inboxIcon from "../images/inbox-svgrepo-com.svg";
import projectIcon from "../images/list-ul-alt-svgrepo-com.svg";
import unchecked from "../images/unchecked.svg";
import important from "../images/header-important.svg";
import { Projects, Todo } from "./model.js";
import { formatISO } from "date-fns";
import { isToday } from "date-fns";
import { parseISO } from "date-fns";
export function renderInbox(projectId) {
	const projectIndex = Projects.projectList.findIndex(function (item) {
		if (item.id == projectId) {
			return item;
		}
	});
	const mainContent = document.querySelector(".main-content");
	mainContent.dataset.id = projectId;
	const contentHeader = document.querySelector(".content-header");
	const content = document.querySelector(".content");
	const headerIconImg = contentHeader.querySelector("img");
	const headerText = contentHeader.querySelector("p");
	const icon = projectIndex == 0 ? inboxIcon : projectIcon;
	headerIconImg.setAttribute("src", icon);
	headerText.textContent = Projects.projectList[projectIndex].title;

	const today = formatISO(new Date(), { representation: "date" });
	const dateInput = document.querySelector(".date-input");
	dateInput.setAttribute("min", today);

	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}

	Projects.projectList[projectIndex].tasks.forEach((item) => {
		renderListItem(item);
	});
}

export function renderListItem(listItem) {
	const content = document.querySelector(".content");
	const taskListItem = document.createElement("div");
	taskListItem.classList.add("task-list-item");
	taskListItem.dataset.listId = listItem.id;
	const taskListItemIcon = document.createElement("div");
	const taskListItemTextContainer = document.createElement("div");
	const taskListItemImportant = document.createElement("div");

	taskListItemIcon.classList.add("icon");
	taskListItem.appendChild(taskListItemIcon);
	const taskListItemIconInput = document.createElement("input");

	taskListItemIconInput.setAttribute("type", "checkbox");
	listItem.completed == true
		? (taskListItemIconInput.checked = true)
		: (taskListItemIconInput.checked = false);
	taskListItemIconInput.classList.add("checkbox");
	taskListItemIconInput.id = "checkbox";

	const taskListItemIconLabel = document.createElement("label");
	taskListItemIconLabel.setAttribute("for", "checkbox");
	taskListItemIcon.appendChild(taskListItemIconInput);
	taskListItemIcon.appendChild(taskListItemIconLabel);

	taskListItemTextContainer.classList.add("item-text-container");
	taskListItem.appendChild(taskListItemTextContainer);
	const taskListItemTextContainerP = document.createElement("p");
	taskListItemTextContainerP.textContent = listItem.title;
	const taskListItemTextContainerProjectName = document.createElement("div");

	const projectDetailArray = [];
	projectDetailArray.push(Projects.projectList[listItem.projectIndex].title);
	if (listItem.dueDate != null) {
		const result = parseISO(listItem.dueDate);
		if (isToday(result)) {
			projectDetailArray.push("Bugün");
		} else {
			projectDetailArray.push(listItem.dueDate);
		}
	}

	const joinedProjectDetailArray =
		projectDetailArray.length != 1 ? projectDetailArray.join(" \u2022 ") : projectDetailArray;

	taskListItemTextContainerProjectName.textContent = joinedProjectDetailArray;
	taskListItemTextContainerProjectName.classList.add("project-name");
	taskListItemTextContainer.appendChild(taskListItemTextContainerP);
	taskListItemTextContainer.appendChild(taskListItemTextContainerProjectName);

	taskListItemImportant.classList.add("important");

	const taskListItemImportantInput = document.createElement("input");

	taskListItemImportantInput.setAttribute("type", "checkbox");
	listItem.important == true
		? (taskListItemImportantInput.checked = true)
		: (taskListItemImportantInput.checked = false);
	taskListItemImportantInput.classList.add("important-checkbox");
	taskListItemImportantInput.id = "important-checkbox";

	const taskListItemImportantLabel = document.createElement("label");
	taskListItemImportantLabel.setAttribute("for", "important-checkbox");
	taskListItemImportant.appendChild(taskListItemImportantInput);
	taskListItemImportant.appendChild(taskListItemImportantLabel);
	taskListItem.appendChild(taskListItemImportant);
	content.prepend(taskListItem);
}
