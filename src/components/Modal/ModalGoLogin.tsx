import Link from 'next/link';
import s from './style.module.scss'
import { ROUTES } from '@/utils/config';

type Props = {
	
};

export const ModalGoLogin = ({}: Props) => {
	return (
		<div className={`${s.gologin}`}>
			<p className={`${s.gologin__text}`}>Чтобы создать свой голос, необходимо авторизоваться</p>
			<div className={`${s.gologin__buttons}`}>
				<Link className={`${s.gologin__button}`} href={ROUTES.LOGIN}>Логин</Link>
				<Link className={`${s.gologin__button}`} href={ROUTES.REGISTRATION}>Регистрация</Link>
			</div>
		</div>
	);
}