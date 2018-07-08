import React, { Component } from 'react';
import { fieldStyle, labelStyle } from './../constants/Styles.js';
import { PORTS } from '../constants/Config.js';

// Dropdown to select port number to connect to
export class PortSelector extends Component {
    constructor(props) { // connected, onChange
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    // Pass the value of the dropdown up to the client
    handleSelectChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return <div style={fieldStyle}>
            <label style={labelStyle} htmlFor="selectPort">Server Port</label>
            <select name="selectPort" onChange={this.handleSelectChange} disabled={this.props.connected}>
                {PORTS.map( (port, index) => <option value={port} key={index}>{port}</option>)}
            </select>
        </div>;
    }
}