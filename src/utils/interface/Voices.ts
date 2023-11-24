import { SelectValue } from "./SelectValue";

enum VoiceValue {
    'Алиса',
    'Василий Уткин',
    'Ольга Бузова',
    'Олег',
    'Дмитрий Оленин',
    'Алла Довлатова',
}

export interface Voices extends SelectValue {
    title: string,
    value: keyof typeof VoiceValue,
    audio: string,
}