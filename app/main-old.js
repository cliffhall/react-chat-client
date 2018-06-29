import { TimerDisplay, Timer } from './Timer.js'

/**
 * Instances of the `Timer` class can be used to measure time (in seconds).
 *
 * `timer.start()` starts increasing the value stored in `timer.time`
 * `timer.stop()` stops increasing `timer.time`
 * `timer.reset()` resets `timer.time` to 0
 * `timer.active` is true when `timer.time` is increasing
 */
const timer = new Timer(render)

function render() {
    if (timer.time >= 60*25) {
        timer.stop()
        alert('Tomato!')
    }

    ReactDOM.render(
        React.createElement('div', {},
            React.createElement(TimerDisplay, {
                title: 'POMODORO',
                // These 5 lines connect the Timer with the TimerDisplay
                time: Math.max((60*25 - timer.time)/60, 0),
                active: timer.active,
                onStart: () => timer.start(),
                onStop: () => timer.stop(),
                onReset: () => timer.reset()
            })
        ),
        document.getElementById('app')
    )
}
render()
