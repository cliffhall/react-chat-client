import React, { Component } from 'react';
import { buttonStyle, disabledButtonStyle } from './../constants/Styles.js';

// Let user send a message
export class SendButton extends Component { // enabled, onSend
    render() {
        return <button style={this.props.enabled ? buttonStyle : disabledButtonStyle}
                       onClick={this.props.onSend}
                       disabled={!this.props.enabled}>Send</button>;
    }
}
