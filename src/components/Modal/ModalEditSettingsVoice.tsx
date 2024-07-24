import style from './style.module.scss'
import styleForm from './ModalEditSettingsVoice.module.scss'
import {ENDPOINTS} from "@utils/config";
import {useEffect, useState} from "react";

export interface IDataEditSettingsVoice {
    id: number,
    stability: number,
    similarity_boost: number,
    style?: number,
    use_speaker_boost?: boolean,
}

type Props = {
    onSubmit: () => void,
    id?: number
};

export const ModalEditSettingsVoice = ({onSubmit, id}: Props) => {
    const [data, setData] = useState<IDataEditSettingsVoice>()
    const sendForm = (e: any) => {
        if (data) {
            e.preventDefault()
            const formData = new FormData(e.target)

            const stability = formData.get('stability')
            const similarity_boost = formData.get('similarity_boost')
            const style = formData.get('style')
            const use_speaker_boost = formData.get('use_speaker_boost')

            ENDPOINTS.VOICES.EDIT_VOICE_SETTINGS(data.id, {
                id: data.id,
                stability: stability ? parseInt(stability.toString()) : 0,
                similarity_boost: similarity_boost ? parseInt(similarity_boost.toString()) : 0,
                style: style ? parseInt(style.toString()) : 0,
                use_speaker_boost: use_speaker_boost === "on",
            })
                .then()
                .catch(err => {
                    console.error(err)
                })

            onSubmit()
        }
    }

    useEffect(() => {
        if (id) {
            ENDPOINTS.VOICES.GET_BY_VOICE_SETTINGS(id).then((res) => {
                setData(res.data)
            })
        }
    }, [id]);

    return (
        <form onSubmit={sendForm} className={style.modal__error}>
            <p className={style.modal__title}>Настройки голоса</p>

            {data ? <>
                <input
                    className={styleForm.input}
                    type={"number"}
                    placeholder='Cтабильность *'
                    name="stability"
                    defaultValue={data.stability}
                    required={true}
                />

                <input
                    className={styleForm.input}
                    type={"number"}
                    placeholder='Повышение сходства *'
                    name="similarity_boost"
                    defaultValue={data.similarity_boost}
                    required={true}
                />

                <input
                    className={styleForm.input}
                    type={"number"}
                    placeholder='Стиль'
                    name="style"
                    defaultValue={data.style}
                />

                <label className={styleForm.checkbox}>
                    <input
                        type={"checkbox"}
                        name="use_speaker_boost"
                        defaultChecked={data.use_speaker_boost}
                    />
                    <span>Использовать усиление громкоговорителя</span>
                </label>

                <button className={styleForm.button} type='submit'>Сохранить</button>
            </> : <p className={styleForm.loader}>Загрузка настроек...</p>}
        </form>
    );
}