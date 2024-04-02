import {CSSProperties, Dispatch, ReactNode, SetStateAction} from 'react';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group'

import close_modal from '@public/close_modal.svg'

import style from './style.module.scss'

type Props = {
    state: [boolean, Dispatch<SetStateAction<boolean>>],
    children: ReactNode,
    styles?: CSSProperties
};

export const ModalWrapper = ({state, children, styles}: Props) => {

    const [modalOpenState, setModalOpenState] = state

    return (
        <CSSTransition 
            in={modalOpenState}
            unmountOnExit
            timeout={300}
            className={style.modal}
            classNames={{
                enter: style.modal_enter,
                enterActive: style.modal_enter_active,
                exit: style.modal_exit,
                exitActive: style.modal_exit_active,
            }}
        >
            <div className={style.modal__block} style={styles}>
                <Image 
                    className={style.modal__close} 
                    onClick={()=>setModalOpenState(false)} 
                    {...close_modal} 
                    alt='close modal'
                />
                {children}
            </div>
        </CSSTransition>
    );
}
