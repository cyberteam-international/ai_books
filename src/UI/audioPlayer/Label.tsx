import Image from "next/image";

import change_white from '@public/change_white.svg'
import checkmark from '@public/checkmark_square.svg'

type Props = {
    isSubmit: boolean,
    htmlFor: string
};

export default function Label({ isSubmit, htmlFor }: Props) {

    return (
        <label htmlFor={htmlFor}>
            {isSubmit? <button type='submit'><Image {...checkmark}/></button> : <Image {...change_white} />}
        </label>
    )
}
