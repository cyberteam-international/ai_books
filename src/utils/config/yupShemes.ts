import * as Yup from 'yup'
import { PaymentForm, ProfileForm } from '../interface'

const phone_REG_EXP = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
// ----------
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
// ----------
export const SchemaPaymentAmountValue = Yup.string().required('Поле обязательно').matches(/^\d+(\.\d+)?$/, 'Введите число')

export const SchemaPaymentBank: Yup.ObjectSchema<PaymentForm['FormBank']> = Yup.object({
    card_number: Yup.string().matches(/[0-9]{16}/, 'Введите 16 цифр карты банка').min(16, 'Введите 16 цифр карты банка').max(16, 'Введите 16 цифр карты банка').required('Заполните поле'),
    day_year: Yup.string().min(4, 'Введите месяц и год').max(4, 'Введите месяц и год').required('Заполните поле'),
    cvv: Yup.string().min(3, 'Введите CVV код').matches(/[0-9]{3}/, 'Введите CVV код').max(3, 'Введите CVV код').required('Заполните поле')
})

export const SchemaPaymentMobile: Yup.ObjectSchema<PaymentForm['FormMobile']> = Yup.object({
    phone: Yup.string().required('Заполните поле').matches(phone_REG_EXP, 'Введите корректный номер')
})
// ----------


