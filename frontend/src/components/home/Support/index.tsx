'use client'

import Slider from "react-slick";

import { FontUnbounded } from "@/fonts";

type Props = {};

export default function Support({ }: Props) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1280,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    }

    return (
        <div id="support">
            <h2 className={FontUnbounded.className} id="support_h">Обратная связь</h2>
            <Slider {...settings} className="quote-block">
                <div className="quote-block-item">
                    <p>Мы сумели успешно реализовать совместные проекты по озвучиванию больших объёмов текста со сложным
                        содержанием, добившись в короткий срок высокого уровня качества продукта.</p>
                    <div className="person">
                        <img src="images/avatar.svg" />
                        <div>
                            <span className="name">Дмитрий Цап</span>
                            <p>Издательство “Русское слово”</p>
                        </div>
                    </div>
                </div>
                <div className="quote-block-item">
                    <p>Я заказала озвучивание материала для своей учебной программы и была очень довольна результатом. Озвучивание
                        было выполнено профессионально и точно по моим требованиям. Спасибо за отличную работу!</p>
                    <div className="person">
                        <img src="images/avatar.svg" />
                        <div>
                            <span className="name">Светлана</span>
                            <p>Автор онлайн курсов</p>
                        </div>
                    </div>
                </div>
                <div className="quote-block-item">
                    <p>Заказывал озвучивание статьи для своего блога и был приятно удивлен скоростью и качеством работы. Текст был
                        сложный, но выполнили без ошибок.</p>
                    <div className="person">
                        <img src="images/avatar.svg" />
                        <div>
                            <span className="name">Тимур</span>
                            <p>Частное лицо</p>
                        </div>
                    </div>
                </div>
                <div className="quote-block-item">
                    <p>Я пользовалась услугами этого сервиса для озвучивания длинных научных статей, и мне очень понравилось, как
                        быстро и профессионально все было сделано. Голосовое сопровождение было понятным и четким. Дешевле чем
                        дикторское озвучивание</p>
                    <div className="person">
                        <img src="images/avatar.svg" />
                        <div>
                            <span className="name">Валентина Шипелина</span>
                            <p>Редактор паблика</p>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
}
