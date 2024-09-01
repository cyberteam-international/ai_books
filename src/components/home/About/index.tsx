import Image from "next/image";

import { FontUnbounded } from "@/fonts";

import spring_img_1 from '@public/images/spring.svg'
import spring_img_2 from '@public/images/spring2.svg'
import spring_img_3 from '@public/images/spring3.svg'
import Link from "next/link";
import { ROUTES } from "@/utils/config";

type Props = {
    onClick: () => void
};

export default function About({onClick}: Props) {
    return (
        <div id="about" className='container excavation_content'>
            <h2 id="about_h" className={FontUnbounded.className}>О сервисе</h2>
            <h5 className={FontUnbounded.className}>AI Books - это набор инструментов для самостоятельного создания аудио текстов и возможность заказать книгу под ключ.</h5>
            <div className='spring-block'>
                <div className='spring-block-container'>
                    <div>
                        <Image src='/images/spring.svg' alt="Копирование голосов" width={200} height={200} />
                        <div>
                            <h4 className={FontUnbounded.className}>Копирование голосов</h4>
                            <p className="auto-bottom">Загрузите пример голоса и через минуту вы сможете озвучить ваш текст качественной "человекоподобной" копией голоса.</p>
                            <Link href={ROUTES.WORK} className="button registration">Подробнее</Link>
                        </div>
                    </div>
                </div>
                <div className='spring-block-container'>
                    <div>
                        <Image src='/images/spring2.svg' alt="Библиотека голосов" width={200} height={200} />
                        <div>
                            <h4 className={FontUnbounded.className}>Библиотека голосов</h4>
                            <p>Озвучивайте тексты на разных языках голосами из общей библиотеки. Расшифровывайте сложгые тексты перед озвучиванием с помощью ИИ.</p>
                            <a href="#voices_h" className="button">Подробнее</a>
                        </div>
                    </div>
                    <div>
                        <Image src='/images/spring3.svg' alt="Создание аудиокниг" width={200} height={200} />
                        <div>
                            <h4 className={FontUnbounded.className}>Создание аудиокниг</h4>
                            <p>Закажите качественно аудиоиздание на основе вашей книги или рукописи. Полный издательский цикл и помощь в дистрибуции.</p>
                            <button className="button" onClick={onClick}>Консультация</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
