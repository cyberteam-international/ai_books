import style from './style.module.scss'
import styleForm from './ModalEditVoice.module.scss'
import {useEffect, useState} from "react";
import {ENDPOINTS} from "@utils/config";
import icon_trash from "@public/icon_trash.svg";
import Image from "next/image";
import Loading from "@/app/loading";
import clsx from "clsx";

export interface IDataEditVoiceSample {
    file_name: string
    sample_id: string
}

export interface IDataEditVoice {
    id: number,
    name: string,
    samples?: IDataEditVoiceSample[]
}

type Props = {
    onSubmit: () => void,
    data?: IDataEditVoice
};

export const ModalEditVoice = ({onSubmit, data}: Props) => {
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [_data, _setData] = useState<IDataEditVoice | undefined>(undefined)
    const [error, setError] = useState<string>('')

    const sendForm = (e: any) => {
        if (_data) {
            e.preventDefault()
            const formData = new FormData(e.target)
            const valid = onValid()

            if (valid) {
                setIsLoading(true)

                ENDPOINTS.VOICES.EDIT_VOICE(_data.id, formData)
                    .then(() => {
                        onSubmit()
                        setIsLoading(false)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        }
    }
    const onDelete = (sample_id: string) => {
        if (_data) {

            _setData({
                id: _data.id,
                name: _data.name,
                samples: _data.samples?.filter((s) => {
                    return s.sample_id !== sample_id
                }) || [],
            })

            ENDPOINTS.VOICES.DELETE_SAMPLE(_data.id, sample_id)
                .then()
                .catch(err => {
                    console.error(err)
                })

            setError('')
        }
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

    useEffect(() => {
        _setData(data)
    }, [data]);

    return (
        _data && <form onSubmit={sendForm} className={style.modal__error}>
            <p className={style.modal__title}>Изменить голос</p>

            <input
                className={styleForm.input}
                placeholder='Название *'
                name="name"
                defaultValue={_data.name}
                required={true}
            />

            <div className={clsx(styleForm.inputFile, error && styleForm.inputFile__error)}>
                <input accept="audio/*" type="file" id="file" name="files" multiple={true} onChange={(e) => {
                    // @ts-ignore
                    const files = Array.from(e.target['files'])
                    setFiles(files)
                    setError('')
                }}/>
                <label htmlFor="file">Прикрепить аудиофайлы</label>
                {error && <p className={styleForm.inputFile__span_error}>{error}</p>}
                {files.map((file) => {
                    return <span>{file.name}</span>
                })}
                {_data.samples && _data.samples.map((file) => {
                    return <span>
                        {file.file_name}
                        <button type={"button"} onClick={() => onDelete(file.sample_id)}><Image {...icon_trash}
                                                                                                alt='reset textarea'/></button>
                    </span>
                })}
            </div>

            <button className={styleForm.button} type='submit'>
                {isLoading ? <Loading/> : 'Сохранить'}
            </button>
        </form>
    );
}