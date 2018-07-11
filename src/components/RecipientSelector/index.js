/**
 * Since this is a child of Client should it just move to be a child of the Client folder?
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fieldStyle, labelStyle } from '../../constants/Styles.js';
import { NO_RECIPIENT } from '../../constants/Config.js';
import { recipientChanged } from '../../actions/message';

// Dropdown to select recipient to message
class RecipientSelector extends Component {

    // A recipient has been selected
    handleRecipientChange = event => this.props.dispatch(recipientChanged(event.target.value));

    render() {
        return (this.props.users.length)
            ? <div style={fieldStyle}>
                <label style={labelStyle} htmlFor="selectRecipient">Recipient</label>
                <select name="selectRecipient" onChange={this.handleRecipientChange}>
                    <option disabled value={NO_RECIPIENT} selected={this.props.recipient === NO_RECIPIENT} key="-1">{NO_RECIPIENT}</option>
                    {this.props.users.map( (user, index) =>
                        <option key={index} selected={this.props.recipient === user} value={user}>{user}</option>)}
                </select>
              </div>
            : null;
    }
}

const mapStateToProps = (state) => ({
    recipient: state.messageState.recipient,
    users: state.messageState.users

});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipientSelector);
