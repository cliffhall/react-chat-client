import React, { Component } from 'react';
import { buttonStyle, disabledButtonStyle } from '../../constants/Styles.js';

// Let user toggle the connection
export class ConnectButton extends Component { // disabled, connected, handleClick
    render() {
        return <button style={this.props.enabled ? buttonStyle : disabledButtonStyle}
                       onClick={this.props.handleClick}
                       disabled={!this.props.enabled}>{this.props.connected ? 'Disconnect' : 'Connect'}</button>;
    }
}

