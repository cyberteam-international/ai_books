import style from './style.module.scss'
import styleForm from './ModalCreateVoice.module.scss'
import {useState} from "react";
import {ENDPOINTS} from "@utils/config";
import Loading from "@/app/loading";

type Props = {
	onSubmit: () => void
	id?: number
};

export const ModalUserEditRole = ({onSubmit, id}: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const sendForm = (e: any) => {
		e.preventDefault()

		if(id) {
			const formData = new FormData(e.target)
			setIsLoading(true)

			const role = formData.get('role')?.toString()
			if(role) {
				ENDPOINTS.USERS.UPDATE_INFO_ADMIN({
					id: id,
					role: role,
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
	}

	return (
		<form onSubmit={sendForm} className={style.modal__error}>
			<>
				<p className={style.modal__title}>Изменить роль</p>

				<select name="role" className={styleForm.select} required={true}>
					<option value="admin">Админ</option>
					<option value="editor">Редактор</option>
					<option value="company">Компания</option>
					<option value="employee">Сотрудник</option>
					<option value="user" selected={true}>Пользователь</option>
				</select>

				<button className={styleForm.button} type='submit'>
					{isLoading ? <Loading/> : 'Изменить'}
				</button>
			</>
		</form>
	);
}