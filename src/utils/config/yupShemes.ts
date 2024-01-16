import * as Yup from 'yup'
import { LoginForm, CreateWorks, PaymentForm, ProfileForm, RegistrationForm } from '../interface'

const phone_REG_EXP = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
// ----------
export const SchemaProfileName: Yup.ObjectSchema<ProfileForm['FormName']> = Yup.object({
    old_name: Yup.string().required('Поле "Имя" обязательно для заполнения'),
    name: Yup.string().notOneOf([Yup.ref('old_name')], 'Введите имя, отличное от текущего').required('Поле "Имя" обязательно для заполнения'),
})

export const SchemaProfileEmail: Yup.ObjectSchema<ProfileForm['FormEmail']> = Yup.object({
    old_email: Yup.string().email('Некорректный адрес электронной почты').required('Поле "Почта" обязательно для заполнения'),
    email: Yup.string().email('Некорректный адрес электронной почты').notOneOf([Yup.ref('old_email')], 'Введите почту, отличную от текущей').required('Поле "Почта" обязательно для заполнения'),
    code: Yup.string().required('Поле "Код подверждения" обязательно для заполнения'),
})

export const SchemaProfilePassword: Yup.ObjectSchema<ProfileForm['FormPassword']> = Yup.object({
    old_password: Yup.string().required('Поле "Пароль" обязательно для заполнения'),
    password: Yup.string().min(6, 'Пароль должен содержать минимум 6 символов').notOneOf([Yup.ref('old_password')], 'Введите пароль, отличный от текущего').required('Поле "Пароль" обязательно для заполнения'),
    confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Пароли должны совпадать').required('Подтвердите пароль'),
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

export const SchemaTextArea: Yup.ObjectSchema<{input_text: CreateWorks['input_text']}> = Yup.object({
    input_text: Yup.string().required('Заполните поле').max(5000, 'Введите не более 5000 символов')
})
// ----------
export const SchemaRegistration: Yup.ObjectSchema<RegistrationForm> = Yup.object({
    email: Yup.string().email('Некорректный адрес электронной почты').required('Поле "Почта" обязательно для заполнения'),
    name: Yup.string().required('Поле "Имя" обязательно для заполнения'),
    password: Yup.string().min(6, 'Пароль должен содержать минимум 6 символов').required('Поле "Пароль" обязательно для заполнения'),
    code: Yup.string().min(5, 'Некорректный код подтверждения').max(5, 'Некорректный код подтверждения')
})
// ----------
export const SchemaLogin: Yup.ObjectSchema<LoginForm> = Yup.object({
    email: Yup.string().email('Некорректный адрес электронной почты').required('Поле "Почта" обязательно для заполнения'),
    password: Yup.string().required('Поле "Пароль" обязательно для заполнения'),
})


