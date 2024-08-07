import style from './style.module.scss'
import styleForm from './ModalCreateVoice.module.scss'
import {useState} from "react";
import {ENDPOINTS} from "@utils/config";
import clsx from "clsx";
import Image from "next/image";
import icon_trash from "@public/icon_trash.svg";
import Loading from "@/app/loading";

type Props = {
    onSubmit: () => void
};

export const ModalCreateVoice = ({onSubmit}: Props) => {
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const sendForm = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const valid = onValid()

        if (valid) {
            setIsLoading(true)

            ENDPOINTS.VOICES.CREATE_VOICE(formData)
                .then(() => {
                    onSubmit()
                    setIsLoading(false)
                })
                .catch(err => {
                    console.error(err)
                })
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

    function isAudio(type: string) {
        switch (type) {
            case 'audio/mpeg':
            case 'audio/webm':
            case 'audio/aac':
            case 'audio/basic':
            case 'audio/L24':
            case 'audio/mp4':
            case 'audio/ogg':
            case 'audio/vorbis':
            case 'audio/x-ms-wma':
            case 'audio/x-ms-wax':
            case 'audio/vnd.rn-realaudio':
            case 'audio/vnd.wave':
                return true;
        }
        return false;
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
            if (!isAudio(files[i].type)) {
                setError('Недопустимый формат файла.')
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
                <input accept="audio/*" type="file" id="file" name="files" multiple={true}
                       onChange={(e) => {
                           // @ts-ignore
                           const files = Array.from(e.target['files'])
                           setFiles(files)
                           setError('')
                       }}/>
                <label htmlFor="file">Прикрепить аудиофайлы *</label>
                {error && <p className={styleForm.inputFile__span_error}>{error}</p>}
                {files.length <= 0 && <p className={styleForm.inputFile__text}>
                    Пока ничего не загружено. Загрузите аудиосэмплы голоса, которые вы хотите использовать для обучения.<br/><br/>

                    Качество сэмплов важнее, чем их количество. Шумные сэмплы могут привести к плохим результатам.
                    При воспроизведении звука продолжительностью более 5 минут улучшения будут незначительными.
                </p>}
                {files.map((file) => {
                    return <span>
                        {file.name}
                        <button type={"button"} onClick={() => onDelete(file)}><Image {...icon_trash}
                                                                                      alt='reset textarea'/></button>
                    </span>
                })}


            </div>

            <button className={styleForm.button} type='submit'>
                {isLoading ? <Loading/> : 'Создать'}
            </button>
        </form>
    );
}