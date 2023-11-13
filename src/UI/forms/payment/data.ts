import { SelectProps } from "@utils/interface";

import bank_card from '@public/bank_card.svg'
import mir_pay from '@public/mir_pay.svg'
import you_money from '@public/you_money.svg'
import tinkoff from '@public/tinkoff.svg'
import spb from '@public/SPB.svg'

export const selectOptions: SelectProps['options'] = [
    {
        title: 'Банковская карта',
        value: 'Банковская карта',
        type: 'bank',
        img: bank_card,
    },
    {
        title: 'Mir Pay',
        value: 'Mir Pay',
        type: 'bank',
        img: mir_pay,
    },
    {
        title: 'ЮMoney',
        value: 'ЮMoney',
        type: 'mobile',
        img: you_money,
    },
    {
        title: 'Tinkoff Pay',
        value: 'Tinkoff Pay',
        type: 'bank',
        img: tinkoff,
    },
    {
        title: 'СБП (Система быстрых платежей)',
        value: 'СБП',
        type: 'mobile',
        img: spb,
    },
]

export const amountOptions = [
    1000,
    2000,
    5000,
    10000,
]