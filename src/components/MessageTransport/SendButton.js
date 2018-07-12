import React, { Component } from 'react';
import { connect } from 'react-redux';

// CONSTANTS
import { Styles } from '../../constants';

// ACTIONS
import { sendMessage } from '../../store/message/actions';

// Let user send a message
class SendButton extends Component {

    // User wants to send the outgoing message
    handleClick = () => {
        this.props.dispatch(sendMessage(this.props.socket, this.props.outgoingMessage));
    };

    // Is the button enabled?
    isEnabled = () => (!!this.props.outgoingMessage);

    render() {
        return <button style={this.isEnabled() ? Styles.buttonStyle : Styles.disabledButtonStyle}
                       onClick={this.handleClick}
                       disabled={!this.isEnabled()}>Send</button>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
    port: state.socketState.port,
    user: state.messageState.user,
    outgoingMessage: state.messageState.outgoingMessage
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(SendButton);