import { ChangeHandler } from 'react-hook-form';
import clsx from 'clsx';
import { FC, Ref, forwardRef } from 'react';

import style from './style.module.scss'

type Props = {
    name: string,
    placeholder?: string,
    onChange?: ChangeHandler,
    onBlur?: ChangeHandler,
    touched: boolean | undefined,
    ref?: Ref<any>,
};

const TextArea: FC<Props> = forwardRef((
    {
        placeholder,
        name,
        onChange,
        onBlur,
        touched,
    }, ref) => {

    return (
        <div className={style.textarea}>
            <textarea 
                className={clsx(style.textarea__block, 'scroll')} 
                name={name}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                placeholder={placeholder}
            ></textarea>
        </div>
    );
})

export default TextArea
