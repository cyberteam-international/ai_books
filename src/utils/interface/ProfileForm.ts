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
        new_password: string,
        confirm_password: string,
    }
}