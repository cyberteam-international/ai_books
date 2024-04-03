"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {YMInitializer} from "react-yandex-metrika";
import ym from 'react-yandex-metrika';

export function Metrika() {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        ym('hit', window.location.href);
    }, [pathName, searchParams]);
    return (
        <YMInitializer accounts={[92974650]} options={{webvisor: true, defer: true}} />
    );
}