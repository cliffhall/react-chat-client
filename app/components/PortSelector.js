import { fieldStyle, labelStyle } from './../constants/Styles.js';
import { PORTS } from '../constants/Config.js';

// Dropdown to select port number to connect to
export class PortSelector extends React.Component {
    constructor(props) { // connected, onChange
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    // Pass the value of the dropdown up to the client
    handleSelectChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return React.createElement('div',{style: fieldStyle},

            // Label
            React.createElement('label',{
                style: labelStyle,
                htmlFor: 'selectPort'
            }, 'Server Port'),

            // Dropdown
            React.createElement('select', {
                    name: 'selectPort',
                    onChange: this.handleSelectChange,
                    disabled: this.props.connected
                },
                PORTS.map( (port, index) => React.createElement('option', {
                    value: port,
                    key: index
                }, port))
            )
        )
    }
}