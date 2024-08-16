// Define the list of tasks, with some hold actions
const tasks = [
    { task: 'jump', key: ' ', type: 'press' },
    { task: 'crouch', key: 'c', type: 'press' },
    { task: 'sprint', key: 'Shift', type: 'press' },
    { task: 'go ahead', key: 'w', type: 'hold' },
    { task: 'go back', key: 's', type: 'hold' },
    { task: 'go left', key: 'a', type: 'hold' },
    { task: 'go right', key: 'd', type: 'hold' },
    { task: 'reload', key: 'r', type: 'press' },
    { task: 'use skill', key: 'e', type: 'press' },
    { task: 'put gloo wall', key: 'q', type: 'press' },
    { task: 'shoot', key: 'left_click', type: 'hold' }, // hold action for shooting
    { task: 'scope', key: 'right_click', type: 'press' },
    { task: 'go right-ahead', key: ['d', 'w'], type: 'hold' } // combination of keys
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
    const duration = Math.floor(Math.random() * 5) + 3; // Random duration between 3 and 7 seconds

    if (randomTask.type === 'hold') {
        taskElement.innerText = `Task: ${randomTask.task} (${duration}s)`;
        waitForHoldAction(randomTask.key, duration);
    } else {
        taskElement.innerText = `Task: ${randomTask.task}`;
        waitForPressAction(randomTask.key);
    }
}

function waitForPressAction(key) {
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

function waitForHoldAction(keys, duration) {
    let timer = duration;
    let holdInterval;

    const actionListener = (e) => {
        if (isKeyDown(keys)) {
            holdInterval = setInterval(() => {
                timer--;
                taskElement.innerText = `Task: Hold ${Array.isArray(keys) ? keys.join('+') : keys} (${timer}s)`;
                if (timer <= 0) {
                    clearInterval(holdInterval);
                    taskElement.innerText = '';
                    document.removeEventListener('keydown', actionListener);
                    document.removeEventListener('keyup', actionListener);
                    setTimeout(displayNextTask, 500); // Show next task after 500ms delay
                }
            }, 1000);
        }
    };

    document.addEventListener('keydown', actionListener);
    document.addEventListener('keyup', () => {
        clearInterval(holdInterval);
        timer = duration; // Reset timer if keys are released early
    });
}

function isKeyDown(keys) {
    if (Array.isArray(keys)) {
        return keys.every(key => key === 'left_click' ? mouse.isButtonPressed(0) : key === 'right_click' ? mouse.isButtonPressed(2) : keyboard.isKeyPressed(key));
    }
    return keys === 'left_click' ? mouse.isButtonPressed(0) : keys === 'right_click' ? mouse.isButtonPressed(2) : keyboard.isKeyPressed(keys);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        taskElement.innerText = 'Practice session ended.';
        startBtn.style.display = 'block';
        isRunning = false;
    }
});
