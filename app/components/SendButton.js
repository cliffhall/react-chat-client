import { buttonStyle, disabledButtonStyle } from './../constants/Styles.js';

// Let user send a message
export class SendButton extends React.Component {
    constructor(props) { // enabled, onSend
        super(props);
    }

    render() {
        return React.createElement('button', {
            style: this.props.enabled ? buttonStyle : disabledButtonStyle,
            onClick: this.props.onSend,
            disabled: !this.props.enabled
        }, 'Send');
    }
}
