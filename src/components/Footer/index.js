import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            <ConnectButton socket={this.props.socket}/>
        </div>
    }
}

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

// Export props-mapped HOC
export default connect(mapDispatchToProps)(Footer);