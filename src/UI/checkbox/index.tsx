import clsx from "clsx";

import style from './style.module.scss'

import { FC, ReactNode, Ref, forwardRef, useState } from "react";
import { ChangeHandler } from "react-hook-form";

type Props = {
    name: string,
    onChange?: ChangeHandler,
    onBlur?: ChangeHandler,
    onSubmit?: () => void,
    children?: ReactNode,
    touched?: boolean | undefined,
    ref?: Ref<any>,
    value?: boolean
};

const CheckBox: FC<Props> = forwardRef((
    {
        name,
        children,
        onChange,
        onBlur,
        touched,
        value
    }, ref): JSX.Element => {

    return (
        <div className={style.checkbox}>
            <input
                hidden
                type="checkbox"
                name={name}
                checked={value}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
            />
            <label htmlFor={name}>
                {value &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7464 0.274437L3.58641 7.18444L1.68641 5.15444C1.33641 4.82444 0.786406 4.80444 0.386406 5.08444C-0.00359413 5.37444 -0.113594 5.88444 0.126406 6.29444L2.37641 9.95444C2.59641 10.2944 2.97641 10.5044 3.40641 10.5044C3.81641 10.5044 4.20641 10.2944 4.42641 9.95444C4.78641 9.48444 11.6564 1.29444 11.6564 1.29444C12.5564 0.374437 11.4664 -0.435563 10.7464 0.264437V0.274437Z" fill="url(#paint0_linear_1037_6460)" />
                        <defs>
                            <linearGradient id="paint0_linear_1037_6460" x1="6.27951" y1="9.91695" x2="0.0142166" y2="1.09051" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#7313BE" />
                                <stop offset="0.935927" stop-color="#2BFBBC" />
                            </linearGradient>
                        </defs>
                    </svg>
                }
            </label>
            {children}
        </div>
    )
})

export default CheckBox
