import {CSSProperties, useEffect, useState} from "react";
import { CSSTransition } from "react-transition-group";

import style from "./style.module.scss";

type Props = {
    message: string | undefined;
    setMesage: (val: string | undefined) => void,
};

export const ModalMessage = ({ message, setMesage }: Props) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { 
        if (message) {
            setIsMounted(true)
        }
    }, [message]);

    useEffect(() => {
        if (isMounted) {
            const timeoutId = setTimeout(() => {
                setIsMounted(false);
                setMesage(undefined)
            }, 5000);
            return () => {
                clearTimeout(timeoutId);
            };
        }
        else setMesage(undefined)
    }, [isMounted])

    return (
        <CSSTransition
            in={isMounted}
            unmountOnExit
            className={style.message}
            timeout={300}
            classNames={{
                enter: `${style.message} ${style.message_enter}`,
                enterActive: `${style.message} ${style.message_enter_active}`,
                enterDone: `${style.message}`,
                exit: `${style.message} ${style.message_exit}`,
                exitActive: `${style.message} ${style.message_exit_active}`,
            }}
        >
            <div>
                <p>{message}</p>
                <button onClick={() => {
                    setIsMounted(false)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M8 8L23 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M23 8L8 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </CSSTransition>
    );
}
