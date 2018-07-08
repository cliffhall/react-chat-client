// Styles
export const clientStyle = {
    width: '400px',
    height: '500px',
    display: 'block',
    border: '1px solid #ACACAC',
    borderRadius: '5px',
    textAlign: 'left',
    backgroundColor: '#FCFCFC',
    color: '#00000',
    fontFamily: "'Lato', 'PT Sans', Helvetica, sans-serif"
};
export const footerStyle = {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #ACACAC',
};
export const buttonStyle = {
    backgroundColor: '#ffffff',
    margin: '3px',
    borderRadius: '5px',
    border: '2px solid #9667ff',
    fontSize: '10px',
    color: '#9667ff',
    padding: '5px',
    cursor: 'pointer'
};
export const disabledButtonStyle = Object.assign({}, buttonStyle, {
    color: '#C3C3C3',
    border: '2px solid #C3C3C3',
    cursor: 'not-allowed'
});
export const recipientStyle = {
    fontSize: '14px',
    lineHeight: '12px',
    padding: '5px 5px 0',
    color: '#89b9df'};
export const senderStyle = {
    fontSize: '14px',
    lineHeight: '14px',
    padding: '5px 5px 0',
    color: '#c76499'};
export const historyContainerStyle = {
    borderTop: '1px solid #ccc',
    height: '63.35%',
    width: '100%'
};
export const historyStyle = {
    height: '100%',
    width: '100%',
    overflow: 'scroll',
    margin: '0px',
    padding: '0px',
    fontSize: '20px',
    fontFamily: 'Arial, sans-serif',
};
export const statusStyle = {
    fontSize: '17px',
    lineHeight: '15px',
    padding: '10px 5px 0 5px',
    color: 'green',
    flexGrow: '2'
};
export const errorStatusStyle = Object.assign({}, statusStyle, {
    color: 'red'
});
export const fieldStyle = {
    margin: '10px'
};
export const labelStyle = {
    marginRight: '10px'
};
