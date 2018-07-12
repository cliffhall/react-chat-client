import React, { Component } from 'react';
import { connect } from 'react-redux';

// CONSTANTS
import { Styles, UI } from '../../constants';

// ACTIONS
import { recipientChanged } from '../../store/message/actions';

// Dropdown to select recipient to message
class RecipientSelector extends Component {

    // A recipient has been selected
    handleRecipientChange = event => this.props.dispatch(recipientChanged(event.target.value));

    render() {
        return (this.props.users.length)
            ? <div style={Styles.fieldStyle}>
                <label style={Styles.labelStyle} htmlFor="selectRecipient">Recipient</label>
                <select name="selectRecipient" onChange={this.handleRecipientChange}>
                    <option disabled value={UI.NO_RECIPIENT} selected={this.props.recipient === UI.NO_RECIPIENT} key="-1">{UI.NO_RECIPIENT}</option>
                    {this.props.users.map( (user, index) =>
                        <option key={index} selected={this.props.recipient === user} value={user}>{user}</option>)}
                </select>
              </div>
            : null;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    recipient: state.messageState.recipient,
    users: state.messageState.users

});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(RecipientSelector);
