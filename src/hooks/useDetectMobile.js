import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';

export default function useDetectMobile(excludedPages = []) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (!excludedPages.includes(window.location.pathname)) {
            const locationWindow = window.location;
            if (isMobile && !locationWindow.pathname.startsWith('/m')) {
                setLoading(true);
                if (locationWindow.pathname === '/') {
                    router.replace('/m');
                } else {
                    router.replace('/m' + locationWindow.pathname + locationWindow.search);
                }
            } else {
                return setLoading(false);
            }
        } else {
            return setLoading(false);
        }
    }, [loading]);
    return loading;
}