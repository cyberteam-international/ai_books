import { SelectValue } from "@/utils/interface/SelectValue"

export interface IDataMyAudio{
    src: string,
    trackName: string,
    voiceName: string,
    dateAdd: Date
}

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

export const dataMyAudio: IDataMyAudio[] = [
    {
        src: 'test_audio.mp3',
        trackName: 'Название 1',
        voiceName: 'Олег',
        dateAdd: new Date(2023, 10, 13),
    },
    {
        src: 'test_audio.mp3',
        trackName: 'Название 2',
        voiceName: 'Ольга Бузова',
        dateAdd: new Date(2023, 10, 14),
    },
    {
        src: 'test_audio.mp3',
        trackName: 'Название 3',
        voiceName: 'Алла Довлатова',
        dateAdd: new Date(2023, 10, 15),
    },
    {
        src: 'test_audio.mp3',
        trackName: 'Название 4',
        voiceName: 'Алиса',
        dateAdd: new Date(2023, 10, 16),
    },
    {
        src: 'test_audio.mp3',
        trackName: 'Название 5',
        voiceName: 'Василий Уткин',
        dateAdd: new Date(2023, 10, 17),
    },
    {
        src: 'test_audio.mp3',
        trackName: 'Название 6',
        voiceName: 'Ольга Бузова',
        dateAdd: new Date(2023, 10, 18),
    },
    {
        src: 'test_audio.mp3',
        trackName: 'Название 7',
        voiceName: 'Алла Довлатова',
        dateAdd: new Date(2023, 10, 19),
    },
    {
        src: 'test_audio.mp3',
        trackName: 'Название 8',
        voiceName: 'Алиса',
        dateAdd: new Date(2023, 10, 20),
    },
    {
        src: 'test_audio.mp3',
        trackName: 'Название 9',
        voiceName: 'Василий Уткин',
        dateAdd: new Date(2023, 10, 21),
    },
    {
        src: 'test_audio.mp3',
        trackName: 'Название 10',
        voiceName: 'Алиса',
        dateAdd: new Date(2023, 10, 22),
    },
    {
        src: 'test_audio.mp3',
        trackName: 'Название 11',
        voiceName: 'Алла Довлатова',
        dateAdd: new Date(2023, 10, 23),
    },
]

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