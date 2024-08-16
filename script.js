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
    { task: 'change gun to 1st alternative', key: '1' },
    { task: 'change gun to pistol/2nd alternative', key: '2' },
    { task: 'remove gun', key: '3' },
    { task: 'shoot', key: 'click' },
    { task: 'scope', key: 'right_click' }
];

let taskInterval;
let isRunning = false;

const taskElement = document.getElementById('task');
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', startPractice);

function startPractice() {
    if (isRunning) return;
    isRunning = true;
    startBtn.style.display = 'none';

    taskInterval = setInterval(() => {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        taskElement.innerText = `Task: ${randomTask.task}`;
        waitForAction(randomTask.key);
    }, 2000);
}

function waitForAction(key) {
    const actionListener = (e) => {
        if (e.key === key || (key === 'click' && e.type === 'click') || (key === 'right_click' && e.button === 2)) {
            taskElement.innerText = 'Good Job!';
            document.removeEventListener('keydown', actionListener);
            document.removeEventListener('mousedown', actionListener);
        }
    };

    document.addEventListener('keydown', actionListener);
    document.addEventListener('mousedown', actionListener);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        clearInterval(taskInterval);
        taskElement.innerText = 'Practice session ended.';
        startBtn.style.display = 'block';
        isRunning = false;
    }
});
