enum gender{
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
            title: 'Омаз',
            gender: 'Мужской',
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
            title: 'Джейн',
            gender: 'Женский',
            audio: 'Jane.mp3',
        },
        {
            title: 'Омаз',
            gender: 'Мужской',
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
            title: 'Омаз',
            gender: 'Мужской',
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
            title: 'Омаз',
            gender: 'Мужской',
            audio: 'Omazh.mp3',
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
    ]
]