import React, { Component } from 'react';
import { connect } from 'react-redux';

// CONSTANTS
import { Styles } from '../../constants';

// ACTIONS
import { abandonChat } from '../../store/message/actions';
import { connectSocket, disconnectSocket } from '../../store/socket/actions';

// Let user toggle the connection
class ConnectButton extends Component {

    connectEnabled = () => (!!this.props.port && !!this.props.user);

    // User clicked the connect/disconnect button
    handleClick = () => {
        if (this.props.connected) {
            this.props.disconnectSocket();
            this.props.abandonChat();
        } else if(this.connectEnabled()) {
            this.props.connectSocket();
        }
    };

    render() {
        return <button style={this.connectEnabled() ? Styles.buttonStyle : Styles.disabledButtonStyle}
                       onClick={this.handleClick}
                       disabled={!this.connectEnabled()}>{this.props.connected ? 'Disconnect' : 'Connect'}</button>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
    port: state.socketState.port,
    user: state.messageState.user
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    disconnectSocket: () => dispatch(disconnectSocket()),
    connectSocket: () => dispatch(connectSocket()),
    abandonChat: () => dispatch(abandonChat())

});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(ConnectButton);