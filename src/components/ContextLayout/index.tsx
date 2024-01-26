'use client'

import { useEffect } from "react"

import { ENDPOINTS } from "@/utils/config"

export default function ContextLayout({
    children,
}: {
    children: React.ReactNode
}) {

    useEffect(()=>{
        ENDPOINTS.STATISTIC.UPDATE_STATISTIC()
    }, [])

    return children
}