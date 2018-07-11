/**
 * Since this is a child of Client should it just move to be a child of the Client folder?
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fieldStyle, labelStyle } from '../../constants/Styles.js';
import { userChanged } from '../../actions/message';

// Text input for user name
class UserInput extends Component {

    // A user has been selected
    handleUserChange = event => this.props.dispatch(userChanged(event.target.value));

    render() {
        return <div style={fieldStyle}>
            <label style={labelStyle} htmlFor="userInput">Your Name</label>
            <input type="text" name="userInput" onChange={this.handleUserChange} disabled={this.props.connected}/>
        </div>;

    }
}

const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);