import {LanguageValue} from "./Languages"

export type ResponseWork = {
    id: number,
    name: string,
    lang: string,
    voice: string,
    input_text: string,
    completed_file: string,
    created_at: Date,
    completed_seconds: number,
}

export type Message = {
    created_at: string
    files: string[] | null
    id: number
    is_reply: true
    sender: { id: number }
    text: string | null
    url: string | null
    updated_at: string
    is_image : boolean
}

export type ResponseMessageCreate = {
    reqMessage: Message
    resMessage: Message
}

export type ResponseStatistic = {
    number_visits: number,
    clicks_voice_button: number,
    number_voiced_characters: number,
    number_voiced_characters_tinkoff: number,
    number_voiced_characters_elevenlabs: number,
    number_payments: number,
    amount_payments: number,
    number_repeated_payments: number,
    unique_number_visits: number,
    cost_price: number,
    cost_price_tinkoff: number,
    cost_price_elevenlabs: number,
    gpt_request_tokens: number,
    gpt_request_price: number,
    gpt_response_tokens: number,
    gpt_response_price: number
    number_voices_created_all: number
    number_voices_created: number
}

export type ResponseVoices = {
    gender: 1 | 0,
    lang: keyof typeof LanguageValue,
    target: string,
    voice: string,
    voiceRu: string
}[]

export type ResponsesHistory = {
    id: number,
    amount: string,
    currency: string,
    created_at: string
}

export type ResponsePayment = {
    id: string,
    link: string
}

export type ResponseEnvironment = {
    key: "SPLIT_REQUEST_SYMBOLS" | "PRICE_PER_SYMBOL" | "PRICE_PER_SYMBOL_COST" | "GPT_DECODE_NUMBERS_PROMPT" | "GPT_ABBREVIATIONS_PROMPT" | "GPT_PRICE_INPUT" | "GPT_PRICE_OUTPUT",
    value: number | string
}



