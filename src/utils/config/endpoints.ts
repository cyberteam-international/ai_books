import axios from "axios"
import Cookies from "js-cookie"
import { CreateWorks, LoginForm, ProfileForm, RegistrationForm, UpdateWorks } from "../interface"

const BASE_URL = process.env.BACKEND_URL

const token = Cookies.get('token')

type PaymentParams = {
    payment_type: "yoo_money" | "bank_card" | "sbp" | "tinkoff_bank",
    payment_phone?: string,
    amount_value: string,
    amount_currency: string,
}

export const ENDPOINTS = {
    USERS: {
        GET_iNFO: (newToken?: string) => {
            return axios({
                url: BASE_URL + '/users',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${newToken?? token}`,
                }
            })
        },
        UPDATE_INFO: (data: { name?: ProfileForm['FormName']['name'], password?: ProfileForm['FormPassword']['password'], old_password?: ProfileForm['FormPassword']['old_password']}) => {
            return axios({
                url: BASE_URL + '/users',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: data.name ? { "name": data.name } : data.password ? { "password": data.password, "old_password": data.old_password } : console.error('Введите данные')
            })
        },
        UPDATE_EMAIL: (email: string) => {
            return axios({
                url: BASE_URL + '/users/email',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { "email": email }
            })
        },
        UPDATE_EMAIL_CONFIRM: (data: ProfileForm['FormEmail']) => {
            return axios({
                url: BASE_URL + '/users/email/confirm',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    email: data.email,
                    code: data.code
                }
            })
        },
    },
    AUTH: {
        SIGNUP: (data: RegistrationForm) => {
            return axios({
                url: BASE_URL + '/auth/signup',
                method: 'POST',
                data: data
            })
        },
        LOGIN: (data: LoginForm) => {
            return axios({
                url: BASE_URL + '/auth/login',
                method: 'POST',
                data: data
            })
        },
        SIGNUP_CONFIRM: (data: RegistrationForm) => {
            return axios({
                url: BASE_URL + '/auth/signup/confirm',
                method: 'POST',
                data: data
            })
        }
    },
    WORK: {
        GET_WORKS: () => {
            return axios({
                url: BASE_URL + '/works',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        },
        GET_WORK_ID: (id: number) => {
            return axios({
                url: `${BASE_URL}/works/${id}`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        },
        CREATE_WORK: (data: CreateWorks) => {
            return axios({
                url: BASE_URL + '/works',
                method: 'POST',
                headers: {
                    Authorization: token? `Bearer ${token}` : undefined,
                },
                data: data
            })
        },
        UPDATE_WORK: (id: number, data: UpdateWorks) => {
            return axios({
                url: `${BASE_URL}/works/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: data
            })
        },
        DELETE_WORK: (id: number) => {
            return axios({
                url: `${BASE_URL}/works/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        },
    },
    AUDIO: {
        GET_FILE: BASE_URL + '/uploads/'
    },
    STATISTIC: {
        GET_STATISTIC: (startDate: Date | undefined=undefined, endDate: Date | undefined=undefined) => {
            return axios({
                url: BASE_URL + '/statistics',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    start_date: startDate? 
                        `${startDate.getFullYear()}-${String(startDate?.getMonth() + 1).padStart(2, '0')}-${String(startDate?.getDate()).padStart(2, '0')}` 
                        : undefined, 
                    end_date: endDate? 
                        `${endDate.getFullYear()}-${String(endDate?.getMonth() + 1).padStart(2, '0')}-${String(endDate?.getDate()).padStart(2, '0')}` 
                        : undefined
                }
            })
        },
        UPDATE_STATISTIC: () => {
            return axios({
                url: BASE_URL + '/statistics/visit',
                method: 'POST',
            })
        },
    },
    VOICES: {
        GET_VOICES: () => {
            return axios({
                url: BASE_URL + '/voices',
                method: 'GET',
            })
        }
    },
    PAYMENT: {
        SET_PAYMENT: (data: PaymentParams) => {
            return axios({
                url: BASE_URL + '/payment',
                method: 'POST',
                data: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        },
        GET_HISTORY: (startDate: Date | undefined=undefined, endDate: Date | undefined=undefined) => {
            return axios({
                url: BASE_URL + '/payment',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    start_date: startDate? 
                        `${startDate.getFullYear()}-${String(startDate?.getMonth() + 1).padStart(2, '0')}-${String(startDate?.getDate()).padStart(2, '0')}` 
                        : undefined, 
                    end_date: endDate? 
                        `${endDate.getFullYear()}-${String(endDate?.getMonth() + 1).padStart(2, '0')}-${String(endDate?.getDate()).padStart(2, '0')}` 
                        : undefined
                }
            })
        },
    },
}
