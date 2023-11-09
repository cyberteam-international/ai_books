import * as Yup from 'yup'
import { ProfileForm } from '../interface'

export const SchemaProfileName: Yup.ObjectSchema<ProfileForm['FormName']> = Yup.object({
    name: Yup.string().required('Поле "Имя" обязательно для заполнения'),
    new_name: Yup.string().notOneOf([Yup.ref('name')], 'Введите имя, отличное от текущего').required('Поле "Имя" обязательно для заполнения'),
})

export const SchemaProfileEmail: Yup.ObjectSchema<ProfileForm['FormEmail']> = Yup.object({
    email: Yup.string().email('Некорректный адрес электронной почты').required('Поле "Почта" обязательно для заполнения'),
    new_email: Yup.string().email('Некорректный адрес электронной почты').notOneOf([Yup.ref('email')], 'Введите почту, отличную от текущей').required('Поле "Почта" обязательно для заполнения'),
    confirm_email: Yup.string().required('Поле "Код подверждения" обязательно для заполнения'),
})

export const SchemaProfilePassword: Yup.ObjectSchema<ProfileForm['FormPassword']> = Yup.object({
    password: Yup.string().min(6, 'Пароль должен содержать минимум 6 символов').required('Поле "Пароль" обязательно для заполнения'),
    new_password: Yup.string().min(6, 'Пароль должен содержать минимум 6 символов').notOneOf([Yup.ref('password')], 'Введите пароль, отличный от текущего').required('Поле "Пароль" обязательно для заполнения'),
    confirm_password: Yup.string().oneOf([Yup.ref('new_password')], 'Пароли должны совпадать').required('Подтвердите пароль'),
})


