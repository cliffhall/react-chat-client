import React, { Component } from 'react';
import { connect } from 'react-redux';

// CONSTANTS
import { Styles, UI } from '../../constants';

// COMPONENTS
import SendButton from './SendButton.js';
import MessageInput from './MessageInput.js';

// Message input and send button
class MessageTransport extends Component {

    isVisible = () => ( this.props.connected && this.props.recipient !== UI.NO_RECIPIENT);

    render() {
        return this.isVisible()
            ? <div style={Styles.fieldStyle}>
                <MessageInput/>
                <SendButton/>
              </div>
            : null;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
    port: state.socketState.port,
    user: state.messageState.user,
    recipient: state.messageState.recipient
});

// Export props-mapped HOC
export default connect(mapStateToProps)(MessageTransport);