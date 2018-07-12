import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

// CONSTANTS
import { Styles } from '../../constants';

// COMPONENTS
import { InstantMessage } from './InstantMessage.js';

// The message history list
class MessageHistory extends Component {
    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
    }

    scrollToBottom = () => ReactDOM.findDOMNode(this.messagesEnd.current).scrollIntoView({ behavior: 'smooth' });

    componentDidUpdate() {
        const messages = this.getMessages();
        if (this.props.connected && messages.length) this.scrollToBottom();
    }

    getMessages = () => {
        return (this.props.threads[this.props.recipient]) ? this.props.threads[this.props.recipient] : [];
    };

    render() {
        const messages = this.getMessages();
        return (this.props.connected && messages.length)
            ? <div style={Styles.historyContainerStyle}>
                <ul style={Styles.historyStyle}>
                    {this.props.threads[this.props.recipient].map((message, index) =>
                        <InstantMessage user={this.props.user}
                                        message={message}
                                        key={index}
                                        ref={(index === messages.length -1) ? this.messagesEnd : null}/>)}
                </ul>
              </div>
            : null;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
    user: state.messageState.user,
    threads: state.messageState.threads,
    recipient: state.messageState.recipient
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(MessageHistory);
