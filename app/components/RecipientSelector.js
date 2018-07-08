import { fieldStyle, labelStyle } from './../constants/Styles.js';
import { NO_RECIPIENT } from '../constants/Config.js';

// Dropdown to select recipient to message
export class RecipientSelector extends React.Component {
    constructor(props) { // users, recipient, onChange
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    // Pass the value of the dropdown up to the client
    handleSelectChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        let retval = null;
        if (this.props.users.length) {
            retval = React.createElement('div', {style: fieldStyle},

                // Label
                React.createElement('label', {
                    style: labelStyle,
                    htmlFor: 'selectRecipient'
                }, 'Recipient'),

                // Dropdown
                React.createElement('select', {
                        name: 'selectRecipient',
                        onChange: this.handleSelectChange
                    },
                    React.createElement('option',{
                        value: NO_RECIPIENT,
                        key: -1
                    },'Choose someone to message'),
                    this.props.users.map((user, index) => React.createElement('option', {
                        value: user,
                        defaultValue: this.props.recipient === user,
                        key: index
                    }, user))
                )
            )
        }
        return retval;
    }
}
