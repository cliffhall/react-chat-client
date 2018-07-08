import React, { Component } from 'react';
import { senderStyle, recipientStyle } from './../constants/Styles.js';

// A formatted instant message
export class InstantMessage extends Component { // user, key, message
    render() {
        return <li style={(this.props.message.from === this.props.user) ? senderStyle : recipientStyle}>
            <strong>{this.props.message.from}: </strong> {this.props.message.text}
        </li>;
    }
}
