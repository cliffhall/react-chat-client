import React, { Component } from 'react';
import { connect } from 'react-redux';

// CONSTANTS
import { Styles, UI } from '../../constants';

// ACTIONS
import { portChanged } from '../../store/socket/actions';

// Dropdown to select port number to connect to
class PortSelector extends Component {

    // A port has been selected
    handlePortChange = event => this.props.dispatch(portChanged(event.target.value));

    render() {
        return <div style={Styles.fieldStyle}>
            <label style={Styles.labelStyle} htmlFor="selectPort">Server Port</label>
            <select name="selectPort" onChange={this.handlePortChange} disabled={this.props.connected}>
                {UI.PORTS.map( (port, index) => <option value={port} key={index}>{port}</option>)}
            </select>
        </div>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
    status: state.socketState.status
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(PortSelector);