import { SelectValue } from "./SelectValue";
import { LanguageValue } from "./Languages";

enum VoiceValue {
    'lea',
    'john',
    'naomi',
    'amira',
    'madi',
    'alena',
    'filipp',
    'ermil',
    'jane',
    'madirus',
    'omazh',
    'zahar',
    'dasha',
    'julia',
    'lera',
    'masha',
    'marina',
    'alexander',
    'kirill',
    'anton',
    'nigora',
}

export interface Voices extends SelectValue {
    title: string,
    value: keyof typeof VoiceValue,
    audio: string,
    language: keyof typeof LanguageValue,
}