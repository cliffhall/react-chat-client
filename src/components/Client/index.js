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

        /**
         * I wonder if there is a way to have the Client View component
         * know less about the socket.
         *
         * Maybe the Client can just listen for State that the Socket sets.
         *
         * Socket can have all it's change/error/message listeners and just dispatch
         * information, while this view just listens for state that is relevant from the
         * socket.
         */
        this.socket = new Socket(
            this.onConnectionChange,
            this.onSocketError,
            this.onIncomingMessage,
            this.onUpdateClient
        );
    }

    // The socket's connection state changed
    onConnectionChange = isConnected => {
        /**
         * Anywhere you have this.props.dispatch, there is a refactoring that can be done.
         * You hide dispatch in mapDispatchToProps
         * `handleUserGesture = (param1, param2) => { dispatch(...) }`
         * You'd then call the this.props.handleUserGesture function - I also need to do this
         * refactoring and have completed it in a few places.
         *
         * The below does work but I think just like in my code, I am cheating the system by just passing
         * dispatch, and from a testability perspective I am not allowing myself to mock out more specific
         * view behaviors in test cases or Wrapper Mock Views like Storybook
         */
        this.props.dispatch(connectionChanged(isConnected));
        this.props.dispatch(statusChanged(isConnected ? 'Connected' : 'Disconnected'));
    };

    // There has been a socket error
    onSocketError = (status) => this.props.dispatch(statusChanged(status, true));

    // The client has received a message
    onIncomingMessage = message => this.props.dispatch(messageReceived(message));

    // The server has updated us with a list of all users currently on the system
    onUpdateClient = message => {

        /**
         * Style Feedback: Some teams favor never using `let` and only using `const` as declaring a variable
         * allows for mutation and the react community in general is very anti-mutability. It's definitely a style
         * thing and not relevant to this review, however it is my preference to never use let where possible I'll
         * favor const. I'm sure you will find examples in my code where I got lazy but I'm pushing to make that my
         * personal standard.
         */
        // Remove this user from the list
        let otherUsers = message.list.filter(user => user !== this.props.user);

        // Has our recipient disconnected?
        let recipientLost = this.props.recipient !== NO_RECIPIENT && !(message.list.find(user => user === this.props.recipient));

        // Has our previously disconnected recipient reconnected?
        let recipientFound = !!this.props.lostRecipient && !!message.list.find(user => user === this.props.lostRecipient);

        /**
         * This function could just be placed in mapDispatchToProps as is and you call this.props.dispatchUpdate()
         * I do think you'd have to introduce two parameters to dispatchUpdate for otherUsers and recipientLost
         */
        const dispatchUpdate = () => {
            this.props.dispatch(clientUpdateReceived(otherUsers, recipientLost));
        };

        if (recipientLost && !this.props.recipientLost) { // recipient just now disconnected
            this.props.dispatch(statusChanged(`${this.props.recipient} ${RECIPIENT_LOST}`, true));
            dispatchUpdate();
        } else if (recipientFound) { // previously lost recipient just reconnected
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
            {
                /**
                 * this.socket could be pulled into a singleton type thing that produces state as I said above and messageTransport
                 * would then just listen to the props passed to it from this top level view.
                 *
                 * This top level view would also be what is considered to be a Container component given it has mapDispatchToProps
                 * and all this redux awareness. The children of this view would be Presentational components (dumb) and just receive
                 * props.
                 */
            }
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