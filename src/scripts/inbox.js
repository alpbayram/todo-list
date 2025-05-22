import inboxIcon from "../images/header-inbox.svg";
import projectIcon from "../images/list-ul-alt-svgrepo-com.svg";
import importantIcon from "../images/header-important.svg";
import upcomingIcon from "../images/header-calendar.svg";
import completedIcon from "../images/header-completed.svg";
import groupIcon from "../images/chevron-right.svg";
import headerGroupIcon from "../images/header-list.svg";
import { Projects, Todo } from "./model.js";
import { formatISO } from "date-fns";
import { isToday } from "date-fns";
import { parseISO } from "date-fns";
import { isTomorrow } from "date-fns";
import { addMonths } from "date-fns";
import { isWithinInterval } from "date-fns";
export function renderProjectTasks(projectId) {
	const projectIndex = Projects.projectList.findIndex(function (item) {
		if (item.id == projectId) {
			return item;
		}
	});
	const mainContent = document.querySelector(".main-content");
	mainContent.dataset.id = projectId;
	delete mainContent.dataset.view;
	const contentHeader = document.querySelector(".content-header");
	const content = document.querySelector(".content");
	const headerIconImg = contentHeader.querySelector("img");
	const headerText = contentHeader.querySelector("p");
	const icon = projectIndex == 0 ? inboxIcon : headerGroupIcon;
	headerIconImg.setAttribute("src", icon);
	headerText.textContent = Projects.projectList[projectIndex].title;

	const today = formatISO(new Date(), { representation: "date" });
	const dateInput = document.querySelector(".date-input");
	dateInput.setAttribute("min", today);
	dateInput.removeAttribute("max");
	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}

	Projects.projectList[projectIndex].tasks.forEach((item) => {
		renderListItem(item);
	});
}
export function renderSortedProjects(projectId, state) {
	const mainContent = document.querySelector(".main-content");
	mainContent.dataset.id = projectId;
	mainContent.dataset.view = state;
	const contentHeader = document.querySelector(".content-header");
	const content = document.querySelector(".content");
	const headerIconImg = contentHeader.querySelector("img");
	const headerText = contentHeader.querySelector("p");
	const dateInput = document.querySelector(".date-input");
	if (state == "important") {
		headerIconImg.setAttribute("src", importantIcon);
		headerText.textContent = "Important";
		dateInput.removeAttribute("max");
	} else if (state == "upcoming") {
		headerIconImg.setAttribute("src", upcomingIcon);
		headerText.textContent = "Upcoming";
		const addOneMonths = formatISO(addMonths(new Date(), 1), { representation: "date" });
		dateInput.setAttribute("max", addOneMonths);
	} else if (state == "completed") {
		headerIconImg.setAttribute("src", completedIcon);
		headerText.textContent = "Completed";
		dateInput.removeAttribute("max");
	}

	const today = formatISO(new Date(), { representation: "date" });

	dateInput.setAttribute("min", today);

	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}

	Projects.projectList.forEach(function (itemProject) {
		const isAvailable = itemProject.tasks.find(function (itemTask) {
			if (state == "important") {
				if (itemTask.important == true) {
					return true;
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
						return true;
					}
				}
			} else if (state == "completed") {
				if (itemTask.completed == true) {
					return true;
				}
			}
		});
		if (isAvailable) {
			renderListGroup(itemProject, state);
		}
	});
}
export function renderGroupProjectTasks(projectId, state, collapsed, loaded) {
	Projects.projectList.forEach((itemProject) => {
		itemProject.tasks.forEach((itemTask) => {
			if (state == "important") {
				if (
					itemTask.important == true &&
					projectId == itemProject.id &&
					collapsed == false &&
					loaded == false
				) {
					renderListItem(itemTask);
				} else if (
					itemTask.important == true &&
					projectId == itemProject.id &&
					loaded == true &&
					collapsed == true
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					console.log(element);
					element.style.display = "none";
				} else if (
					itemTask.important == true &&
					projectId == itemProject.id &&
					loaded == true &&
					collapsed == false
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					element.style.display = "flex";
				}
			} else if (state == "upcoming") {
				const addOneMonths = addMonths(new Date(), 1);
				const dueDate = itemTask.dueDate != null ? parseISO(itemTask.dueDate) : null;
				if (
					itemTask.dueDate != null &&
					projectId == itemProject.id &&
					isWithinInterval(dueDate, {
						start: new Date(),
						end: addOneMonths,
					}) &&
					loaded == false &&
					collapsed == false
				) {
					renderListItem(itemTask);
				} else if (
					itemTask.dueDate != null &&
					projectId == itemProject.id &&
					isWithinInterval(dueDate, {
						start: new Date(),
						end: addOneMonths,
					}) &&
					loaded == true &&
					collapsed == true
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					console.log(element);
					element.style.display = "none";
				} else if (
					itemTask.dueDate != null &&
					projectId == itemProject.id &&
					isWithinInterval(dueDate, {
						start: new Date(),
						end: addOneMonths,
					}) &&
					loaded == true &&
					collapsed == false
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					element.style.display = "flex";
				}
			} else if (state == "completed") {
				if (
					itemTask.completed == true &&
					projectId == itemProject.id &&
					loaded == false &&
					collapsed == false
				) {
					renderListItem(itemTask);
				} else if (
					itemTask.completed == true &&
					projectId == itemProject.id &&
					loaded == true &&
					collapsed == true
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					console.log(element);
					element.style.display = "none";
				} else if (
					itemTask.completed == true &&
					projectId == itemProject.id &&
					loaded == true &&
					collapsed == false
				) {
					const element = document.querySelector(`[data-list-id="${itemTask.id}"]`);
					element.style.display = "flex";
				}
			}
		});
	});
}

export function renderListGroup(groupItem, state) {
	const content = document.querySelector(".content");
	const taskListGroup = document.createElement("div");
	taskListGroup.classList.add("task-list-group", "collapsed");
	taskListGroup.dataset.loaded = false;
	taskListGroup.dataset.id = groupItem.id;
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

	taskListGroupTextContainerP1.textContent = groupItem.title;

	const availableTaskCount = Projects.projectList.reduce(function (acc, projectItem) {
		const count = projectItem.tasks.filter(function (itemTask) {
			if (groupItem.id == projectItem.id) {
				if (state == "important") {
					if (itemTask.important == true) {						
						return itemTask;
					}
				} else if (state == "upcoming") {
					const addOneMonths = addMonths(new Date(), 1);
					const dueDate = itemTask.dueDate != null ? parseISO(itemTask.dueDate) : null;
					if (
						itemTask.dueDate != null &&
						isWithinInterval(dueDate, {
							start: new Date(),
							end: addOneMonths,
						})
					) {
						return itemTask;
					}
				} else if (state == "completed") {
					if (itemTask.completed == true) {
						return itemTask;
					}
				}
			}
		}).length;
		return count + acc;
	}, 0);

	taskListGroupTextContainerP2.textContent = availableTaskCount;
	taskListGroupTextContainer.appendChild(taskListGroupTextContainerP1);
	taskListGroupTextContainer.appendChild(taskListGroupTextContainerP2);
	taskListGroup.appendChild(taskListGroupTextContainer);
	content.appendChild(taskListGroup);
}

export function renderListItem(listItem) {
	console.log("buraya giriyor mu");
	const projectIndex = Projects.projectList.findIndex(function (item) {
		if (item.id == listItem.projectId) {
			return item;
		}
	});
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
	projectDetailArray.push(Projects.projectList[projectIndex].title);
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

	const pushToDom = content.querySelector(`[data-id="${Projects.projectList[projectIndex].id}"]`);
	if (pushToDom != null) {
		pushToDom.insertAdjacentElement("afterend", taskListItem);
	} else {
		content.appendChild(taskListItem);
	}
}
