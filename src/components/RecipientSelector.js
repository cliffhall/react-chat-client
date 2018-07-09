import React, { Component } from 'react';
import { fieldStyle, labelStyle } from '../constants/Styles.js';
import { NO_RECIPIENT } from '../constants/Config.js';

// Dropdown to select recipient to message
export class RecipientSelector extends Component {
    constructor(props) { // users, recipient, onChange
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    // Pass the value of the dropdown up to the client
    handleSelectChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (this.props.users.length)
            ? <div style={fieldStyle}>
                <label style={labelStyle} htmlFor="selectRecipient">Recipient</label>
                <select name="selectRecipient" onChange={this.handleSelectChange}>
                    <option value={NO_RECIPIENT} key="-1">{NO_RECIPIENT}</option>
                    {this.props.users.map( (user, index) =>
                        <option key={index} value={user} selected={this.props.recipient === user}>{user}</option>)}
                </select>
              </div>
            : null;
    }
}
