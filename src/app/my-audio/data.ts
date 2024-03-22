import { SelectValue } from "@/utils/interface/SelectValue"

export enum filter {
    'name',
    'voice',
    'date',
    'time',
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
        title: 'По названию А-Я',
        inputValue: 'Сортировка: по названию А-Я',
        filter: 'name',
        filterType: 'down',
    },
    {
        title: 'По названию Я-А',
        inputValue: 'Сортировка: по названию Я-А',
        filter: 'name',
        filterType: 'up',
    },
    {
        title: 'По голосу озвучки',
        inputValue: 'Сортировка: по голосу озвучки',
        filter: 'voice',
        filterType: 'up',
    },
    {
        title: 'Сначала новые',
        inputValue: 'Сортировка: сначала новые',
        filter: 'date',
        filterType: 'down',
    },
    {
        title: 'Сначала старые',
        inputValue: 'Сортировка: сначала старые',
        filter: 'date',
        filterType: 'up',
    },
    {
        title: 'Сначала короткие',
        inputValue: 'Сортировка: сначала короткие',
        filter: 'time',
        filterType: 'up',
    },
    {
        title: 'Сначала длинные',
        inputValue: 'Сортировка: сначала длинные',
        filter: 'time',
        filterType: 'down',
    },
]