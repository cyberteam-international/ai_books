import { StaticImageData } from "next/image";
import { SelectValue } from "./SelectValue";

enum LanguageValue {
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

export interface Languages extends SelectValue {
    img: StaticImageData,
    title: string,
    value: keyof typeof LanguageValue,
}