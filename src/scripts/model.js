export class Projects {
	static projectList = [];
	constructor(title, system, tasks) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.system = system;
		this.tasks = tasks;
		Projects.projectList.push(this);
	}
}
const Inbox = new Projects("Inbox", true, []);
const Inbox2 = new Projects("123Inbox", true, []);

export class Todo {
	constructor(title, note, dueDate, important, stepArray, project) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.note = note;
		this.dueDate = dueDate;
		this.important = important;
		this.stepArray = stepArray;
		this.completed = false;

		const projectIndex = Projects.projectList.findIndex(function (item) {
			if (item.id == project.id) {
				return item;
			}
		});
		this.projectIndex = projectIndex;
		Projects.projectList[projectIndex].tasks.push(this);
	}
}
export const task2 = new Todo("DenemeTask123", "Not: Acilen yapılmalı.", null, true, [], Inbox);
