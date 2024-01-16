import { StaticImageData } from "next/image";
import { SelectValue } from "./SelectValue";

export enum LanguageValue {
    'ru-RU',
    'kk-KK',
    'de-DE',
    'he-IL',
    'en-US',
    'uz-UZ',
    // 'dk',
    // 'id',
    // 'es',
    // 'it',
    // 'cn',
    // 'kr',
    // 'fr',
}

export interface Languages extends SelectValue {
    img: StaticImageData,
    title: string,
    value: keyof typeof LanguageValue,
}