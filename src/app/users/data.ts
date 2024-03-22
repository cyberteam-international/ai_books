import { SelectValue } from "@/utils/interface/SelectValue"

export enum filter {
    'name',
    'id',
    'email',
    'created_at',
}

export enum filterType {
    'up',
    'down',
}

export interface IDataFilter extends SelectValue {
    filter: keyof typeof filter,
    filterType: keyof typeof filterType,
}

export const filterOptionsMyAudio: IDataFilter[] = [
    {
        title: 'По имени А-Я',
        inputValue: 'Сортировка: по имени А-Я',
        filter: 'name',
        filterType: 'down',
    },
    {
        title: 'По имени Я-А',
        inputValue: 'Сортировка: по имени Я-А',
        filter: 'name',
        filterType: 'up',
    },
    {
        title: 'По возрастанию id',
        inputValue: 'Сортировка: по возрастанию id',
        filter: 'id',
        filterType: 'up',
    },
    {
        title: 'По убыванию id',
        inputValue: 'Сортировка: по убыванию id',
        filter: 'id',
        filterType: 'down',
    },
    {
        title: 'По почте A-Z',
        inputValue: 'Сортировка: по почте A-Z',
        filter: 'email',
        filterType: 'down',
    },
    {
        title: 'По почте Z-A',
        inputValue: 'Сортировка: по почте Z-A',
        filter: 'email',
        filterType: 'up',
    },
    {
        title: 'Сначала новые',
        inputValue: 'Сортировка: сначала новые',
        filter: 'created_at',
        filterType: 'down',
    },
    {
        title: 'Сначала старые',
        inputValue: 'Сортировка: сначала старые',
        filter: 'created_at',
        filterType: 'up',
    },
]