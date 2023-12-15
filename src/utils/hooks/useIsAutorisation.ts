import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { ENDPOINTS } from '../config';

const useIsAuthorization = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuthorization = async () => {
            const token = Cookies.get('access_token');
            if (token) {
                try {
                    await axios({
                        ...ENDPOINTS.USERS.GET_iNFO,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setIsAuthorized(true);
                } catch (error) {
                    setIsAuthorized(false);
                }
                // setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        };

        checkAuthorization();
    }, []);

    return isAuthorized;
};

export default useIsAuthorization;