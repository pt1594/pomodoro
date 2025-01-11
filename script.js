class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        
        // Timer durations in minutes
        this.pomodoroTime = 25;
        this.shortBreakTime = 5;
        this.longBreakTime = 15;

        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.pomodoroButton = document.getElementById('pomodoro');
        this.shortBreakButton = document.getElementById('shortBreak');
        this.longBreakButton = document.getElementById('longBreak');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.pomodoroButton.addEventListener('click', () => this.setTime(this.pomodoroTime));
        this.shortBreakButton.addEventListener('click', () => this.setTime(this.shortBreakTime));
        this.longBreakButton.addEventListener('click', () => this.setTime(this.longBreakTime));
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update the display
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        
        // Update the browser title
        document.title = `${timeString} - Pomodoro Timer`;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.pause();
                    alert('Time is up!');
                }
            }, 1000);
            document.querySelector('.timer').classList.add('running');
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
        document.querySelector('.timer').classList.remove('running');
    }

    reset() {
        this.pause();
        this.timeLeft = this.pomodoroTime * 60;
        this.updateDisplay();
    }

    setTime(minutes) {
        this.pause();
        this.timeLeft = minutes * 60;
        this.updateDisplay();
        
        // Update active button
        [this.pomodoroButton, this.shortBreakButton, this.longBreakButton].forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
}); 