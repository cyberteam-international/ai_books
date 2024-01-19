'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import { ContextUser } from "@/utils/context"
import { UserInfo } from "@/utils/interface"
import { ENDPOINTS } from "@/utils/config"
import { AxiosResponse } from "axios"

export default function ContextLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [userInfo, setUserInfo] = useState<UserInfo>()

    useEffect(() => {
        if (!userInfo && Cookies.get('token')) {
            ENDPOINTS.USERS.GET_iNFO()
            .then((res: AxiosResponse<UserInfo>) => {
                setUserInfo(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
        console.log('userInfo', userInfo)
    }, [userInfo])

    useEffect(()=>{
        ENDPOINTS.STATISTIC.UPDATE_STATISTIC()
    }, [])

    return (
        <ContextUser.Provider value={[userInfo, setUserInfo]}>
            {children}
        </ContextUser.Provider>
    )
}