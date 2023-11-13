import { StaticImageData } from "next/image";


export type SelectProps = {
    value: {
        type: 'bank' | 'mobile',
        title: string,
    } | undefined
    onChange: (value: SelectProps['value'])=>void,
    placeholder: string,
    options: {
        title: string,
        value: string,
        img: StaticImageData,
        type: 'bank' | 'mobile',
    }[]
};