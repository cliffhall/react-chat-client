import React, { Component } from 'react';
import { connect } from 'react-redux';

import { buttonStyle, disabledButtonStyle } from '../../constants/Styles.js';

import { sendMessage } from '../../actions/message';

// Let user send a message
class SendButton extends Component {

    // User wants to send the outgoing message
    handleClick = () => {
        this.props.dispatch(sendMessage(this.props.socket, this.props.outgoingMessage));
    };

    // Is the button enabled?
    isEnabled = () => (!!this.props.outgoingMessage);

    render() {
        return <button style={this.isEnabled() ? buttonStyle : disabledButtonStyle}
                       onClick={this.handleClick}
                       disabled={!this.isEnabled()}>Send</button>;
    }
}

const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
    port: state.socketState.port,
    user: state.messageState.user,
    outgoingMessage: state.messageState.outgoingMessage
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SendButton);