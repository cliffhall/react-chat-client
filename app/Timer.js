/**
 * Not sure how this works? Don't worry, we'll get to it soon.
 */

export const containerStyle = {
    display: 'inline-block',
    borderRadius: '2px',
    textAlign: 'right',
    backgroundColor: '#0f0035',
    color: '#ffb3cb',
    fontFamily: "'Lato', 'PT Sans', Helvetica, sans-serif",
}
export const timeStyle = {
    fontSize: '20px',
    lineHeight: '20px',
    height: '29px',
    padding: '5px 5px 4px',
    fontFamily: "'Lato', 'PT Sans', Helvetica, sans-serif",
}
export const titleStyle = {
    fontSize: '10px',
    lineHeight: '10px',
    padding: '5px 5px 0',
    color: '#ff6796',
}
export const buttonStyle = {
    backgroundColor: 'transparent',
    border: 0,
    borderTop: '1px solid #ff6796',
    fontSize: '10px',
    color: '#ffb3cb',
    padding: '5px',
    cursor: 'pointer',
}
export const disabledButtonStyle = Object.assign({}, buttonStyle, {
    color: 'rgb(70, 58, 62)',
})

export function TimerDisplay({ title, margin='5px', time, active, onStart, onStop, onReset }) {
    return React.createElement('div', { style: Object.assign({margin}, containerStyle) },
        title && React.createElement('div', { style: titleStyle }, title),
        React.createElement('div', { style: timeStyle }, time ? time.toFixed(3) : ""),
        React.createElement('button', {
            style: (onStart || onStop) ? buttonStyle : disabledButtonStyle,
            onClick: active ? onStop : onStart,
        }, active ? 'STOP' : 'START'),
        React.createElement('button', {
            style: (time === 0 || !onReset) ? disabledButtonStyle : buttonStyle,
            onClick: onReset,
        }, 'RESET')
    )
}


export class Timer {
    constructor(listener) {
        this.time = 0

        this.listener = listener

        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.reset = this.reset.bind(this)
    }

    start() {
        this.lastTime = new Date().getTime()
        this.active = setInterval(() => {
            const now = new Date().getTime()
            this.time += (now - this.lastTime) / 1000
            this.lastTime = now
            if (this.listener) this.listener(this.time, this.active)
        }, 37)
    }
    stop() {
        clearInterval(this.active)
        this.active = null
        if (this.listener) this.listener(this.time, this.active)
    }
    reset() {
        this.time = 0
        if (this.listener) this.listener(this.time, this.active)
    }
}


export class TimerContainer extends React.Component {
    constructor(props) {
        super(props)
        this.timer = new Timer(() => this.setState({
            time: this.timer.time
        }))
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.reset = this.reset.bind(this)
    }

    render() {
        return React.createElement(TimerDisplay, {
            title: this.props.title,
            margin: this.props.margin,
            time: this.timer.time,
            active: this.timer.active,
            onStart: this.start,
            onStop: this.stop,
            onReset: this.reset,
        })
    }

    start() {
        this.timer.start()
        this.setState({ active: true, time: this.timer.time })
    }
    stop() {
        this.timer.stop()
        this.setState({ active: false })
    }
    reset() {
        this.timer.reset()
        this.setState({ time: 0 })
    }
}