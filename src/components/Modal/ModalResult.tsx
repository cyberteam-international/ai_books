import Delete from '@UI/delete';
import Button from '@UI/button';
import { PlayerModal } from '@UI/audioPlayer';

import style from './style.module.scss'

export const ModalResult = () => {
    
    return (
        <div className={style.modal__result}>
            <p className={style.modal__title}>Результат</p>
            <PlayerModal/>
            <div className={style.modal__result__options}>
                <Delete callback={()=>console.log('ModalResult удалить')}>
                    <p>Удалить</p>
                </Delete>
                <Button callback={()=>console.log('ModalResult скачать')}>Скачать</Button>
            </div>
        </div>
    );
}
