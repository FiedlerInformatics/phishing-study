class TimerState {
    timeLeft = $state(300000); // 5 min
    running = $state(false);

    interval = null;

    start() {
        if (this.running) return;

        this.running = true;

        this.interval = setInterval(() => {
            this.timeLeft -= 10;

            if (this.timeLeft <= 0) {
                this.stop();
            }
        }, 10);
    }

    stop() {
        clearInterval(this.interval);

        this.running = false;
        this.interval = null;
    }

    get minutes() {
        return Math.floor(this.timeLeft / 60000);
    }

    get seconds() {
        return Math.floor(
            (this.timeLeft % 60000) / 1000
        );
    }

    get milliseconds() {
        return this.timeLeft % 1000;
    }
}

export const timer = new TimerState();