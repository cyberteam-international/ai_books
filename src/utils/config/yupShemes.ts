import * as Yup from 'yup'
import { LoginForm, CreateWorks, PaymentForm, ProfileForm, RegistrationForm, FogotPasswordForm } from '../interface'
import isEmail from 'validator/lib/isEmail';

const phone_REG_EXP = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const password_REG_EXP = /^[a-zA-Z0-9_*:^!@"#№$;%?&()-+=.,/|']+$/
// ----------
export const SchemaProfileName: Yup.ObjectSchema<ProfileForm['FormName']> = Yup.object({
    old_name: Yup.string().required('Поле "Имя" обязательно для заполнения'),
    name: Yup.string().notOneOf([Yup.ref('old_name')], 'Введите имя, отличное от текущего').max(50, 'Введите не более 50 символов').required('Поле "Имя" обязательно для заполнения'),
})

export const SchemaProfileEmail: Yup.ObjectSchema<ProfileForm['FormEmail']> = Yup.object({
    old_email: Yup.string().test('is-email', 'Некорректный адрес электронной почты', (value) => {
        return isEmail(String(value));
    }).required('Поле "Почта" обязательно для заполнения'),
    email: Yup.string().test('is-email', 'Некорректный адрес электронной почты', (value) => {
        return isEmail(String(value));
    }).notOneOf([Yup.ref('old_email')], 'Введите почту, отличную от текущей').required('Поле "Почта" обязательно для заполнения'),
    code: Yup.string().required('Поле "Код подверждения" обязательно для заполнения'),
})

export const SchemaProfilePassword: Yup.ObjectSchema<ProfileForm['FormPassword']> = Yup.object({
    old_password: Yup.string().required('Поле "Пароль" обязательно для заполнения'),
    password: Yup.string().min(6, 'Пароль должен содержать минимум 6 символов').matches(password_REG_EXP, 'Некорректный пароль').notOneOf([Yup.ref('old_password')], 'Введите пароль, отличный от текущего').required('Поле "Пароль" обязательно для заполнения'),
    confirm_password: Yup.string().matches(password_REG_EXP, 'Некорректный пароль').oneOf([Yup.ref('password')], 'Пароли должны совпадать').required('Подтвердите пароль'),
})
// ----------
export const SchemaPaymentAmountValue = Yup.string().required('Поле обязательно').matches(/^\d+(\.\d+)?$/, 'Введите число')

export const SchemaPaymentBank: Yup.ObjectSchema<PaymentForm['FormBank']> = Yup.object({
    card_number: Yup.string().matches(/[0-9]{16}/, 'Введите 16 цифр карты банка').min(16, 'Введите 16 цифр карты банка').max(16, 'Введите 16 цифр карты банка').required('Заполните поле'),
    month: Yup.string().min(2, 'Введите месяц').max(2, 'Введите месяц').required('Заполните поле'),
    year: Yup.string().min(2, 'Введите год').max(2, 'Введите год').required('Заполните поле'),
    cvv: Yup.string().min(3, 'Введите CVV код').matches(/[0-9]{3}/, 'Введите CVV код').max(3, 'Введите CVV код').required('Заполните поле')
})

export const SchemaPaymentMobile: Yup.ObjectSchema<PaymentForm['FormMobile']> = Yup.object({
    phone: Yup.string().required('Заполните поле').matches(phone_REG_EXP, 'Введите корректный номер')
})
// ----------
export const SchemaTextArea: Yup.ObjectSchema<{input_text: CreateWorks['input_text']}> = Yup.object({
    input_text: Yup.string().required('Заполните поле').test('max-length', 'Введите не более ${max} символов', function(value) {
        const max = this.options.context?.maxCharacterCount; // Получение значения maxCharacterCount из контекста
        return value.length <= max;
    })
})
// ----------
export const SchemaRegistration: Yup.ObjectSchema<RegistrationForm> = Yup.object({
    email: Yup.string().test('is-email', 'Некорректный адрес электронной почты', (value) => {
        return isEmail(String(value));
    }).required('Поле "Почта" обязательно для заполнения'),
    name: Yup.string().required('Поле "Имя" обязательно для заполнения').max(50, 'Введите не более 50 символов'),
    password: Yup.string().matches(password_REG_EXP, 'Некорректный пароль').min(6, 'Пароль должен содержать минимум 6 символов').required('Поле "Пароль" обязательно для заполнения'),
    code: Yup.string().min(5, 'Некорректный код подтверждения').max(5, 'Некорректный код подтверждения')
})
// ----------
export const SchemaLogin: Yup.ObjectSchema<LoginForm> = Yup.object({
    email: Yup.string().test('is-email', 'Некорректный адрес электронной почты', (value) => {
        return isEmail(String(value));
    }).required('Поле "Почта" обязательно для заполнения'),
    password: Yup.string().required('Поле "Пароль" обязательно для заполнения'),
})
// ----------
export const SchemaFogotPassword: Yup.ObjectSchema<FogotPasswordForm> = Yup.object({
    email: Yup.string().test('is-email', 'Некорректный адрес электронной почты', (value) => {
        return isEmail(String(value));
    }).required('Поле "Почта" обязательно для заполнения'),
    confirm_password: Yup.string().matches(password_REG_EXP, 'Некорректный пароль').oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
    code: Yup.string().min(5, 'Некорректный код подтверждения').max(5, 'Некорректный код подтверждения'),
    password: Yup.string().matches(password_REG_EXP, 'Некорректный пароль').min(6, 'Пароль должен содержать минимум 6 символов'),
})


