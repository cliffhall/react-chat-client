import React, { Component } from 'react';
import { fieldStyle } from './../constants/Styles.js';
import { NO_RECIPIENT } from '../constants/Config.js';
import { SendButton } from './SendButton.js';
import { MessageInput } from './MessageInput.js';

// Message input and send button
export class MessageTransport extends Component { // connected, recipient, outgoingMessage, onChange, onSend
    render() {
        return ( this.props.connected && this.props.recipient !== NO_RECIPIENT)
            ? <div style={fieldStyle}>
                <MessageInput outgoingMessage={this.props.outgoingMessage}
                              onChange={this.props.onChange}/>

                <SendButton enabled={this.props.outgoingMessage}
                            onSend={this.props.onSend}/>
            </div>
            : null;
    }
}
