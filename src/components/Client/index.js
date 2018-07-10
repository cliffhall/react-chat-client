/**
 * React-based chat client for node-multi-server-chat
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// CONSTANTS
import { clientStyle } from '../../constants/Styles.js'

// COMPONENTS
import { Socket } from '../../utils/Socket.js';
import { UserInput } from '../UserInput'
import { RecipientSelector } from '../RecipientSelector';
import { PortSelector } from '../PortSelector';
import { MessageTransport } from '../MessageTransport';
import { MessageHistory } from '../MessageHistory';
import { Footer } from '../Footer';

// ACTIONS
import {
    userChanged,
    recipientChanged,
    outgoingMessageChanged,
    messageReceived,
    clientUpdateReceived,
    sendMessage,
    abandonChat
} from '../../actions/message';
import { statusChanged, connectionChanged, portChanged } from '../../actions/socket';

// Main client component
class Client extends Component {
    constructor(props) {
        super(props);
        this.socket = new Socket(
            this.onConnectionChange,
            this.onStatusChange,
            this.onIncomingMessage,
            this.onUpdateClient
        );
    }

    // The socket's connection state changed
    onConnectionChange = isConnected => this.props.dispatch(connectionChanged(isConnected));

    // The status message has changed
    onStatusChange = (status, isError) => this.props.dispatch(statusChanged(status, isError));

    // The client has received a message
    onIncomingMessage = message => this.props.dispatch(messageReceived(message));

    // The server has updated us with a list of users
    onUpdateClient = update => this.props.dispatch(clientUpdateReceived(update));

    // A port has been selected
    onPortChange = port => this.props.dispatch(portChanged(port));

    // A user has been selected
    onUserChange = user => this.props.dispatch(userChanged(user));

    // A recipient has been selected
    onRecipientChange = recipient => this.props.dispatch(recipientChanged(recipient));

    // The outgoing message text has changed
    onOutgoingMessageChange = text => this.props.dispatch(outgoingMessageChanged(text));

    // User wants to send an instant message
    onSendMessage = () => this.props.dispatch(sendMessage(this.socket, this.props.outgoingMessage));

    // User clicked the connect/disconnect button
    onToggleConnection = () => {
        if (this.props.connected) {
            this.socket.disconnect();
            this.props.dispatch(abandonChat());
        } else if(this.props.port && this.props.user) {
            this.socket.connect(this.props.user, this.props.port);
        }
    };

    // Render the component
    render() {
        return <div style={clientStyle}>

            <UserInput connected={this.props.connected} onChange={this.onUserChange}/>

            <PortSelector connected={this.props.connected} onChange={this.onPortChange}/>

            <RecipientSelector users={this.props.users}
                               recipient={this.props.recipient}
                               onChange={this.onRecipientChange}/>

            <MessageTransport connected={this.props.connected}
                              recipient={this.props.recipient}
                              outgoingMessage={this.props.outgoingMessage}
                              onChange={this.onOutgoingMessageChange}
                              onSend={this.onSendMessage}/>

            <MessageHistory user={this.props.user}
                            messages={this.props.messages}
                            connected={this.props.connected}/>

            <Footer status={this.props.status}
                    isError={this.props.isError}
                    connectEnabled={(!!this.props.port && !!this.props.user)}
                    connected={this.props.connected}
                    handleToggle={this.onToggleConnection}/>

        </div>;
    }
}

const mapStateToProps = (state) => ({
    // Socket state
    connected: state.socketState.connected,
    status: state.socketState.status,
    isError: state.socketState.isError,
    ports: state.socketState.port,

    // Message state
    user: state.messageState.user,
    recipient: state.messageState.recipient,
    outgoingMessage: state.messageState.outgoingMessage,
    messages: state.messageState.messages,
    users: state.messageState.users
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);