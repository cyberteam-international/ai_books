import style from './style.module.scss'
import styleForm from './ModalEditVoice.module.scss'
import {useEffect, useState} from "react";
import {ENDPOINTS} from "@utils/config";
import icon_trash from "@public/icon_trash.svg";
import Image from "next/image";

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
    const [_data, _setData] = useState<IDataEditVoice | undefined>(undefined)

    const sendForm = (e: any) => {
        if (_data) {
            e.preventDefault()
            const formData = new FormData(e.target)

            ENDPOINTS.VOICES.EDIT_VOICE(_data.id, formData)
                .then()
                .catch(err => {
                    console.error(err)
                })

            onSubmit()
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
        }
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
                {_data.samples && _data.samples.map((file) => {
                    return <span>
                        {file.file_name}
                        <button type={"button"} onClick={() => onDelete(file.sample_id)}><Image {...icon_trash}
                                                                                                alt='reset textarea'/></button>
                    </span>
                })}
            </div>

            <button className={styleForm.button} type='submit'>Сохранить</button>
        </form>
    );
}