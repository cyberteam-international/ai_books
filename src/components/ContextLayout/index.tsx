'use client'

import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"

import { ENDPOINTS, ROUTES } from "@/utils/config"

import { ContextUser } from "@/utils/context"
import { UserInfo } from "@/utils/interface"
import { usePathname } from "next/navigation"

export default function ContextLayout({
	children,
}: {
	children: React.ReactNode
}) {

    const [userInfo, setUserInfo] = useState<UserInfo>()

    const pathName = usePathname()

    console.log(pathName)

    useEffect(()=>{
        const token = Cookies.get('access_token')
        if (token) {
            axios({
                ...ENDPOINTS.USERS.GET_iNFO,
            }).then((res: AxiosResponse<UserInfo>) => {
                setUserInfo(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
        else if (pathName !== ROUTES.LOGIN && pathName !== ROUTES.REGISTRATION && pathName !== ROUTES.HOME){
            window.location.href = ROUTES.LOGIN
        }
    }, [pathName])

	return (
        <ContextUser.Provider value={[userInfo, setUserInfo]}>
            {children}
        </ContextUser.Provider>
    )
}