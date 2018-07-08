import { labelStyle, disabledButtonStyle } from './../constants/Styles.js';

// Text input for outgoing message
export class MessageInput extends React.Component {
    constructor(props) { // outgoingMessage, onChange
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Pass the value of the input field up to the client
    handleInputChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return React.createElement('span',{},

            // Label
            React.createElement('label',{
                style: labelStyle,
                htmlFor: 'messageInput'
            }, 'Message'),

            // Text Input
            React.createElement('input', {
                name: 'messageInput',
                type: 'text',
                value: this.props.outgoingMessage,
                onChange: this.handleInputChange
            })
        );
    }
}
