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
const Inbox2 = new Projects("Example Folder", true, []);

export class Todo {
	constructor(title, note, dueDate, important, stepArray, projectIndex, completed) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.note = note;
		this.dueDate = dueDate;
		this.important = important;
		this.stepArray = stepArray;
		this.completed = completed;
		this.projectId = Projects.projectList[projectIndex].id;
		Projects.projectList[projectIndex].tasks.push(this);
	}
}
