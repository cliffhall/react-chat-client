import { historyContainerStyle, historyStyle } from './../constants/Styles.js';
import { InstantMessage } from './InstantMessage.js';

// The message history list
export class MessageHistory extends React.Component {
    constructor(props) { // connected, user, messages
        super(props);
        this.messagesEnd = React.createRef();
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom() {
        ReactDOM.findDOMNode(this.messagesEnd.current).scrollIntoView({ behavior: 'smooth' });
    }

    componentDidUpdate() {
        if (this.props.connected && this.props.messages.length) this.scrollToBottom();
    }

    render() {
        let retval = null;
        if (this.props.connected && this.props.messages.length) {
            retval = React.createElement('div', {style: historyContainerStyle},
                React.createElement('ul', {style: historyStyle},
                    this.props.messages.map((message, index) =>
                        React.createElement(InstantMessage, {
                            user: this.props.user,
                            message: message,
                            key: index,
                            ref: (index === this.props.messages.length -1)? this.messagesEnd : null
                        }))
                )
            );
        }
        return retval;
    }
}
