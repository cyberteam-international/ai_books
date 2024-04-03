import Link from "next/link";

import {FontUnbounded} from "@/fonts";

import {ROUTES} from "@/utils/config";

type Props = {
    onClick: () => void
};

export default function Rates({onClick }: Props) {


    return (
        <>
            <div className="container excavation_content">
                <h2 className={FontUnbounded.className} id="rates_h">Тарифы</h2>
                <div className="double-rblock">
                    <div>
                        <div>
                            <h6 className={FontUnbounded.className}>Самостоятельное озвучивание</h6>
                            <div className="price">
                                <h3 className={FontUnbounded.className}>3 200 ₽</h3>
                                <span>за 1 млн символов</span>
                            </div>
                            <ul className="list">
                                <li>Доступ в личный кабинет</li>
                                <li>Озвучивание до 5000 символов за раз на русском и других языках</li>
                                <li>Бесплатная обработка сложных текстовых фрагментов</li>
                            </ul>
                        </div>
                        <Link href={ROUTES.REGISTRATION} className="button registration">Попробовать бесплатно</Link>
                    </div>
                    {/*<div>*/}
                    {/*    <div>*/}
                    {/*        <span className="label">под ключ</span>*/}
                    {/*        <h6 className={FontUnbounded.className}>Озвучивание для издательств</h6>*/}
                    {/*        <div className="price">*/}
                    {/*            <h3 className={FontUnbounded.className}>48 000 ₽</h3>*/}
                    {/*            <span>за 1 млн символов <br />1920р. за авторский лист</span>*/}
                    {/*        </div>*/}
                    {/*        <ul className="list">*/}
                    {/*            <li>Выбираете голос диктора</li>*/}
                    {/*            <li>Передаете нам фрагмент книги объемом до 10 000 символов</li>*/}
                    {/*            <li>Мы предварительно проверяем текст и делаем пробное озвучивание</li>*/}
                    {/*            <li>Производим аудио и передаем Вам готовое издание</li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*    <button className="button dubbing" onClick={onClick}>Получить предложение</button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
}
