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
	"number_visits": Number,
	"clicks_voice_button": Number,
	"number_voiced_characters": Number,
	"number_payments": Number,
	"amount_payments": Number,
	"number_repeated_payments": Number,
	"unique_number_visits": Number
}