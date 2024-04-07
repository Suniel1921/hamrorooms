import { useState, useEffect } from "react";

const useOnlineOfflineStatus = () => {
    const [onlineOfflineMode, setOnlineOfflineMode] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setOnlineOfflineMode(true);
        const handleOffline = () => setOnlineOfflineMode(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return onlineOfflineMode;
};

export default useOnlineOfflineStatus;
