enum gender {
    'Мужской',
    'Женский'
}

export type DataVoices = {
    title: string,
    gender: keyof typeof gender,
    audio: string
}

export const data: DataVoices[][] = [
    [
        {
            title: 'Алёна',
            gender: 'Женский',
            audio: 'Alena.mp3',
        },
        {
            title: 'Джейн',
            gender: 'Женский',
            audio: 'Jane.mp3',
        },
        {
            title: 'Маша',
            gender: 'Женский',
            audio: 'Masha.mp3',
        },
        {
            title: 'Оксана',
            gender: 'Женский',
            audio: 'Oksana.mp3',
        },
        {
            title: 'Юлия',
            gender: 'Женский',
            audio: 'Julia.mp3',
        },
    ],
    [
        {
            title: 'Александр',
            gender: 'Мужской',
            audio: 'Alexander.mp3',
        },
        {
            title: 'Ермил',
            gender: 'Мужской',
            audio: 'Ermil.mp3',
        },
        {
            title: 'Филипп',
            gender: 'Мужской',
            audio: 'Filipp.mp3',
        },
        {
            title: 'Мадирус',
            gender: 'Мужской',
            audio: 'Madirus.mp3',
        },
        {
            title: 'Захар',
            gender: 'Мужской',
            audio: 'Zahar.mp3',
        },
    ],
    [
        {
            title: 'Омаж',
            gender: 'Женский',
            audio: 'Omazh.mp3',
        },
        {
            title: 'Томару',
            gender: 'Женский',
            audio: 'Tomaru.mp3',
        },
        {
            title: 'Лера',
            gender: 'Женский',
            audio: 'Lera.mp3',
        },
        {
            title: 'Алёна',
            gender: 'Женский',
            audio: 'Alena.mp3',
        },
        {
            title: 'Даша',
            gender: 'Женский',
            audio: 'Dasha.mp3',
        },
    ],[
        {
            title: 'Алёна',
            gender: 'Женский',
            audio: 'Alena.mp3',
        },
        {
            title: 'Оксана',
            gender: 'Женский',
            audio: 'Oksana.mp3',
        },
        {
            title: 'Захар',
            gender: 'Мужской',
            audio: 'Zahar.mp3',
        },
        {
            title: 'Оксана',
            gender: 'Женский',
            audio: 'Oksana.mp3',
        },
        {
            title: 'Маша',
            gender: 'Женский',
            audio: 'Masha.mp3',
        },
    ]
]