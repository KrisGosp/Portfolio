const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

const generateTemplate = task => {

    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${task}</span>
            <i class="fa-solid fa-circle-check delete"></i>
            <span id="tooltip-text">Mark as completed</span>
        </li>
    `;

    list.innerHTML += html;

}

addForm.addEventListener('submit', e => {

    e.preventDefault();

    const task = addForm.add.value.trim();

    if (task.length) {
    generateTemplate(task);
    addForm.reset();
    };
});

list.addEventListener('click', e => {

    if (e.target.classList.contains('delete')) {
        console.log('clicked')
        e.target.parentElement.remove();
    }

});

const filterTasks = userInput => {

    Array.from(list.children)
        .filter(task => !task.textContent.toLowerCase().includes(userInput))
        .forEach(task => task.classList.add('filtered'));

    Array.from(list.children)
        .filter(task => task.textContent.toLowerCase().includes(userInput))
        .forEach(task => task.classList.remove('filtered'));
}
search.addEventListener('keyup', e => {
    const userInput = search.value.trim().toLowerCase();

    filterTasks(userInput);
})