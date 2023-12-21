'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import { ContextUser } from "@/utils/context"
import { UserInfo } from "@/utils/interface"
import axios from "axios"
import { ENDPOINTS } from "@/utils/config"

export default function ContextLayout({
	children,
}: {
	children: React.ReactNode
}) {

    const [userInfo, setUserInfo] = useState<UserInfo>()

    useEffect(()=>{
        axios({
            ...ENDPOINTS.USERS.GET_iNFO,
        })
        .then((res)=>{
            setUserInfo(res.data as UserInfo)
        }).catch(err => {
            console.log(err)
        })
    }, [])

	return (
        <ContextUser.Provider value={[userInfo, setUserInfo]}>
            {children}
        </ContextUser.Provider>
    )
}