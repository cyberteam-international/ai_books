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
        value: 'bank_card',
        img: bank_card,
    },
    {
        title: 'Mir Pay',
        inputValue: 'Mir Pay',
        value: 'bank_card',
        img: mir_pay,
    },
    {
        title: 'ЮMoney',
        inputValue: 'ЮMoney',
        value: 'yoo_money',
        img: you_money,
    },
    {
        title: 'Tinkoff Pay',
        inputValue: 'Tinkoff Pay',
        value: 'tinkoff_bank',
        img: tinkoff,
    },
    {
        title: 'СБП (Система быстрых платежей)',
        inputValue: 'СБП',
        value: 'sbp',
        img: spb,
    },
]

export const BANKS_BULLETS = [
    1000,
    2000,
    5000,
    10000,
]