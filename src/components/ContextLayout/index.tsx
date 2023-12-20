'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import { ContextUser } from "@/utils/context"
import { UserInfo } from "@/utils/interface"

export default function ContextLayout({
	children,
}: {
	children: React.ReactNode
}) {

    const [userInfo, setUserInfo] = useState<UserInfo>()

    useEffect(()=>{
        const user = Cookies.get('user')
        if (user) {
            setUserInfo(JSON.parse(user) as UserInfo)
        }
    }, [])

	return (
        <ContextUser.Provider value={[userInfo, setUserInfo]}>
            {children}
        </ContextUser.Provider>
    )
}