import React, { Component } from 'react';
import { footerStyle } from '../../constants/Styles.js';
import { ConnectButton } from './ConnectButton.js';
import { StatusLine } from './StatusLine.js';

// Footer with status line and connect button
export class Footer extends Component { // status, isError, connectEnabled, connected, handleToggle
    render() {
        return <div style={footerStyle}>
            <StatusLine status={this.props.status} isError={this.props.isError}/>
            <ConnectButton enabled={this.props.connectEnabled}
                           connected={this.props.connected}
                           handleClick={this.props.handleToggle}/>
        </div>
    }
}
