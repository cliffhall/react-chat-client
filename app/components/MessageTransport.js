import { fieldStyle } from './../constants/Styles.js';
import { NO_RECIPIENT } from '../constants/Config.js';
import { SendButton } from './SendButton.js';
import { MessageInput } from './MessageInput.js';

// Message input and send button
export class MessageTransport extends React.Component {
    constructor(props) { // connected, recipient, outgoingMessage, onChange, onSend
        super(props);
    }

    render() {
        let retval = null;
        if( this.props.connected && this.props.recipient !== NO_RECIPIENT) {
            retval = React.createElement('div',{style: fieldStyle},

                // Outgoing message input and send button
                React.createElement(MessageInput, { // outgoingMessage, onChange
                    outgoingMessage: this.props.outgoingMessage,
                    onChange: this.props.onChange
                }),

                // Send button
                React.createElement(SendButton, {
                    enabled: this.props.outgoingMessage,
                    onSend: this.props.onSend
                })

            );
        }

        return retval;
    }
}
