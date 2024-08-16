import style from './style.module.scss'
import {useEffect, useState} from "react";
import SliderComponent from "@UI/SliderComponent";
import Typography from "@mui/material/Typography";
import SwitchComponent from "@UI/SwitchComponent";
import {Voices} from "@utils/interface";
import {MyVoice} from "@utils/interface/MyVoice";
import clsx from "clsx";
import Image from "next/image";
import close_icon from "../../../../public/close_white.svg";
import {FontOnest} from "@/fonts";

export interface SettingsDefault {
    stability?: number
    similarity_boost?: number
    style?: number
    use_speaker_boost?: boolean
    speed?: number
    pitchShift?: number
    role?: string
}

type Props = {
    onSettings: (settings: SettingsDefault) => void;
    voice?: Voices,
    myVoice?: MyVoice
};

export default function WorkSettings({onSettings, voice, myVoice}: Props) {
    const [stability, setStability] = useState<number>(50);
    const [similarity, setSimilarity] = useState<number>(75);
    const [styleExaggeration, setStyleExaggeration] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(100);
    const [pitchShift, setPitchShift] = useState<number>(0);
    const [role, setRole] = useState<number>(0);
    const [dynamicBoost, setDynamicBoost] = useState<boolean>(true);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setSettings()
    }, [stability, similarity, styleExaggeration, dynamicBoost, speed, pitchShift, role, voice, myVoice]);

    function setSettings() {
        const roleArr = getRoleVoices(voice?.value)

        if(myVoice?.value) {
            onSettings({
                stability: stability / 100 || 0.5,
                similarity_boost: similarity / 100 || 0.75,
                style: styleExaggeration / 100 || 0,
                use_speaker_boost: dynamicBoost || true
            })
        }

        if(isYandex(voice?.value) && !myVoice?.value) {
            onSettings({
                speed: speed / 100 || undefined,
                pitchShift: pitchShift || undefined,
                role: getRoleValue(roleArr[role] || "") || undefined
            })
        }
    }

    function isYandex(voice?: string) {
        const yandexVoices = [
            'marina', "dasha", "lera", "masha", "julia", "alexander", "anton", "kirill", "b1gs9a5ant07jps2s9d8", "jane", "omazh", "filipp", "madi", "amira", "nigora", "john", "lea", "naomi"
        ]
        return voice ? yandexVoices.indexOf(voice) !== -1 : false
    }

    function getRoleValue(role: string) {
        switch (role) {
            case 'Модерн': return 'modern';
            case 'Нейтральный': return 'neutral';
            case 'Добрый': return 'good';
            case 'Злой': return 'evil';
            case 'Дружелюбный': return 'friendly';
            case 'Классический': return 'classic';
            case 'Строгий': return 'strict';
            case 'Шепот': return 'whisper';
            default: return role;
        }
    }

    function getRoleVoices(voice?: string) {
        switch (voice) {
            case 'naomi': return ['Модерн', 'Классический'];
            case 'alena': return ['Нейтральный', 'Добрый'];
            case 'ermil': return ['Нейтральный', 'Добрый'];
            case 'jane': return ['Нейтральный', 'Добрый', 'Злой'];
            case 'omazh': return ['Нейтральный', 'Злой'];
            case 'dasha': return ['Нейтральный', 'Добрый', 'Дружелюбный'];
            case 'julia': return ['Нейтральный', 'Строгий'];
            case 'lera': return ['Нейтральный', 'Дружелюбный'];
            case 'masha': return ['Добрый', 'Строгий', 'Дружелюбный'];
            case 'marina': return ['Нейтральный', 'Шепот', 'Дружелюбный'];
            case 'alexander': return ['Нейтральный', 'Добрый'];
            case 'kirill': return ['Нейтральный', 'Строгий', 'Добрый'];
            case 'anton': return ['Нейтральный', 'Добрый'];
            default: return [];
        }
    }

    return (
        <div className={clsx(style.settings, (!isYandex(voice?.value) && !myVoice?.value) && style.settings__not)}>
            <p className={style.settings__title} onClick={() => setIsOpen(!isOpen)}>Настройки озвучки</p>
            <div className={clsx(style.settings__wrapper, isOpen && style.settings__wrapper__active)}>
                <Typography variant="h5" sx={{color: '#fff', textAlign: 'left', padding: '0 10px', fontWeight: '400', fontFamily: FontOnest.style}} >
                    {myVoice?.value ? myVoice?.title : voice?.title}
                </Typography>

                <button className={clsx(style.settings__close)} onClick={() => setIsOpen(false)}><Image {...close_icon}/></button>

                {myVoice?.value && <>
                    <SliderComponent
                        title="Стабильность"
                        value={stability}
                        onChange={setStability}
                        leftLabel="вариативный"
                        rightLabel="стабильный"
                    />
                    <SliderComponent
                        title="Сходство"
                        value={similarity}
                        onChange={setSimilarity}
                        leftLabel="низкое"
                        rightLabel="высокое"
                    />
                    <SliderComponent
                        title="Преувеличение стиля"
                        value={styleExaggeration}
                        onChange={setStyleExaggeration}
                        leftLabel="нет"
                        rightLabel="преувеличено"
                    />

                    <SwitchComponent
                        label="Усилить динамик"
                        checked={dynamicBoost}
                        onChange={setDynamicBoost}
                    />
                </>}

                {(isYandex(voice?.value) && !myVoice?.value) && <>
                    {getRoleVoices(voice?.value).length > 0 && <SliderComponent
                        title="Характер"
                        value={role}
                        options={getRoleVoices(voice?.value)}
                        onChange={setRole}
                    /> }

                    <SliderComponent
                        title="Скорость"
                        value={speed}
                        onChange={setSpeed}
                        leftLabel="медленный"
                        rightLabel="быстрый"
                        min={10}
                        max={300}
                    />

                    <SliderComponent
                        title="Высота"
                        value={pitchShift}
                        onChange={setPitchShift}
                        leftLabel="ниже"
                        rightLabel="выше"
                        min={-1000}
                        max={1000}
                    />
                </>}
            </div>
        </div>
    );
}
