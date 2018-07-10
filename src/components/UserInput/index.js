import React, { Component } from 'react';
import { fieldStyle, labelStyle } from '../../constants/Styles.js';

// Text input for user name
export class UserInput extends Component { // connected, onChange

    // Pass the value of the input field up to the client
    handleInputChange = event => this.props.onChange(event.target.value);

    render() {
        return <div style={fieldStyle}>
            <label style={labelStyle} htmlFor="userInput">Your Name</label>
            <input type="text" name="userInput" onChange={this.handleInputChange} disabled={this.props.connected}/>
        </div>;

    }
}
