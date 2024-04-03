"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export function Metrika() {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        (function () {
            const PM_YM_COUNTER = 92974650;
            //@ts-ignore
            if (typeof window.ym != 'undefined') {
                //@ts-ignore
                ym(PM_YM_COUNTER, 'hit', window.location.href);
            } else {
                console.log('Метрика не инициализирована');
            }
        })();
    }, [pathName, searchParams]);
    return (
        <Script id="yandex-metrika">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
						m[i].l=1*new Date();
						for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
						k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
						(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
			
						ym(92974650, "init", {
						clickmap:true,
						trackLinks:true,
						accurateTrackBounce:true,
						webvisor:true
					});`}
        </Script>
    );
}