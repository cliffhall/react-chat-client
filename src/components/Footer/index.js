import React, { Component } from 'react';

// CONSTANTS
import { Styles } from '../../constants';

// COMPONENTS
import ConnectButton from './ConnectButton.js';
import StatusLine from './StatusLine.js';

// Footer with status line and connect button
class Footer extends Component {
    render() {
        return <div style={Styles.footerStyle}>
            <StatusLine/>
            <ConnectButton/>
        </div>
    }
}

// Export props-mapped HOC
export default Footer;