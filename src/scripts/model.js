export class Projects {
	constructor(title, system) {
		this.title = title;
		this.system = system;
	}
}

export class Todo {
	constructor(title, note, dueDate, important, stepArray) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.note = note;
		this.dueDate = dueDate;
		this.important = important;
		this.stepArray = stepArray;
	}
}
export const deneme = new Todo("Deneme", null, null, true, []);

