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
            title: 'Виталий',
            gender: 'Мужской',
            audio: 'Vitaliy.mp3',
        },
        {
            title: 'Джейн',
            gender: 'Женский',
            audio: 'Jane.mp3',
        },
        {
            title: 'Омаж',
            gender: 'Женский',
            audio: 'Omazh.mp3',
        },
        {
            title: 'Ермил',
            gender: 'Мужской',
            audio: 'Ermil.mp3',
        },
        {
            title: 'Захар',
            gender: 'Мужской',
            audio: 'Zahar.mp3',
        },
        {
            title: 'Алёна',
            gender: 'Женский',
            audio: 'Alena.mp3',
        },
        {
            title: 'Филипп',
            gender: 'Мужской',
            audio: 'Filipp.mp3',
        },
        {
            title: 'Оксана',
            gender: 'Женский',
            audio: 'Oksana.mp3',
        },
        {
            title: 'Татьяна',
            gender: 'Женский',
            audio: 'Tatiana.mp3',
        },
        {
            title: 'Омаж',
            gender: 'Женский',
            audio: 'Omazh.mp3',
        },
    ],
    [
        {
            title: 'Ермил',
            gender: 'Мужской',
            audio: 'Ermil.mp3',
        },
        {
            title: 'Захар',
            gender: 'Мужской',
            audio: 'Zahar.mp3',
        },
        {
            title: 'Алёна',
            gender: 'Женский',
            audio: 'Alena.mp3',
        },
        {
            title: 'Филипп',
            gender: 'Мужской',
            audio: 'Filipp.mp3',
        },
        {
            title: 'Оксана',
            gender: 'Женский',
            audio: 'Oksana.mp3',
        },
        {
            title: 'Джейн',
            gender: 'Женский',
            audio: 'Jane.mp3',
        },
        {
            title: 'Омаж',
            gender: 'Женский',
            audio: 'Omazh.mp3',
        },
        {
            title: 'Ермил',
            gender: 'Мужской',
            audio: 'Ermil.mp3',
        },
        {
            title: 'Юрий',
            gender: 'Мужской',
            audio: 'Yuriy.mp3',
        },
        {
            title: 'Алёна',
            gender: 'Женский',
            audio: 'Alena.mp3',
        },
    ],
    [
        {
            title: 'Джейн',
            gender: 'Женский',
            audio: 'Jane.mp3',
        },
        {
            title: 'Захар',
            gender: 'Мужской',
            audio: 'Zahar.mp3',
        },
        {
            title: 'Алёна',
            gender: 'Женский',
            audio: 'Alena.mp3',
        },
        {
            title: 'Филипп',
            gender: 'Мужской',
            audio: 'Filipp.mp3',
        },
        {
            title: 'Ермил',
            gender: 'Мужской',
            audio: 'Ermil.mp3',
        },
        {
            title: 'Оксана',
            gender: 'Женский',
            audio: 'Oksana.mp3',
        },
        {
            title: 'Джейн',
            gender: 'Женский',
            audio: 'Jane.mp3',
        },
        {
            title: 'Виктория',
            gender: 'Женский',
            audio: 'Victoria.mp3',
        },
        {
            title: 'Захар',
            gender: 'Мужской',
            audio: 'Zahar.mp3',
        },
        {
            title: 'Алёна',
            gender: 'Женский',
            audio: 'Alena.mp3',
        },
    ],[
        {
            title: 'Юрий',
            gender: 'Мужской',
            audio: 'Yuriy.mp3',
        },
       {
            title: 'Анна',
            gender: 'Женский',
            audio: 'Anna.mp3',
        },
        {
            title: 'Александр',
            gender: 'Мужской',
            audio: 'Aleksandr.mp3',
        },
        {
            title: 'Артемий',
            gender: 'Мужской',
            audio: 'Artemiy.mp3',
        },
        {
            title: 'Елена',
            gender: 'Женский',
            audio: 'Elena.mp3',
        },
        {
            title: 'Евгений',
            gender: 'Мужской',
            audio: 'Evgeniy.mp3',
        },
        {
            title: 'Ирина',
            gender: 'Женский',
            audio: 'Irina.mp3',
        },
        {
            title: 'Павел',
            gender: 'Мужской',
            audio: 'Pavel.mp3',
        },
        {
            title: 'Арина',
            gender: 'Женский',
            audio: 'Arina.mp3',
        },
        {
            title: 'Татьяна',
            gender: 'Женский',
            audio: 'Tatiana.mp3',
        }
    ]
]