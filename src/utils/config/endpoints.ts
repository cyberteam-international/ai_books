import Cookies from "js-cookie"

const BASE_URL = 'http://158.160.127.24:3000'

const token = Cookies.get('access_token')

export const ENDPOINTS = {
    USERS: {
        GET_iNFO: {
            url: BASE_URL + '/users',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        },
        UPDATE_INFO: {
            url: BASE_URL + '/users',
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        },
        UPDATE_EMAIL: {
            url: BASE_URL + '/users/email',
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        },
        UPDATE_EMAIL_CONFIRM: {
            url: BASE_URL + '/users/email/confirm',
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        },
    },
    AUTH: {
        SIGNUP: {
            url: BASE_URL + '/auth/signup',
            method: 'POST'
        },
        LOGIN: {
            url: BASE_URL + '/auth/login',
            method: 'POST'
        }
    }
}