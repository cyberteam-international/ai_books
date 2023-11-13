export type PaymentForm = {
    FormBank: {
        card_number: string,
        day_year: string,
        cvv: string,
    },
    FormMobile: {
        phone: string
    }
}