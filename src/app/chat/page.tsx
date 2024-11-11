'use client'

import clsx from "clsx";
import style from './style.module.scss'
import React, {useCallback, useEffect, useState} from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loading from "@/app/loading";
import SliderComponent from "@UI/SliderComponent";
import Select from "@UI/select";
import {IModel, MODELS} from "@utils/config/models";
import {FontOnest} from "@/fonts";
import Typography from "@mui/material/Typography";
import {ENDPOINTS} from "@utils/config";
import {toast} from "react-toastify";

type Props = {};

interface IMessage {
    id: number,
    text: string | null
    files?: string[] | null
    position: 'left' | 'right'
}

export default function page({}: Props) {
    const CHECK_MESSAGE_TIMEOUT = 2000;

    const [messages, setMessages] = useState<IMessage[]>([])
    const [text, setText] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);

    const [models, setModels] = useState<IModel>(MODELS[0]);
    const [temperature, setTemperature] = useState<number>(1);
    const [topP, setTopP] = useState<number>(1);
    const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0);
    const [presencePenalty, setPresencePenalty] = useState<number>(0);

    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(true);


    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);

            const newArr = selectedFiles.filter((_file) => {
                const isSelected = files.findIndex((_file2) => _file.name === _file2.name && _file.size === _file2.size) !== -1;
                return !isSelected
            })

            setFiles([...files, ...newArr]); // Сохраняем загруженные файлы в состояние
        }
    };

    const handleRemoveFile = (file: File) => {
        setFiles(files.filter((s) => (s.name != file.name && s.size != file.size)));
    }

    function getInitialLocalStoreSlider(key: string, defaultValue: number) {
        const temp = window.localStorage.getItem(key);
        return temp ? parseFloat(temp) : defaultValue || defaultValue;
    }

    const handleSubmit = async () => {
        if (isLoading) return;
        if (text.trim() === '' && files.length === 0) return;

        setIsLoading(true)

        // Создаем форму данных для отправки на сервер
        const formData = new FormData();

        formData.append('text', text);
        formData.append('temperature', temperature.toString());
        formData.append('top_p', topP.toString());
        formData.append('frequency_penalty', frequencyPenalty.toString());
        formData.append('presence_penalty', presencePenalty.toString());
        formData.append('model', models.inputValue);

        files.forEach((file, index) => formData.append(`files`, file));

        try {
            const {data} = await ENDPOINTS.MESSAGES.CREATE(formData)
            const newReqMessage: IMessage = {
                id: data.reqMessage.id,
                text: data.reqMessage.text,
                position: 'right',
                files: data.reqMessage.files
            }

            const newResMessage: IMessage = {
                id: data.resMessage.id,
                text: data.resMessage.text,
                position: 'left',
                files: data.resMessage.files
            }

            const currentMessages = [...messages, newReqMessage, newResMessage]
            setMessages(currentMessages);
            setTimeout(() => {
                scrollBottom()
                watchMessage(data.resMessage.id, currentMessages)
            }, 10)

            setText('');
            setFiles([]);
        } catch (error: any) {
            if(error?.response?.data?.message) {
                toast.error(error?.response?.data?.message, {
                    position: 'bottom-right'
                })
            }

            setIsLoading(false)
            console.error('Ошибка при отправке сообщения:', error);
        }
    };

    const handleReset = async () => {
        const isSure = confirm('Вы уверены?')
        if (isSure) {
            console.log(isSure)

            await ENDPOINTS.MESSAGES.DELETE()
            window.location.reload()
        }
    }

    const watchMessage = async (id: number, _messages: IMessage[]) => {
        const {data} = await ENDPOINTS.MESSAGES.GET_ID(id)
        const findMessage = _messages.find(mess => mess.id === id);

        if (data.text !== null) {
            if (findMessage) {
                setMessages(prevState => (prevState.map((mess) => {
                    if (mess.id === id) {
                        return {
                            ...mess,
                            text: data.text
                        }
                    }
                    return mess
                })))
            }
            setIsLoading(false)
            return true;
        } else {
            setTimeout(async () => await watchMessage(id, _messages), CHECK_MESSAGE_TIMEOUT);
            return false;
        }
    }

    const scrollBottom = () => {
        if (document.scrollingElement) {
            window.scrollBy({
                top: document.scrollingElement.scrollHeight,
                behavior: 'instant'
            })
        }
    }

    useEffect(() => {
        setTemperature(getInitialLocalStoreSlider('chat-temperature', 1))
        setTopP(getInitialLocalStoreSlider('chat-top-p', 1))
        setFrequencyPenalty(getInitialLocalStoreSlider('chat-frequency-penalty', 0))
        setPresencePenalty(getInitialLocalStoreSlider('chat-presence-penalty', 0))

        const localModel = window.localStorage.getItem('chat-models');
        setModels(localModel ? MODELS[MODELS.findIndex((e) => localModel === e.inputValue)] : MODELS[0] || MODELS[0])

        document.body.classList.add('isChat')

        setIsGlobalLoading(true)

        ENDPOINTS.MESSAGES.GET().then((res) => {
            if (res) {
                const messages: IMessage[] = res.map((message) => ({
                    id: message.id,
                    text: message.text,
                    files: message.files,
                    position: message.is_reply ? "left" : "right"
                }))

                setMessages(messages.reverse())
            }

            setIsGlobalLoading(false)
            scrollBottom()
        })
    }, []);

    return (
        <main className={clsx('container', style.chat)}>
            <div className={clsx(style.chat__main)}>
                <div className={clsx(style.chat__left)}>
                    {!isGlobalLoading && <div className={clsx(style.chat__messages)}>
                        {messages.map((_message, index) => (
                            <div
                                className={clsx(style.message, _message.position === 'left' ? style.message_left : style.message_right)}>
                                <div>
                                    {_message.text ?
                                        <Markdown remarkPlugins={[remarkGfm]}>{_message.text}</Markdown> :
                                        <Loading isStatic={true}/>}

                                    {_message.files && <div className={clsx(style.message__files)}>
                                        {_message.files.map((file) => {
                                            return <div className={clsx(style.message__file)}>
                                                <p>{file}</p>
                                            </div>
                                        })}
                                    </div>}
                                </div>
                            </div>
                        ))}
                    </div>}
                    {!isGlobalLoading && messages.length <= 0 && <div className={clsx(style.chat__messages_found)}>
                        <p>Сообщений нет.</p>
                    </div>}
                    {isGlobalLoading && <div className={clsx(style.chat__messages_found)}>
                        <Loading isStatic={true}/>
                    </div>}
                </div>
                <div className={clsx(style.chat__settings)}>
                    <div className={clsx(style.chat__right)}>
                        <Typography onClick={() => setIsOpenSettings(!isOpenSettings)} variant="subtitle2" gutterBottom
                                    sx={{
                                        color: '#ffffff80',
                                        textAlign: 'left',
                                        marginBottom: '-5px',
                                        fontFamily: FontOnest.style
                                    }}>
                            Настройки
                        </Typography>

                        <div className={clsx(style.chat__inner, isOpenSettings ? style.chat__inner_open : '')}>
                            <div>
                                <Typography variant="subtitle1" gutterBottom
                                            sx={{
                                                color: '#ffffff80',
                                                textAlign: 'left',
                                                marginBottom: '-5px',
                                                fontFamily: FontOnest.style
                                            }}>
                                    Модель
                                </Typography>
                                <Select
                                    placeholder={"Модель"}
                                    options={MODELS}
                                    value={models}
                                    onChange={(data) => {
                                        const val = data as IModel
                                        window.localStorage.setItem('chat-models', val.inputValue)
                                        setModels(val)
                                    }}
                                    inputStyle={'default'}
                                    isMin={true}
                                    type={'banks'}
                                />
                            </div>

                            <SliderComponent
                                title="Температура"
                                value={temperature}
                                onChange={(e) => {
                                    setTemperature(e)
                                    window.localStorage.setItem('chat-temperature', e.toString())
                                }}
                                min={0}
                                max={2}
                                step={0.01}
                            />

                            <SliderComponent
                                title="Вариативность"
                                value={topP}
                                onChange={(e) => {
                                    setTopP(e)
                                    window.localStorage.setItem('chat-top-p', e.toString())
                                }}
                                min={0}
                                max={1}
                                step={0.01}
                            />

                            <SliderComponent
                                title="Вероятность повторений"
                                value={frequencyPenalty}
                                onChange={(e) => {
                                    setFrequencyPenalty(e)
                                    window.localStorage.setItem('chat-frequency-penalty', e.toString())
                                }}
                                min={0}
                                max={2}
                                step={0.01}
                            />

                            <SliderComponent
                                title="Вероятность нововведений"
                                value={presencePenalty}
                                onChange={(e) => {
                                    setPresencePenalty(e)
                                    window.localStorage.setItem('chat-presence-penalty', e.toString())
                                }}
                                min={0}
                                max={2}
                                step={0.01}
                            />

                            <button disabled={messages.length <= 0} className={style.chat__right_button} type="button"
                                    onClick={handleReset}>
                                <p>Очистить чат</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx(style.chat__footer)}>
                <div className={clsx(style.chat__footer__files, 'scroll')}>
                    {files.map((file) => {
                        return <div className={clsx(style.chat__footer__file)}>
                            <p>{file.name}</p>
                            <button type="button" className={clsx(style.chat__footer__file__remove)}
                                    onClick={() => handleRemoveFile(file)}>x
                            </button>
                        </div>
                    })}
                </div>

                <form className={clsx(style.chat__footer__form)} onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <label className={clsx(style.chat__button, style.chat__button_file)} htmlFor="fileUpload">
                        <svg width="800.000000" height="800.000000" viewBox="0 0 800 800" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <clipPath id="clip578_16551">
                                    <rect id="paperclip-svgrepo-com" width="800.000000" height="800.000000" fill="white"
                                          fillOpacity="0"/>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#clip578_16551)">
                                <path id="path (Border)"
                                      d="M509.66 323.72L246.63 575.5C236.51 585.18 236.17 600.73 245.85 610.84C255.53 620.96 271.09 621.3 281.2 611.62L544.23 359.84C550.5 353.84 555.87 347.27 560.34 340.13C563.16 335.62 565.62 330.89 567.73 325.93C570.41 319.6 572.4 313.13 573.72 306.53C574.99 300.16 575.63 293.67 575.63 287.05C575.63 280.43 574.99 273.93 573.72 267.56C572.4 260.96 570.41 254.5 567.73 248.17C565.62 243.21 563.16 238.47 560.34 233.97C555.87 226.83 550.5 220.26 544.23 214.25C539.51 209.73 534.45 205.71 529.08 202.18C522.9 198.13 516.28 194.74 509.24 192C503.67 189.84 498 188.16 492.23 186.95C484.9 185.41 477.41 184.64 469.76 184.64C462.11 184.64 454.62 185.41 447.3 186.95C441.53 188.16 435.86 189.84 430.29 192C423.24 194.74 416.63 198.13 410.45 202.18C405.07 205.71 400.02 209.73 395.3 214.25L134.17 464.21C123.37 474.55 114.16 485.88 106.55 498.19C102.03 505.5 98.08 513.16 94.69 521.16C90.19 531.78 86.84 542.64 84.63 553.71C82.51 564.35 81.46 575.2 81.46 586.26C81.46 597.32 82.51 608.17 84.63 618.81C86.84 629.88 90.19 640.73 94.69 651.35C98.08 659.36 102.03 667.02 106.55 674.32C114.16 686.64 123.37 697.97 134.17 708.31C142.06 715.87 150.5 722.6 159.48 728.51C169.99 735.42 181.24 741.21 193.24 745.87C202.51 749.47 211.95 752.29 221.56 754.33C234.12 757 246.97 758.33 260.1 758.33C273.23 758.33 286.08 757 298.64 754.33C308.25 752.29 317.69 749.47 326.96 745.87C338.96 741.21 350.21 735.43 360.72 728.51C369.7 722.6 378.13 715.87 386.03 708.31L650.97 454.71C666.3 440.03 679.35 423.94 690.1 406.44C696.31 396.33 701.76 385.76 706.44 374.71C712.76 359.79 717.46 344.56 720.55 329C723.52 314.09 725 298.89 725 283.4C725 267.9 723.52 252.7 720.55 237.79C717.46 222.24 712.76 207 706.44 192.09C701.76 181.04 696.31 170.46 690.1 160.35C679.35 142.85 666.3 126.77 650.97 112.08C639.9 101.49 628.08 92.05 615.49 83.75C600.65 73.98 584.77 65.8 567.82 59.23C554.85 54.19 541.64 50.24 528.2 47.37C510.4 43.56 492.19 41.66 473.57 41.66C454.96 41.66 436.75 43.56 418.95 47.36C405.51 50.23 392.3 54.19 379.33 59.23C362.38 65.8 346.49 73.98 331.66 83.75C319.07 92.05 307.25 101.49 296.18 112.08L82.71 316.42C72.59 326.1 72.25 341.66 81.94 351.77C91.62 361.88 107.17 362.22 117.28 352.54L330.76 148.2C339.43 139.9 348.68 132.48 358.52 125.95C370.6 117.92 383.57 111.21 397.42 105.84C407.49 101.93 417.74 98.83 428.16 96.54C442.94 93.29 458.08 91.66 473.57 91.66C489.07 91.66 504.21 93.29 518.99 96.54C529.41 98.83 539.66 101.93 549.73 105.84C563.58 111.21 576.55 117.92 588.63 125.95C598.47 132.49 607.72 139.9 616.39 148.2C629.25 160.51 640.07 174.04 648.85 188.77C653.2 196.08 657.05 203.69 660.4 211.59C665.4 223.39 669.11 235.44 671.54 247.75C673.85 259.4 675 271.29 675 283.4C675 295.51 673.85 307.39 671.54 319.04C669.11 331.35 665.4 343.4 660.4 355.2C657.05 363.11 653.2 370.72 648.84 378.02C640.07 392.76 629.25 406.28 616.39 418.59L351.45 672.19C345.96 677.46 340.09 682.17 333.85 686.32C326.1 691.49 317.77 695.8 308.87 699.26C302.5 701.73 296.02 703.69 289.43 705.16C279.89 707.27 270.11 708.33 260.1 708.33C250.09 708.33 240.31 707.27 230.77 705.16C224.18 703.69 217.7 701.73 211.33 699.26C202.44 695.8 194.11 691.49 186.36 686.33C180.12 682.17 174.25 677.46 168.75 672.19C160.42 664.22 153.44 655.46 147.8 645.9C145.14 641.39 142.79 636.71 140.73 631.85C137.55 624.34 135.19 616.68 133.64 608.85C132.18 601.46 131.46 593.93 131.46 586.26C131.46 578.58 132.18 571.05 133.64 563.67C135.19 555.84 137.55 548.17 140.73 540.67C142.78 535.81 145.14 531.13 147.8 526.62C153.43 517.06 160.42 508.3 168.75 500.33L429.87 250.37C434.74 245.71 440.08 242.08 445.88 239.49C453.12 236.26 461.08 234.64 469.76 234.64C478.44 234.64 486.4 236.26 493.64 239.49C499.44 242.08 504.78 245.71 509.66 250.37C515.55 256.02 519.82 262.29 522.45 269.18C524.57 274.73 525.63 280.69 525.63 287.05C525.63 293.41 524.57 299.36 522.45 304.91C519.82 311.81 515.55 318.07 509.66 323.72Z"
                                      fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
                            </g>
                        </svg>
                    </label>
                    <input
                        id="fileUpload"
                        type="file"
                        multiple
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                    <textarea rows={4} className={clsx(style.chat__textarea)} onChange={(e) => setText(e.target.value)}
                              onKeyDown={handleKeyDown} value={text} name={"text"}></textarea>
                    <button disabled={text.length <= 0 || isLoading}
                            className={clsx(style.chat__button, style.chat__button_send)}
                            type={'submit'}>
                        <svg width="800.000000" height="800.000000" viewBox="0 0 800 800" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <clipPath id="clip578_16553">
                                    <rect id="map-arrow-right-svgrepo-com" width="800.000000" height="800.000000"
                                          fill="white" fillOpacity="0"/>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#clip578_16553)">
                                <path id="path"
                                      d="M149.91 694.5L700.24 449.08C744.36 429.4 744.36 370.59 700.24 350.91L149.91 105.49C100.05 83.26 48.33 132.63 73.03 178.89L178.1 375.68C186.27 390.99 186.27 409 178.1 424.31L73.03 621.1C48.33 667.36 100.05 716.73 149.91 694.5Z"
                                      fill="#FFFFFF" fillOpacity="1.000000" fillRule="nonzero"/>
                            </g>
                        </svg>
                    </button>
                </form>
            </div>
        </main>
    );
} 
