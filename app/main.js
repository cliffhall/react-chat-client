import { ClientDisplay, Timer } from './Client.js'

const socket = new Socket()

function render() {
    ReactDOM.render(
        React.createElement('div', {},
            React.createElement(TimerDisplay, {
                title: 'POMODORO',
                // These 5 lines connect the Socket with the ChatDisplay
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
