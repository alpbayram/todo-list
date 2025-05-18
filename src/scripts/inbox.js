import inboxIcon from "../images/inbox-svgrepo-com.svg";
import projectIcon from "../images/list-ul-alt-svgrepo-com.svg";
import importantIcon from "../images/header-important.svg";
import upcomingIcon from "../images/calendar-1-svgrepo-com.svg";
import completedIcon from "../images/order-completed-svgrepo-com.svg";
import groupIcon from "../images/chevron-right.svg";
import { Projects, Todo } from "./model.js";
import { formatISO } from "date-fns";
import { isToday } from "date-fns";
import { parseISO } from "date-fns";
import { isTomorrow } from "date-fns";
import { addMonths } from "date-fns";
import { isWithinInterval } from "date-fns";
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
export function renderImportant(projectId, state) {
	const mainContent = document.querySelector(".main-content");
	mainContent.dataset.id = projectId;
	const contentHeader = document.querySelector(".content-header");
	const content = document.querySelector(".content");
	const headerIconImg = contentHeader.querySelector("img");
	const headerText = contentHeader.querySelector("p");

	headerIconImg.setAttribute("src", importantIcon);
	headerText.textContent = "Important";

	const today = formatISO(new Date(), { representation: "date" });
	const dateInput = document.querySelector(".date-input");
	dateInput.setAttribute("min", today);

	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}

	Projects.projectList.forEach((itemProject) => {
		itemProject.tasks.forEach((itemTask) => {
			if (state == "important") {
				if (itemTask.important == true) {
					renderListItem(itemTask);
				}
			} else if (state == "upcoming") {
				const addOneMonths = addMonths(new Date(), 1);

				if (itemTask.dueDate != null) {
					const dueDate = parseISO(itemTask.dueDate);
					if (
						isWithinInterval(dueDate, {
							start: new Date(),
							end: addOneMonths,
						})
					) {
						renderListItem(itemTask);
					}
				}
			} else if (state == "completed") {
				if (itemTask.completed == true) {
					renderListItem(itemTask);
				}
			}
		});
	});
}

export function renderListGroup() {
	const isProjectHasTask = Projects.projectList.forEach(function (item) {
		if (item.tasks != null) {
			return item;
		}
	});
	const content = document.querySelector(".content");
	const taskListGroup = document.createElement("div");
	taskListGroup.classList.add("task-list-group", "collapsed");
	taskListGroup.dataset.loaded = false;
	const taskListGroupIcon = document.createElement("div");
	taskListGroupIcon.classList.add("icon");
	taskListGroup.appendChild(taskListGroupIcon);
	const taskListGroupIconImg = document.createElement("img");
	taskListGroupIconImg.setAttribute("src", groupIcon);
	taskListGroupIcon.appendChild(taskListGroupIconImg);
	const taskListGroupTextContainer = document.createElement("div");
	taskListGroupTextContainer.classList.add("group-text-container");
	const taskListGroupTextContainerP1 = document.createElement("p");
	const taskListGroupTextContainerP2 = document.createElement("p");

	taskListGroupTextContainerP1.textContent = null;
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
		} else if (isTomorrow(result)) {
			projectDetailArray.push("Yarın");
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
