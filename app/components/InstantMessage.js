import { senderStyle, recipientStyle } from './../constants/Styles.js';

// A formatted instant message
export class InstantMessage extends React.Component {
    constructor(props) { // user, key, message
        super(props);
    }

    render() {
        return React.createElement('li', {
            style: (this.props.message.from === this.props.user) ? senderStyle : recipientStyle
        }, React.createElement('strong', {},`${this.props.message.from}: `), this.props.message.text)
    }
}
