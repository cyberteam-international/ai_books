import style from './style.module.scss'
import styleForm from './ModalCreateVoice.module.scss'
import {useState} from "react";
import {ENDPOINTS} from "@utils/config";

type Props = {
    onSubmit: () => void
};

export const ModalCreateVoice = ({onSubmit}: Props) => {
    const [files, setFiles] = useState<File[]>([])
    const sendForm = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        ENDPOINTS.VOICES.CREATE_VOICE(formData)
            .then()
            .catch(err => {
                console.error(err)
            })

        onSubmit()
    }
    return (
        <form onSubmit={sendForm} className={style.modal__error}>
            <p className={style.modal__title}>Создать голос</p>

            <input
                className={styleForm.input}
                placeholder='Название *'
                name="name"
                required={true}
            />

            <div className={styleForm.inputFile}>
                <input type="file" id="file" name="files" multiple={true} onChange={(e) => {
                    // @ts-ignore
                    const files = Array.from(e.target['files'])
                    setFiles(files)
                }}/>
                <label htmlFor="file">Прикрепить аудиофайлы</label>
                {files.map((file) => {
                    return <span>{file.name}</span>
                })}
            </div>

            <button className={styleForm.button} type='submit'>Создать</button>
        </form>
    );
}