/**
 * Since this is a child of Client should it just move to be a child of the Client folder?
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { historyContainerStyle, historyStyle } from '../../constants/Styles.js';

import { InstantMessage } from './InstantMessage.js';

// The message history list
class MessageHistory extends Component {
    constructor(props) {
        super(props);
        this.messagesEnd = React.createRef();
    }

    scrollToBottom = () => ReactDOM.findDOMNode(this.messagesEnd.current).scrollIntoView({ behavior: 'smooth' });

    componentDidUpdate() {
        if (this.props.connected && this.props.messages.length) this.scrollToBottom();
    }

    render() {
        return (this.props.connected && this.props.messages.length)
            ? <div style={historyContainerStyle}>
                <ul style={historyStyle}>
                    {this.props.messages.map((message, index) =>
                        <InstantMessage user={this.props.user}
                                        message={message}
                                        key={index}
                                        ref={(index === this.props.messages.length -1) ? this.messagesEnd : null}/>)}
                </ul>
              </div>
            : null;
    }
}


const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
    user: state.messageState.user,
    messages: state.messageState.messages
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageHistory);
