import { Banks } from "@utils/interface";

import bank_card from '@public/bank_card.svg'
import mir_pay from '@public/mir_pay.svg'
import you_money from '@public/you_money.svg'
import tinkoff from '@public/tinkoff.svg'
import spb from '@public/SPB.svg'

export const BANKS: Banks[] = [
    {
        title: 'Банковская карта',
        inputValue: 'Банковская карта',
        value: 'bank',
        img: bank_card,
    },
    {
        title: 'Mir Pay',
        inputValue: 'Mir Pay',
        value: 'bank',
        img: mir_pay,
    },
    {
        title: 'ЮMoney',
        inputValue: 'ЮMoney',
        value: 'mobile',
        img: you_money,
    },
    {
        title: 'Tinkoff Pay',
        inputValue: 'Tinkoff Pay',
        value: 'bank',
        img: tinkoff,
    },
    {
        title: 'СБП (Система быстрых платежей)',
        inputValue: 'СБП',
        value: 'mobile',
        img: spb,
    },
]

export const BANKS_BULLETS = [
    1000,
    2000,
    5000,
    10000,
]