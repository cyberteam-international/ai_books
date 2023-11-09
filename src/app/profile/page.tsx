import clsx from 'clsx';

import {FormName, FormEmail, FormPassword} from '@/UI/forms/profile';

import style from './style.module.scss'

export default function PageProfile() {

    return (
        <main className={clsx(style.profile, 'container')}>
            <div className={style.profile__wrapper}>
                <p className={style.profile__wrapper__title}>Личные данные</p>
                <FormName/>
            </div>
            <div className={style.profile__wrapper}>
                <p className={style.profile__wrapper__title}>Данные входа</p>
                <FormEmail/>
                <FormPassword/>
            </div>
        </main>
    );
}
