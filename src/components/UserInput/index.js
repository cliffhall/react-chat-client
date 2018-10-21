import React, { Component } from 'react';
import { connect } from 'react-redux';

// CONSTANTS
import { Styles } from '../../constants';

// ACTIONS
import { userChanged } from '../../store/message/actions';

// Text input for user name
class UserInput extends Component {

    // A user has been selected
    handleUserChange = event => this.props.userChanged(event.target.value);

    render() {
        return <div style={Styles.fieldStyle}>
            <label style={Styles.labelStyle} htmlFor="userInput">Your Name</label>
            <input type="text" name="userInput" onChange={this.handleUserChange} disabled={this.props.connected}/>
        </div>;

    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    userChanged: user => dispatch(userChanged(user))
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(UserInput);