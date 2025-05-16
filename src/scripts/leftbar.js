import { Projects, Todo } from "./model.js";
import listIcon from "../images/list-ul-alt-svgrepo-com.svg";
export function renderProjectList() {
	Projects.projectList.forEach((item, index) => {
		if (index > 0) {
			renderProjectListItem(item);
		}
	});
}

export function renderProjectListItem(listItem) {
	const projectList = document.querySelector(".project-list");
	const projectListItem = document.createElement("div");
	projectListItem.classList.add("list-item", "menu-button");
	projectListItem.dataset.id = listItem.id;

	const projectListItemIcon = document.createElement("div");
	projectListItemIcon.classList.add("icon");
	const projectListItemIconImg = document.createElement("img");
	projectListItemIconImg.setAttribute("src", listIcon);
	const projectListItemP = document.createElement("p");
	projectListItemP.textContent = listItem.title;
	projectListItem.appendChild(projectListItemIcon);
	projectListItem.appendChild(projectListItemP);
	projectListItemIcon.appendChild(projectListItemIconImg);
	projectList.appendChild(projectListItem);
}
