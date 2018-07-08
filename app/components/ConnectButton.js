import { buttonStyle, disabledButtonStyle } from './../constants/Styles.js';

// Let user toggle the connection
export class ConnectButton extends React.Component {
    constructor(props) { // disabled, connected, handleClick
        super(props);
    }

    render() {
        return React.createElement('button', {
            style: this.props.enabled ? buttonStyle : disabledButtonStyle,
            onClick: this.props.handleClick,
            disabled: !this.props.enabled
        }, this.props.connected ? 'Disconnect' : 'Connect');
    }
}

