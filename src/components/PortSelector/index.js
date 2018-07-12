import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fieldStyle, labelStyle } from '../../constants/Styles.js';
import { PORTS } from '../../constants/Config.js';

import { portChanged } from '../../store/socket/actions';


// Dropdown to select port number to connect to
class PortSelector extends Component {

    // A port has been selected
    handlePortChange = event => this.props.dispatch(portChanged(event.target.value));

    render() {
        return <div style={fieldStyle}>
            <label style={labelStyle} htmlFor="selectPort">Server Port</label>
            <select name="selectPort" onChange={this.handlePortChange} disabled={this.props.connected}>
                {PORTS.map( (port, index) => <option value={port} key={index}>{port}</option>)}
            </select>
        </div>;
    }
}

const mapStateToProps = (state) => ({
    connected: state.socketState.connected,
    status: state.socketState.status
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(PortSelector);