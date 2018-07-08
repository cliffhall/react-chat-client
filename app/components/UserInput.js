import { fieldStyle, labelStyle } from './../constants/Styles.js';

// Text input for user name
export class UserInput extends React.Component {
    constructor(props) { // connected, onChange
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Pass the value of the input field up to the client
    handleInputChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return React.createElement('div',{style: fieldStyle},

            // Label
            React.createElement('label',{
                style: labelStyle,
                htmlFor: 'userInput'
            }, 'Your Name'),

            // Text Input
            React.createElement('input', {
                name: 'userInput',
                type: 'text',
                onChange: this.handleInputChange,
                disabled: this.props.connected
            })
        );
    }
}
