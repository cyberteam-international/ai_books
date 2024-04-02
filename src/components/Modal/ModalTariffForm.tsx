import style from './style.module.scss'
import styleForm from './ModalTariffForm.module.scss'
import {useState} from "react";
import {ENDPOINTS} from "@utils/config";

type Props = {
    onSubmit: () => void
};

export const ModalTariffForm = ({onSubmit}: Props) => {
    const [files, setFiles] = useState<File[]>([])
    const sendForm = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        ENDPOINTS.AUTH.SEND({
            email: formData.get('email') || '',
            name: formData.get('name') || '',
            file: files[0]
        })
            .then(res => {
                onSubmit()
            })
            .catch(err => {
                console.error(err)
            })
    }
    return (
        <form onSubmit={sendForm} className={style.modal__error}>
            <p className={style.modal__title}>Озвучивание<br/>
                для издательств</p>

            <input
                className={styleForm.input}
                placeholder='Имя *'
                name="name"
                required={true}
            />
            <input
                className={styleForm.input}
                placeholder='E-mail *'
                type="email"
                name="email"
                required={true}
            />

            <div className={styleForm.inputFile}>
                <input type="file" id="file" name="file" onChange={(e) => {
                    // @ts-ignore
                    const files = Array.from(e.target['files'])
                    setFiles(files)
                }}/>
                <label htmlFor="file">Прикрепить файл (необязательно)</label>
                {files.map((file) => {
                    return <span>{file.name}</span>
                })}
            </div>

            <button className={styleForm.button} type='submit'>Получить предложение</button>

            <p className={styleForm.caption}>Нажимая на кнопку ”Получить предложение”, Вы подтверждаете свое согласие
                с <a
                    href="/policy">Политикой конфиденциальности</a></p>
        </form>
    );
}