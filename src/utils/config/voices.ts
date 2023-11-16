import { StaticImageData } from "next/image"

import ru_img from '@public/languages/ru.svg'
import by_img from '@public/languages/by.svg'
import kz_img from '@public/languages/kz.svg'
import bg_img from '@public/languages/bg.svg'
import hu_img from '@public/languages/hu.svg'
import gr_img from '@public/languages/gr.svg'
import dk_img from '@public/languages/dk.svg'
import id_img from '@public/languages/id.svg'
import es_img from '@public/languages/es.svg'
import it_img from '@public/languages/it.svg'
import cn_img from '@public/languages/cn.svg'
import kr_img from '@public/languages/kr.svg'
import fr_img from '@public/languages/fr.svg'

enum VoiceValue {
    'ru',
    'by',
    'kz',
    'bg',
    'hu',
    'gr',
    'dk',
    'id',
    'es',
    'it',
    'cn',
    'kr',
    'fr',
}

type Voices = {
    img: StaticImageData,
    title: string,
    value: keyof typeof VoiceValue,
}

export const VOICES: Voices[] = [
    {
        img: ru_img,
        title: 'Русский',
        value: 'ru'
    },
    {
        img: by_img,
        title: 'Беларускі',
        value: 'by'
    },
    {
        img: kz_img,
        title: 'Қазақша',
        value: 'kz'
    },
    {
        img: bg_img,
        title: 'Български',
        value: 'bg'
    },
    {
        img: hu_img,
        title: 'Magyar',
        value: 'hu'
    },
    {
        img: gr_img,
        title: 'Ελληνική',
        value: 'gr'
    },
    {
        img: dk_img,
        title: 'Dansk',
        value: 'dk'
    },
    {
        img: id_img,
        title: 'Японский',
        value: 'id'
    },
    {
        img: es_img,
        title: 'Испанский',
        value: 'es'
    },
    {
        img: it_img,
        title: 'Итальянский',
        value: 'it'
    },
    {
        img: cn_img,
        title: 'Китайский',
        value: 'cn'
    },
    {
        img: kr_img,
        title: 'Корейский',
        value: 'kr'
    },
    {
        img: fr_img,
        title: 'Французкий',
        value: 'fr'
    },
]