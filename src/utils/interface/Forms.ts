export type LoginForm = {
    email: string,
    password: string
}

export type PaymentForm = {
    FormBank: {
        card_number: string,
        day_year: string,
        cvv: string,
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
        password: string,
        confirm_password: string,
    }
}

export type RegistrationForm = {
    email: string,
    name: string,
    password: string
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