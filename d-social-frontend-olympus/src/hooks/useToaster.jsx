import { toast } from 'react-toastify';

export default () => {

    const showNotification = (message, type = 'success') => {
        toast(message, {
            type: type,
            position: 'bottom-right',
            style: {
                background: "white",
                color: "black",
            },
        });

    };

    return { showNotification };
};