import React, { Component } from 'react';
import { connect } from 'react-redux';

// CONSTANTS
import { Styles } from '../../constants';

// ACTIONS
import { outgoingMessageChanged } from '../../store/message/actions';

// Text input for outgoing message
class MessageInput extends Component {

    // The outgoing message text has changed
    handleOutgoingMessageChange = event => {
        this.props.outgoingMessageChanged(event.target.value);
    };

    render() {
        return <span>
            <label style={Styles.labelStyle} htmlFor="messageInput">Message</label>
            <input type="text" name="messageInput"
                   value={this.props.outgoingMessage}
                   onChange={this.handleOutgoingMessageChange}/>
        </span>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({outgoingMessage: state.messageState.outgoingMessage || ''});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    outgoingMessageChanged: message => dispatch(outgoingMessageChanged(message))
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);