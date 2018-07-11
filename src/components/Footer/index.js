import React, { Component } from 'react';
import { connect } from 'react-redux';

import { footerStyle } from '../../constants/Styles.js';
import ConnectButton from './ConnectButton.js';
import StatusLine from './StatusLine.js';

// Footer with status line and connect button
class Footer extends Component {
    render() {
        return <div style={footerStyle}>
            <StatusLine/>
            <ConnectButton socket={this.props.socket}/>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapDispatchToProps)(Footer);