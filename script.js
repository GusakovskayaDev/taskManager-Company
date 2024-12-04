
const tasks = new Map();

const placeForEmployees = document.getElementById('placeForEmployees');
const choose_employee = document.getElementById('choose_employee');
const add_task = document.getElementById('add_task');
const placeForTasks = document.getElementById('placeForTasks');

const methods = {

	setOptions(place){
		this.placeClear(place);

		for(let [key, value] of tasks){
			const option = document.createElement('option');
			option.innerHTML = key;
			place.appendChild(option);
		}
	},

	employeeDisplay(place){
		for(let [key, value] of tasks){
			const pargh = document.createElement('p');
			pargh.innerText = key;
			place.appendChild(pargh);
		}
	},

	tasksDisplay(place){
		for(let [key, value] of tasks){
			const pargh = document.createElement('p');
			pargh.innerText = key;
			place.appendChild(pargh);
			value.forEach(element => {
					const task = document.createElement('p');
					task.innerText = element;
					place.appendChild(task);
					console.log(element);
			});
		}
	},

	placeClear(place){
			place.innerText = '';
			place.innerHTML= '';
	},

	inputCleare(input){
		input.value = '';
	},

	addEmployee(){
		const nameEmployee_element = document.getElementById('add_employee');
		const nameEmployee = nameEmployee_element.value;

		if(!nameEmployee){
			return alert('Заполните поле!');
		}

		if(!tasks.has(nameEmployee)){
			tasks.set(nameEmployee, []);
		}else{
			console.log('Такой сотрудник уже есть!');
		}
		
		methods.placeClear(placeForEmployees);
		methods.setOptions(choose_employee);
		methods.employeeDisplay(placeForEmployees);
		this.inputCleare(nameEmployee_element);
	},

	addTask(name, task){
		if(!name || !task){
			alert('Заполните поля!');
			return;
		}
		if(tasks.has(name)){
			const employeeTask = tasks.get(name);
			employeeTask.push(task);
			tasks.set(name, employeeTask);
			this.placeClear(placeForTasks);
			this.tasksDisplay(placeForTasks);
		}else{
			console.log("Employee not found!");
		}
	},
}

document.getElementById('add_employee-btn')
	.addEventListener('click', (e) => {
		e.preventDefault();
		methods.addEmployee();
	});
	
	
document.getElementById('add_task-btn')
	.addEventListener('click', (e) => {
		e.preventDefault();
		methods.addTask(choose_employee.value, add_task.value);
	});

	methods.setOptions(choose_employee);
console.log(tasks);
	
