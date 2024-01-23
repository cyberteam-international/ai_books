import { StaticImageData } from "next/image";
import { SelectValue } from "./SelectValue";


enum BanksType{
    'bank_card',
    'yoo_money',
    'sbp',
    'tinkoff_bank',
}

export interface Banks extends SelectValue {
    img: StaticImageData,
    value: keyof typeof BanksType,
}