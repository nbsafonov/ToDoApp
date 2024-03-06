let addButton = document.querySelector('.addButton');
let input = document.querySelector('.input');
let list = document.querySelector('.list');
let clearList = document.querySelector('.clear__list');
let dellAllcompBtn = document.querySelector('.dellAll');

// Добавление задачи


input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addButton.click();
    }
})

addButton.addEventListener('click', addTask);
list.addEventListener('click', deleteTask);
list.addEventListener('click', complitedTask);

dellAllcompBtn.addEventListener('click', () => {
    list.innerHTML = ''
    if (list.children.length === 0) {
        clearList.style.display = 'block'
    }
    saveToLocalstorage()
})

if (localStorage.getItem('tasks')) {
    list.innerHTML = localStorage.getItem('tasks');
}

if (list.children.length !== 0) {
    clearList.style.display = 'none'
}


// Функции


function addTask() { 
    if (input.value !== '') {
        let newTask = document.createElement('li');
        let textInner = document.createElement('span')
        textInner.classList.add('text__inner');
        textInner.innerText = `${input.value}`;
        newTask.appendChild(textInner);
        let complited = document.createElement('span');
        complited.classList.add('btn__inner__comp')
        complited.innerHTML = '<i class="fa-solid fa-check"></i>';
        let dellite = document.createElement('span');
        dellite.classList.add('btn__inner__dell')
        dellite.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        let innerBtns = document.createElement('div');
        innerBtns.classList.add('inner__btns')
        innerBtns.appendChild(dellite);
        innerBtns.appendChild(complited);
        newTask.appendChild(innerBtns);
        list.appendChild(newTask);
        input.value = '';
        input.focus();
        if (list.children.length > 0) {
            clearList.style.display = 'none';
        }
    }
    saveToLocalstorage()
}

function deleteTask(event) {
    if (event.target.className === 'btn__inner__dell') {
        let parentNode = event.target.closest('li');
        parentNode.remove()
    }

    if (list.children.length === 0) {
        clearList.style.display = 'block'
    }
    saveToLocalstorage()
}

function complitedTask(event) {
    if (event.target.className === 'btn__inner__comp') {
        let parentNode = event.target.closest('li');
        let taskTitle = parentNode.querySelector('.text__inner');
        taskTitle.classList.toggle('text__inner--done');
    }
    saveToLocalstorage()
}

function saveToLocalstorage() {
    localStorage.setItem('tasks', list.innerHTML);
}




