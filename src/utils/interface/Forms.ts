export type LoginForm = {
    email: string,
    password: string
}

export type PaymentForm = {
    FormBank: {
        card_number: string,
        cvv: string,
        month: string,
        year: string,
    },
    FormMobile: {
        phone: string
    }
}

export type ProfileForm = {
    FormName: {
        old_name: string,
        name: string,
    },
    FormEmail: {
        old_email: string,
        email: string,
        code: string
    },
    FormPassword: {
        old_password: string,
        password: string,
        confirm_password: string,
    }
}

export type RegistrationForm = {
    email: string,
    name: string,
    password: string,
    code?: string
}

export type ResetPasswordForm = {
    email: string,
    password?: string,
    confirm_password?: string,
    code?: string
}

export type CreateWorks = {
    lang: string,
    voice: string,
    input_text: string,
    name?: string
}

export type UpdateWorks = {
    name: string
}