import inboxIcon from "../images/inbox-svgrepo-com.svg";
import unchecked from "../images/unchecked.svg";
import important from "../images/header-important.svg";
import { Projects, Todo } from "./model.js";

export function renderInbox(projectId) {
	const mainContent = document.querySelector(".main-content");
	mainContent.dataset.id = projectId;
	const contentHeader = document.querySelector(".content-header");
	const content = document.querySelector(".content");
	const headerIconImg = contentHeader.querySelector("img");
	const headerText = contentHeader.querySelector("p");
	headerIconImg.setAttribute("src", inboxIcon);
	headerText.textContent = "Inbox";
	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}
	const projectIndex = Projects.projectList.findIndex(function (item) {
		if (item.id == projectId) {
			return item;
		}
	});

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
	taskListItemIconInput.classList.add("checkbox");
	taskListItemIconInput.id = "checkbox";
	taskListItemIcon.appendChild(taskListItemIconInput);
	const taskListItemIconLabel = document.createElement("label");
	taskListItemIconLabel.setAttribute("for", "checkbox");
	taskListItemIcon.appendChild(taskListItemIconInput);
	taskListItemIcon.appendChild(taskListItemIconLabel);

	taskListItemTextContainer.classList.add("item-text-container");
	taskListItem.appendChild(taskListItemTextContainer);
	const taskListItemTextContainerP = document.createElement("p");
	taskListItemTextContainerP.textContent = listItem.title;
	const taskListItemTextContainerProjectName = document.createElement("div");
	taskListItemTextContainerProjectName.textContent =
		Projects.projectList[listItem.projectIndex].title;
	taskListItemTextContainerProjectName.classList.add("project-name");
	taskListItemTextContainer.appendChild(taskListItemTextContainerP);
	taskListItemTextContainer.appendChild(taskListItemTextContainerProjectName);

	taskListItemImportant.classList.add("important");
	const taskListItemImportantImg = document.createElement("img");
	taskListItemImportantImg.setAttribute("src", important);
	taskListItemImportant.appendChild(taskListItemImportantImg);
	taskListItem.appendChild(taskListItemImportant);
	content.prepend(taskListItem);
}
