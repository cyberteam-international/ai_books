import axios from "axios"
import Cookies from "js-cookie"
import { CreateWorks, LoginForm, ProfileForm, RegistrationForm, UpdateWorks } from "../interface"

const BASE_URL = process.env.BACKEND_URL

const token = Cookies.get('token')

export const ENDPOINTS = {
    USERS: {
        GET_iNFO: () => {
            return axios({
                url: BASE_URL + '/users',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        },
        UPDATE_INFO: (data: { name?: ProfileForm['FormName']['name'], password?: ProfileForm['FormPassword']['password'] }) => {
            return axios({
                url: BASE_URL + '/users',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: data.name ? { "name": data.name } : data.password ? { "password": data.password } : console.error('Введите данные')
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
                    Authorization: `Bearer ${token}`,
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
}
