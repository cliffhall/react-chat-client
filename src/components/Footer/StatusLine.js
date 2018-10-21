import React, { Component } from 'react';
import { connect } from 'react-redux';

// CONSTANTS
import { Styles } from '../../constants';

// Display the connection status
class StatusLine extends Component {

    render() {
        return <div style={this.props.isError ? Styles.errorStatusStyle : Styles.statusStyle}>
            {this.props.status}
        </div>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    isError: state.statusState.isError,
    status: state.statusState.status,
    recipient: state.messageState.recipient,
    recipientLost: state.messageState.recipientLost

});

// Export props-mapped HOC
export default connect(mapStateToProps)(StatusLine);