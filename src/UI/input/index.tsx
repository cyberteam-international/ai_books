import { InputHTMLAttributes, ReactNode, useState, forwardRef, FC, Ref, Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { ChangeHandler } from "react-hook-form";
import Image from "next/image";

import password_eye_open from '@public/password_eye_open.svg'
import password_eye_close from '@public/password_eye_close.svg'
import checkmark from '@public/checkmark.svg'

import style from './style.module.scss'

type Props = {
    label?: string,
    name: string,
    placeholder?: string,
    type?: 'email' | 'text' | 'password' | 'number',
    error?: string | undefined,
    status?: 'active' | 'disable',
    onChange?: ChangeHandler,
    onBlur?: ChangeHandler,
    onSubmit?: () => void,
    children?: ReactNode,
    touched: boolean | undefined,
    ref?: Ref<any>,
    value?: string | number | readonly string[] | undefined,
    className?: string,
    defaultValue?: string | number | readonly string[] | undefined
};

const Input: FC<Props> = forwardRef((
    {
        label,
        placeholder,
        type,
        name,
        children,
        onChange,
        onBlur,
        status = 'active',
        error,
        onSubmit,
        touched,
        value,
        className,
        defaultValue
    }, ref): JSX.Element => {

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

    return (
        <div className={clsx(style.input, style[`input_${status}`], className)}>
            <div className={style.input__wrapper}>
                {label && (
                    <label className={style.input__label} htmlFor={name}>{label}</label>
                )}
                {type === 'password' && (
                    <>
                        {!passwordVisible ? (
                            <Image
                                className={style.input__toggle}
                                onClick={() => setPasswordVisible(true)}
                                {...password_eye_open}
                                alt="toggle password visible"
                            />
                        ) : (
                            <Image
                                className={style.input__toggle}
                                onClick={() => setPasswordVisible(false)}
                                {...password_eye_close}
                                alt="toggle password visible"
                            />
                        )}
                    </>
                )}
                <input
                    className={clsx(style.input__field, style[`input__field_${type}`], error && style.input__field_error)}
                    readOnly={status === 'disable'}
                    name={name}
                    value={value}
                    id={name}
                    type={type === 'password' ? passwordVisible ? 'text' : type : type}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    onSubmit={onSubmit}
                    defaultValue={defaultValue}
                />
                <div className={style.input__children}>{children}</div>
                {!error && touched && status !== 'disable' && !children &&
                    <Image className={style.input__success} onClick={onSubmit} {...checkmark} alt="submit" />
                }
            </div>
            {error && <p className={style.input__error}>{error}</p>}
        </div>
    )
})

export default Input;