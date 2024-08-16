// Define the list of tasks
const tasks = [
    { task: 'jump', key: ' ' },
    { task: 'crouch', key: 'c' },
    { task: 'sprint', key: 'Shift' },
    { task: 'go ahead', key: 'w' },
    { task: 'go back', key: 's' },
    { task: 'go left', key: 'a' },
    { task: 'go right', key: 'd' },
    { task: 'reload', key: 'r' },
    { task: 'use skill', key: 'e' },
    { task: 'put gloo wall', key: 'q' },
    { task: 'shoot', key: 'left_click' }, // Updated to explicitly say left_click
    { task: 'scope', key: 'right_click' }
];

let isRunning = false;

const taskElement = document.getElementById('task');
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', startPractice);

function startPractice() {
    if (isRunning) return;
    isRunning = true;
    startBtn.style.display = 'none';
    displayNextTask();
}

function displayNextTask() {
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    taskElement.innerText = `Task: ${randomTask.task}`;
    waitForAction(randomTask.key);
}

function waitForAction(key) {
    const actionListener = (e) => {
        if ((e.key === key) ||
            (key === 'left_click' && e.type === 'mousedown' && e.button === 0) ||
            (key === 'right_click' && e.type === 'mousedown' && e.button === 2)) {
            taskElement.innerText = '';
            document.removeEventListener('keydown', actionListener);
            document.removeEventListener('mousedown', actionListener);
            setTimeout(displayNextTask, 500); // Show next task after 500ms delay
        }
    };

    document.addEventListener('keydown', actionListener);
    document.addEventListener('mousedown', actionListener);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        taskElement.innerText = 'Practice session ended.';
        startBtn.style.display = 'block';
        isRunning = false;
    }
});
