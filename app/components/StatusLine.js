import { statusStyle, errorStatusStyle } from './../constants/Styles.js';

// Display the connection status
export class StatusLine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('div',
            {style: this.props.isError ? errorStatusStyle : statusStyle},
            this.props.status);
    }
}
