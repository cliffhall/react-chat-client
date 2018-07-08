import React, { Component } from 'react';
import { labelStyle } from './../constants/Styles.js';

// Text input for outgoing message
export class MessageInput extends Component {
    constructor(props) { // outgoingMessage, onChange
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Pass the value of the input field up to the client
    handleInputChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return <span>
            <label style={labelStyle} htmlFor="messageInput">Message</label>
            <input type="text" name="messageInput" value={this.props.outgoingMessage} onChange={this.handleInputChange}/>
        </span>;
    }
}
