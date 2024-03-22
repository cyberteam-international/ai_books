import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { CreateWorks, FogotPasswordForm, LoginForm, ProfileForm, RegistrationForm, ResponseStatistic, ResponseWork, ResponsesHistory, UpdateWorks, UserInfo } from "../interface"
import { UserInfoExtended } from "../interface/UserInfo"
import { ResponseEnvironment } from "../interface/Responses"

const BASE_URL = process.env.BACKEND_URL

const getToken = () => Cookies.get('token')

type PaymentParams = {
    payment_type: "yoo_money" | "bank_card" | "sbp" | "tinkoff_bank",
    payment_phone?: string,
    amount_value: string,
    amount_currency: string,
}

export const ENDPOINTS_URL = {
    USERS: BASE_URL + '/users',
    AUTH: BASE_URL + '/auth',
    WORK: BASE_URL + '/works',
    AUDIO: BASE_URL + '/files/audio/',
    STATISTIC: BASE_URL + '/statistics',
    VOICES: BASE_URL + '/voices',
    PAYMENT: BASE_URL + '/payment',
    GPT: BASE_URL + '/gpt/decode',
    ENVIRONMENT: BASE_URL + '/environment'
}

export const ENDPOINTS = {
    USERS: {
        GET_iNFO: async (url: string) => {
            return await axios({
                url: url,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            })
            .then((res: AxiosResponse<UserInfo>)=>{
                return res.data
            })
            .catch((err: any)=>{
                throw err
            })
        },
        GET_iNFO_ALL: async () => {
            return await axios({
                url: ENDPOINTS_URL.USERS + '/all',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            })
            .then((res: AxiosResponse<UserInfoExtended[]>)=>{
                return res.data
            })
            .catch((err: any)=>{
                throw err
            })
        },
        UPDATE_INFO: (data: { name?: ProfileForm['FormName']['name'], password?: ProfileForm['FormPassword']['password'], old_password?: ProfileForm['FormPassword']['old_password']}) => {
            return axios({
                url: ENDPOINTS_URL.USERS,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                data: data.name ? { "name": data.name } : data.password ? { "password": data.password, "old_password": data.old_password } : console.error('Введите данные')
            })
        },
        UPDATE_EMAIL: (email: string) => {
            return axios({
                url: ENDPOINTS_URL.USERS + '/email',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                data: { "email": email }
            })
        },
        UPDATE_EMAIL_CONFIRM: (data: ProfileForm['FormEmail']) => {
            return axios({
                url: ENDPOINTS_URL.USERS + '/email/confirm',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
                url: ENDPOINTS_URL.AUTH + '/signup',
                method: 'POST',
                data: data
            })
        },
        SIGNUP_CONFIRM: (data: RegistrationForm) => {
            return axios({
                url: ENDPOINTS_URL.AUTH + '/signup/confirm',
                method: 'POST',
                data: data
            })
        },
        LOGIN: (data: LoginForm) => {
            return axios({
                url: ENDPOINTS_URL.AUTH + '/login',
                method: 'POST',
                data: data
            })
        },
        FORGOT_PASSWORD: (data: FogotPasswordForm) => {
            return axios({
                url: ENDPOINTS_URL.AUTH + '/forgot_password',
                method: 'POST',
                data: data
            })
        },
        FORGOT_PASSWORD_CONFIRM: (data: FogotPasswordForm) => {
            return axios({
                url: ENDPOINTS_URL.AUTH + '/forgot_password/confirm',
                method: 'POST',
                data: data
            })
        }
    },
    WORK: {
        GET_WORKS: async (url: string) => {
            return await axios({
                url: url,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            })
            .then((res: AxiosResponse<ResponseWork[]>)=>{
                return res.data
            })
            .catch((err: any)=>{
                throw err
            })
        },
        GET_WORK_ID: (id: number) => {
            return axios({
                url: `${BASE_URL}/works/${id}`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
        },
        CREATE_WORK: (data: CreateWorks) => {
            return axios({
                url: BASE_URL + '/works',
                method: 'POST',
                headers: {
                    Authorization: getToken()? `Bearer ${getToken()}` : undefined,
                },
                data: data
            })
        },
        UPDATE_WORK: (id: number, data: UpdateWorks) => {
            return axios({
                url: `${BASE_URL}/works/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                data: data
            })
        },
        DELETE_WORK: (id: number) => {
            return axios({
                url: `${BASE_URL}/works/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
        },
    },
    AUDIO: {
        GET_FILE: ENDPOINTS_URL.AUDIO
    },
    STATISTIC: {
        GET_STATISTIC: async ({startDate, endDate, url}: {startDate?: Date, endDate?: Date, url: string}) => {
            return await axios({
                url: url,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
            .then((res: AxiosResponse<ResponseStatistic>)=>{
                return res.data
            })
            .catch((err: any)=>{
                throw err
            })
        },
        UPDATE_STATISTIC: () => {
            return axios({
                url: ENDPOINTS_URL.STATISTIC + '/visit',
                method: 'POST',
            })
        },
    },
    VOICES: {
        GET_VOICES: () => {
            return axios({
                url: ENDPOINTS_URL.VOICES,
                method: 'GET',
            })
        }
    },
    PAYMENT: {
        SET_PAYMENT: (data: PaymentParams) => {
            return axios({
                url: ENDPOINTS_URL.PAYMENT,
                method: 'POST',
                data: data,
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            })
        },
        GET_HISTORY: async ({startDate, endDate, url}: {startDate?: Date, endDate?: Date, url: string}) => {
            return await axios({
                url: url,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
            .then((res: AxiosResponse<ResponsesHistory[]>)=>{
                return res.data
            })
            .catch((err: any)=>{
                throw err
            })
        },
        GET_PAYMENT_ID: (id: string) => {
            return axios({
                url: ENDPOINTS_URL.PAYMENT + `/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            })
        }
    },
    GPT: {
        REMOVE_ABBREVIATIONS: (text: string) => {
            return axios({
                url: ENDPOINTS_URL.GPT + '/abbreviations',
                method: 'POST',
                data: {
                    text: text
                }
            })
        },
        REMOVE_NUMBERS: (text: string) => {
            return axios({
                url: ENDPOINTS_URL.GPT + '/numbers',
                method: 'POST',
                data: {
                    text: text
                }
            })
        }
    },
    ENVIRONMENT: {
        GET_ALL: async () => {
            return await axios({
                url: ENDPOINTS_URL.ENVIRONMENT,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            })
            .then((res: AxiosResponse<ResponseEnvironment[]>)=>{
                return res.data
            })
            .catch((err: any)=>{
                throw err
            })
        },
        UPDATE: ( data: ResponseEnvironment) => {
            return axios({
                url: ENDPOINTS_URL.ENVIRONMENT,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                data: data
            })
        },
    }

}
