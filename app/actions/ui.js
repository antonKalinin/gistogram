let notificationTimer = null;

/**
 * Self dissapearing notification
 */
export function addNotification(notificationData) {
    let notification;

    // If notification already presented, hide old, show new
    // TODO: Can be improved: add notification in a queue
    if (notificationTimer) {
        return dispatch => {
            dispatch({type: 'REMOVE_NOTIFICATION'});

            clearTimeout(notificationTimer);
            notificationTimer = null;

            dispatch(addNotification(notificationData));
        };
    }

    const defaultNotification = {
        text: 'Done',
        position: 'top',
        duration: 2000,
    };

    if (typeof notificationData === 'string') {
        notification = {...defaultNotification, ...{text: notificationData}};
    } else {
        notification = {...defaultNotification, ...notificationData};
    }

    return (dispatch) => {
        const timer = new Promise((resolve, reject) => {
            notificationTimer = setTimeout(resolve, notification.duration);
        });

        dispatch({
            type: 'ADD_NOTIFICATION',
            notification,
        });

        return timer.then(
            () => {
                dispatch(removeNotification());
            },
            (error) => { console.log(error); }
        );
    };
}

export function removeNotification() {
    clearTimeout(notificationTimer);
    notificationTimer = null;

    return {
        type: 'REMOVE_NOTIFICATION',
    };
}
