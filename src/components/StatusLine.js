import React, { Component } from 'react';
import { statusStyle, errorStatusStyle } from './../constants/Styles.js';

// Display the connection status
export class StatusLine extends Component { // isError, status
    render() {
        return <div style={this.props.isError ? errorStatusStyle : statusStyle}>
            {this.props.status}
        </div>;
    }
}
