import { ResponseWork } from "."

export type UserInfo = {
    id: number,
    name: string,
    email: string,
    balance: number,
    is_admin?: Boolean
}

export interface UserInfoExtended extends UserInfo {
    password: string,
    passwordUnHashed: string,
    created_at: string,
    updated_at: string
}