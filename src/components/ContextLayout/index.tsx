// 'use client'

// import { useEffect } from "react"

// import { ENDPOINTS } from "@/utils/config"

// export default function ContextLayout({
//     children,
// }: {
//     children: React.ReactNode
// }) {

//     useEffect(()=>{
//         ENDPOINTS.STATISTIC.UPDATE_STATISTIC()
//     }, [])

//     return children
// }


'use client'

import { useEffect } from "react"
import { ENDPOINTS } from "@/utils/config"
import { useGETUser } from "@/utils/hooks"
import { ContextUser } from "@/utils/context"

export default function ContextLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const user = useGETUser()

    useEffect(()=>{
        ENDPOINTS.STATISTIC.UPDATE_STATISTIC()
    }, [])

    return (
        <ContextUser.Provider value={user}>
            {children}
        </ContextUser.Provider>
    )
}