'use client'

import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { ROUTES } from '@/utils/config';

import Button from '@/UI/button';
import {FormName, FormEmail, FormPassword} from '@/UI/forms/profile';

import style from './style.module.scss'

import { ContextUser } from '@/utils/context';

export default function PageProfile() {

    const { mutate } = useContext(ContextUser)

    const router = useRouter()

    const handleLogout = async() => {
        Cookies.remove('token')
        await mutate(undefined).then(()=>{
            return router.push(ROUTES.LOGIN);
        })
    }

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
            <Button className={style.profile__exit} callback={()=>{handleLogout()}}>Выход</Button>
        </main>
    );
}
