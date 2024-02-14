import { LanguageValue } from "./Languages"

export type ResponseWork = {
	"id": number,
	"name": string,
	"lang": string,
	"voice": string,
	"input_text": string,
	"completed_file": string,
	"created_at": Date,
	"completed_seconds": number,
}

export type ResponseStatistic = {
	"number_visits": number,
	"clicks_voice_button": number,
	"number_voiced_characters": number,
	"number_payments": number,
	"amount_payments": number,
	"number_repeated_payments": number,
	"unique_number_visits": number,
	"cost_price": number,
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