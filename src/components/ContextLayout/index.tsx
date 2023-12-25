'use client'

import { useEffect, useState } from "react"

import { ContextUser } from "@/utils/context"
import { UserInfo } from "@/utils/interface"
import { ENDPOINTS } from "@/utils/config"

export default function ContextLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [userInfo, setUserInfo] = useState<UserInfo>()

    useEffect(() => {
        if (!userInfo) {
            ENDPOINTS.USERS.GET_iNFO()
            .then((res) => {
                setUserInfo(res.data as UserInfo)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [userInfo])

    return (
        <ContextUser.Provider value={[userInfo, setUserInfo]}>
            {children}
        </ContextUser.Provider>
    )
}