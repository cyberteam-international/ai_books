import { Languages } from '../interface'

import ru_img from '@public/languages/ru.svg'
import de_img from '@public/languages/de.png'
import en_img from '@public/languages/en.png'
import uz_img from '@public/languages/uz.png'
import kz_img from '@public/languages/kz.svg'
import hu_img from '@public/languages/hu.svg'
import he_img from '@public/languages/he.png'
// import bg_img from '@public/languages/bg.svg'
// import by_img from '@public/languages/by.svg'
// import gr_img from '@public/languages/gr.svg'
// import dk_img from '@public/languages/dk.svg'
// import id_img from '@public/languages/id.svg'
// import es_img from '@public/languages/es.svg'
// import it_img from '@public/languages/it.svg'
// import cn_img from '@public/languages/cn.svg'
// import kr_img from '@public/languages/kr.svg'
// import fr_img from '@public/languages/fr.svg'

export const LANGUAGES: Languages[] = [
    {
        img: ru_img,
        title: 'Русский',
        inputValue: 'Русский',
        value: 'ru-RU'
    },
    {
        img: en_img,
        title: 'English',
        inputValue: 'English',
        value: 'en-US'
    },
    {
        img: de_img,
        title: 'Deutsch',
        inputValue: 'Deutsch',
        value: 'de-DE'
    },
    {
        img: kz_img,
        title: 'Қазақша',
        inputValue: 'Қазақша',
        value: 'kk-KK'
    },
    {
        img: uz_img,
        title: "O'zbek",
        inputValue: "o'zbek",
        value: 'uz-UZ'
    },
    {
        img: he_img,
        title: 'עִברִית',
        inputValue: 'עִברִית',
        value: 'he-IL'
    },
]