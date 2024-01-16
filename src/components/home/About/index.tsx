import Image from "next/image";

import { FontUnbounded } from "@/fonts";

import spring_img_1 from '@public/images/spring.svg'
import spring_img_2 from '@public/images/spring2.svg'
import spring_img_3 from '@public/images/spring3.svg'

type Props = {};

export default function About({ }: Props) {
    return (
        <div id="about" className='container excavation_content'>
            <h2 id="about_h" className={FontUnbounded.className}>О сервисе</h2>
            <h5 className={FontUnbounded.className}>AI Books - это набор инструментов для самостоятельного создания аудио текстов и возможность заказать книгу под ключ.</h5>
            <div className='spring-block'>
                <div className='spring-block-container'>
                    <div>
                        <Image {...spring_img_1} alt="Озвучиваем тексты любой сложности" />
                        <div>
                            <h4 className={FontUnbounded.className}>Озвучиваем тексты любой сложности</h4>
                            <p>AI Books умеет обрабатывать сложные фрагменты текста - сокращения, редкие имена собственные, даты,
                                единицы измерения - все то, с чем плохо справляются речевые синтезаторы. Поэтому сложный текст мы
                                озвучиваем лучше.</p>
                        </div>
                    </div>
                </div>
                <div className='spring-block-container'>
                    <div>
                        <Image {...spring_img_2} alt="Структура и порядок" />
                        <div>
                            <h4 className={FontUnbounded.className}>Структура и порядок</h4>
                            <p>Размечаем заголовки и подзаголовки, умеем работать с абзацами и главами. Такой текст проще слушать.</p>
                        </div>
                    </div>
                    <div>
                        <Image {...spring_img_3} alt="Дешевле и быстрее диктора" />
                        <div>
                            <h4 className={FontUnbounded.className}>Дешевле и быстрее диктора</h4>
                            <p>Стоимость аудио текста в 3-8 раз ниже, чем при озвучивании диктором. При этом результат Вы получаете в несколько раз быстрее.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
