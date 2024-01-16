import axios from "axios"
import Cookies from "js-cookie"
import { CreateWorks, LoginForm, ProfileForm, RegistrationForm, UpdateWorks } from "../interface"

const BASE_URL = process.env.BACKEND_URL

const token = Cookies.get('token')

export type Statistics = {
    start_date?: {
        year: string | number,
        day: string | number,
        month: string | number,
    },
    end_date?: {
        year: string | number,
        day: string | number,
        month: string | number,
    },
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
        GET_STATISTIC: (start_date: Statistics['start_date']=undefined, end_date: Statistics['end_date']=undefined) => {
            const setParams = () => {
                const paramsObject: {start_date: string | undefined, end_date: string | undefined} = {
                    start_date: undefined,
                    end_date: undefined
                }
                if (start_date) {
                    paramsObject.start_date = start_date.day? `${start_date.year}-${start_date.month}-${start_date.day}` : undefined
                }
                if (end_date) {
                    paramsObject.end_date = end_date.day? `${end_date.year}-${end_date.month}-${end_date.day}` : undefined
                }
                return paramsObject
            }
            return axios({
                url: BASE_URL + '/statistics',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: setParams()
            })
        },
        UPDATE_STATISTIC: () => {
            return axios({
                url: BASE_URL + '/statistics/visit',
                method: 'POST',
            })
        },
    }
}
