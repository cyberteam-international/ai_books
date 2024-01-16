import { StaticImageData } from "next/image"

import rules_1 from '@public/rules_1.svg'
import rules_2 from '@public/rules_2.svg'
import rules_3 from '@public/rules_3.svg'

type RulesData = {
    img: StaticImageData,
    title: string,
    subtitle: string,
}

export const RulesData: RulesData[] = [
    {
        img: rules_1,
        title: 'Не иcпользуйте в тексте небуквенные символы',
        subtitle: 'Звездочки, решетки и т.п.',
    },
    {
        img: rules_2,
        title: 'При помощи знака Плюс, вы можете менять ударение',
        subtitle: 'Шалаш, или ша+лаш, замок или зам+ок',
    },
    {
        img: rules_3,
        title: 'Также можете делать паузы при помощи пунктира',
        subtitle: 'В турнире ----- примут участие 20 команд',
    },
]