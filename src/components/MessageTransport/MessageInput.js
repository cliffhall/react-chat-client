import React, { Component } from 'react';
import { connect } from 'react-redux';

import { labelStyle } from '../../constants/Styles.js';
import { outgoingMessageChanged } from '../../store/message/actions';

// Text input for outgoing message
class MessageInput extends Component {

    // The outgoing message text has changed
    handleOutgoingMessageChange = event => {
        this.props.dispatch(outgoingMessageChanged(event.target.value));
    };

    render() {
        return <span>
            <label style={labelStyle} htmlFor="messageInput">Message</label>
            <input type="text" name="messageInput"
                   value={this.props.outgoingMessage}
                   onChange={this.handleOutgoingMessageChange}/>
        </span>;
    }
}

const mapStateToProps = (state) => ({outgoingMessage: state.messageState.outgoingMessage || ''});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);