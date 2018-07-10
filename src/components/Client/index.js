import React, { Component } from 'react';
import { connect } from 'react-redux';

// CONSTANTS
import { clientStyle } from '../../constants/Styles.js'
import { NO_RECIPIENT, RECIPIENT_LOST, RECIPIENT_FOUND } from '../../constants/Config.js';

// COMPONENTS
import Socket from '../../utils/Socket.js';
import UserInput from '../UserInput'
import RecipientSelector from '../RecipientSelector';
import PortSelector from '../PortSelector';
import MessageTransport from '../MessageTransport';
import MessageHistory from '../MessageHistory';
import Footer from '../Footer';

// ACTIONS
import { messageReceived, clientUpdateReceived, recipientChanged } from '../../actions/message';
import { connectionChanged } from '../../actions/socket';
import { statusChanged } from '../../actions/status';

// Main client component
class Client extends Component {
    constructor(props) {
        super(props);
        this.socket = new Socket(
            this.onConnectionChange,
            this.onSocketError,
            this.onIncomingMessage,
            this.onUpdateClient
        );
    }

    // The socket's connection state changed
    onConnectionChange = isConnected => {
        this.props.dispatch(connectionChanged(isConnected));
        this.props.dispatch(statusChanged(isConnected ? 'Connected' : 'Disconnected'));
    };

    // There has been a socket error
    onSocketError = (status) => this.props.dispatch(statusChanged(status, true));

    // The client has received a message
    onIncomingMessage = message => this.props.dispatch(messageReceived(message));

    // The server has updated us with a list of all users currently on the system
    onUpdateClient = message => {

        // Remove this user from the list
        let otherUsers = message.list.filter(user => user !== this.props.user);

        // Has our recipient disconnected?
        let recipientLost = this.props.recipient !== NO_RECIPIENT && !(message.list.find(user => user === this.props.recipient));
        let recipientFound = !!this.props.lostRecipient && !!message.list.find(user => user === this.props.lostRecipient);

        const dispatchUpdate = () => {
            this.props.dispatch(clientUpdateReceived(otherUsers, recipientLost));
        };

        console.log(recipientFound, this.props.lostRecipient, RECIPIENT_FOUND);

        if (recipientLost && !this.props.recipientLost) {
            this.props.dispatch(statusChanged(`${this.props.recipient} ${RECIPIENT_LOST}`, true));
            dispatchUpdate();
        } else if (recipientFound) {
            this.props.dispatch(statusChanged(`${this.props.lostRecipient} ${RECIPIENT_FOUND}`));
            dispatchUpdate();
            this.props.dispatch(recipientChanged(this.props.lostRecipient));
        } else {
            dispatchUpdate();
        }

    };

    // Render the component
    render() {
        return <div style={clientStyle}>

            <UserInput/>

            <PortSelector/>

            <RecipientSelector/>

            <MessageTransport socket={this.socket}/>

            <MessageHistory/>

            <Footer socket={this.socket}/>

        </div>;
    }
}

const mapStateToProps = (state) => ({
    recipient: state.messageState.recipient,
    lostRecipient: state.messageState.lostRecipient,
    user: state.messageState.user
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);