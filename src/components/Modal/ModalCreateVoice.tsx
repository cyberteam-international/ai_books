import style from './style.module.scss'
import styleForm from './ModalCreateVoice.module.scss'
import {useState} from "react";
import {ENDPOINTS} from "@utils/config";
import clsx from "clsx";
import Image from "next/image";
import icon_trash from "@public/icon_trash.svg";

type Props = {
    onSubmit: () => void
};

export const ModalCreateVoice = ({onSubmit}: Props) => {
    const [files, setFiles] = useState<File[]>([])
    const [error, setError] = useState<string>('')

    const sendForm = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const valid = onValid()

        if (valid) {
            ENDPOINTS.VOICES.CREATE_VOICE(formData)
                .then()
                .catch(err => {
                    console.error(err)
                })
            onSubmit()
        }
    }

    const onDelete = (file: File) => {
        setFiles((prevState) => {
            return prevState?.filter((s) => {
                return s !== file
            }) || []
        })

        setError('')
    }

    const onValid = () => {
        if (files.length <= 0) {
            setError('Выберите аудиофайлы')
            return false
        }

        if (files.length > 20) {
            setError('Аудиофайлов не может быть больше 20')
            return false
        }

        for (let i = 0; i < files.length; i++) {
            if(files[i].type !== "audio/mpeg") {
                setError('Загрузите только .mp3 файлы')
                return false
            }
        }

        setError('')
        return true
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

            <div className={clsx(styleForm.inputFile, error && styleForm.inputFile__error)}>
                <input accept=".mp3" type="file" id="file" name="files" multiple={true}
                       onChange={(e) => {
                           // @ts-ignore
                           const files = Array.from(e.target['files'])
                           setFiles(files)
                           setError('')
                       }}/>
                <label htmlFor="file">Прикрепить аудиофайлы *</label>
                {error && <p className={styleForm.inputFile__span_error}>{error}</p>}
                {files.map((file) => {
                    return <span>
                        {file.name}
                        <button type={"button"} onClick={() => onDelete(file)}><Image {...icon_trash}
                                                                                      alt='reset textarea'/></button>
                    </span>
                })}


            </div>

            <button className={styleForm.button} type='submit'>Создать</button>
        </form>
    );
}