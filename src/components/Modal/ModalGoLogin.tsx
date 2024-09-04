import { FontUnbounded } from "@/fonts";
import Link from 'next/link';
import s from './style.module.scss'
import { ROUTES } from '@/utils/config';

type Props = {
	
};

export const ModalGoLogin = ({}: Props) => {
	return (
		<div className={`${s.gologin}`}>
			<p className={`${s.gologin__text} ${FontUnbounded.className}`}>
				Чтобы создать свой голос, необходимо авторизоваться
			</p>
			<div className={`${s.gologin__buttons}`}>
				<Link className={`${s.gologin__button}`} href={ROUTES.LOGIN}><span>Авторизоваться</span></Link>
				<Link className={`${s.gologin__button}`} href={ROUTES.REGISTRATION}><span>Создать аккаунт</span></Link>
			</div>
		</div>
	);
}