// Status related actions
export const STATUS_CHANGED = 'status/status-changed';

// The status message has changed
export const statusChanged = (status, isError=false) => {
    return {
        type: STATUS_CHANGED,
        status: status,
        isError: isError
    };
};