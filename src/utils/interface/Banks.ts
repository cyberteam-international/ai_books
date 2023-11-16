import { SelectValue } from "./SelectValue";


enum BanksType{
    'bank',
    'mobile',
}

export interface Banks extends SelectValue {
    value: keyof typeof BanksType,
}