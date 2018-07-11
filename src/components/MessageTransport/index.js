/**
 * Since this is a child of Client should it just move to be a child of the Client folder?
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fieldStyle } from '../../constants/Styles.js';
import { NO_RECIPIENT } from '../../constants/Config.js';

import SendButton from './SendButton.js';
import MessageInput from './MessageInput.js';

// Message input and send button
class MessageTransport extends Component {

    isVisible = () => ( this.props.connected && this.props.recipient !== NO_RECIPIENT);

    render() {
        return this.isVisible()
            ? <div style={fieldStyle}>
                <MessageInput/>
                <SendButton socket={this.props.socket}/>
              </div>
            : null;
    }
}

const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
    port: state.socketState.port,
    user: state.messageState.user,
    recipient: state.messageState.recipient
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageTransport);