import { StaticImageData } from "next/image";
import { SelectValue } from "./SelectValue";


enum BanksType{
    'bank',
    'mobile',
}

export interface Banks extends SelectValue {
    img: StaticImageData,
    value: keyof typeof BanksType,
}