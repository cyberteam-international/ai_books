

import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = {
    type?: 'button' | 'submit',
    children: ReactNode,
    callback?: () => void,
    className?: string,
};

export default function Button({ children, callback, type='button', className }: Props) {
    return (
        <button 
            className={clsx(className)}
            onClick={callback}
            type={type}
        >
            {children}
        </button>
    );
}
