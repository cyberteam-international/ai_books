export interface IModel {
    title: string,
    inputValue: string,
    value: string
}

export const MODELS: IModel[] = [
    {
        title: 'gpt-4o',
        inputValue: 'gpt-4o',
        value: 'gpt-4o'
    },
    {
        title: 'gpt-4-turbo',
        inputValue: 'gpt-4-turbo',
        value: 'gpt-4-turbo'
    },
    {
        title: 'gpt-4',
        inputValue: 'gpt-4',
        value: 'gpt-4'
    },
    {
        title: 'gpt-3.5-turbo',
        inputValue: 'gpt-3.5-turbo',
        value: 'gpt-3.5-turbo'
    },
    {
        title: 'gpt-4-turbo-preview',
        inputValue: 'gpt-4-turbo-preview',
        value: 'gpt-4-turbo-preview'
    },
    {
        title: 'gpt-4-1106-preview',
        inputValue: 'gpt-4-1106-preview',
        value: 'gpt-4-1106-preview'
    },
    {
        title: 'gpt-3.5-turbo-16k',
        inputValue: 'gpt-3.5-turbo-16k',
        value: 'gpt-3.5-turbo-16k'
    },
]