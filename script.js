
const tasks = new Map();
// tasks.set('Polina', [{
// 	id: 1,
// 	title: 'Hello',
// 	status: 'completed'
// },
// {
// 	id: 2,
// 	title: 'Goodbuy',
// 	status: 'process'
// }]);

let index = 1;
const allIds = [];

const placeForEmployees = document.getElementById('placeForEmployees');
const choose_employee = document.getElementById('choose_employee');
const add_task = document.getElementById('add_task');
const placeForTasks = document.querySelector('#placeForTasks');

const listenners = {
	listen_tr(){
		document.querySelectorAll('.tr')
			.forEach(element => {
				element.addEventListener('click', () => {
					document.getElementById('popup').classList.add('active');
					this.listen_deleteTask(element.dataset.index);
					this.popupClose();
				});
		});
	},

	listen_deleteTask(index){
		document.getElementById('deleteTask')
			.addEventListener('click', () => {
				methods.deleteTask(index);
			});
	},

	popupClose(){
		const popup_block = document.querySelector('.popup_block');
		document.addEventListener('mousedown', (event) => {
			if (!popup_block.contains(event.target)) {
				 popup.classList.remove("active");
			}
		});
	},
}

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
			value.forEach(element => {
					const tr = document.createElement('tr');
					tr.classList.add('tr');
					tr.dataset.index = element.id;


					let employTd = document.createElement('td');
					let idTd = document.createElement('td');
					let titleTd = document.createElement('td');
					let statusTd = document.createElement('td');

					employTd.innerText = key;
					idTd.innerText = element.id;
					titleTd.innerText = element.title;
					statusTd.innerText = element.status;

					tr.appendChild(employTd);
					tr.appendChild(idTd);
					tr.appendChild(titleTd);
					tr.appendChild(statusTd);

					place.appendChild(tr);
			});
		}
		listenners.listen_tr();
	},

	deleteTask(index){
		alert('В разработке');
		// for(let [key, value] of tasks.entries()){
		// 	console.log(value);
		// 	value.forEach((item, ind) => {
		// 		if(item.id == index){
		// 			// console.log(item.entries());
		// 			console.log(item.keys());
		// 			// item.slice(ind);
		// 			// console.log(ind);
		// 			// console.log(tasks);
		// 		}
		// 	});
		// }
		// this.placeClear(placeForTasks);
		// this.tasksDisplay(placeForTasks);
		// document.getElementById('popup').classList.remove('active');
	},

	placeClear(place){
			place.innerText = '';
			place.innerHTML= '';
	},

	inputClear(input){
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
			return alert('Такой сотрудник уже есть!');
		}
		
		methods.placeClear(placeForEmployees);
		methods.setOptions(choose_employee);
		methods.employeeDisplay(placeForEmployees);
		this.inputClear(nameEmployee_element);
	},

	addTask(name, task){
		if(!name || !task){
			alert('Заполните поля!');
			return;
		}
		if(!tasks.has(name)){
			console.log("Такого сотрудника не найдено!");
			return;
		}

		const obj = {
			id: index++,
			title: task,
			status: 'new'
		}

		const employeeTask = tasks.get(name);
		employeeTask.push(obj);
		tasks.set(name, employeeTask);
		this.inputClear(add_task);
		this.placeClear(placeForTasks);
		this.tasksDisplay(placeForTasks);
		console.log(tasks);
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

	
	


