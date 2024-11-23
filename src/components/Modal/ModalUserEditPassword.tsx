import style from './style.module.scss'
import styleForm from './ModalCreateVoice.module.scss'
import {useState} from "react";
import {ENDPOINTS} from "@utils/config";
import Loading from "@/app/loading";

type Props = {
	onSubmit: () => void
	id?: number
};

export const ModalUserEditPassword = ({onSubmit, id}: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const sendForm = (e: any) => {
		e.preventDefault()

		if(id) {
			const formData = new FormData(e.target)
			setIsLoading(true)

			ENDPOINTS.USERS.UPDATE_INFO_ADMIN({
				id: id,
				password: formData.get('password')?.toString() || '',
			})
				.then(() => {
					onSubmit()
					setIsLoading(false)
				})
				.catch(err => {
					console.error(err)
					setIsLoading(false)
				})
		}
	}

	return (
		<form onSubmit={sendForm} className={style.modal__error}>
			<>
				<p className={style.modal__title}>Изменить пароль</p>

				<input
					className={styleForm.input}
					placeholder='Пароль *'
					name="password"
					required={true}
				/>

				<button className={styleForm.button} type='submit'>
					{isLoading ? <Loading/> : 'Изменить'}
				</button>
			</>
		</form>
	);
}