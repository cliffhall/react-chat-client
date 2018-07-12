import React, { Component } from 'react';
import { connect } from 'react-redux';

import { buttonStyle, disabledButtonStyle } from '../../constants/Styles.js';

import { abandonChat } from '../../store/message/actions';

// Let user toggle the connection
class ConnectButton extends Component {

    connectEnabled = () => (!!this.props.port && !!this.props.user);

    // User clicked the connect/disconnect button
    handleClick = () => {
        if (this.props.connected) {
            this.props.socket.disconnect();
            this.props.dispatch(abandonChat());
        } else if(this.connectEnabled()) {
            this.props.socket.connect(this.props.user, this.props.port);
        }
    };

    render() {
        return <button style={this.connectEnabled() ? buttonStyle : disabledButtonStyle}
                       onClick={this.handleClick}
                       disabled={!this.connectEnabled()}>{this.props.connected ? 'Disconnect' : 'Connect'}</button>;
    }
}

const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
    port: state.socketState.port,
    user: state.messageState.user
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectButton);