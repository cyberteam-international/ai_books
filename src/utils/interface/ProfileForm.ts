export type ProfileForm = {
    FormName: {
        name: string,
        new_name: string,
    },
    FormEmail: {
        email: string,
        new_email: string,
        confirm_email: string
    },
    FormPassword: {
        password: string,
        new_password: string,
        confirm_password: string,
    }
}