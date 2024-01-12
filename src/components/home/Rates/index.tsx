import { FontUnbounded } from "@/fonts";
import { ROUTES } from "@/utils/config";

type Props = {};

export default function Rates({ }: Props) {
    return (
        <div className="container excavation_content">
            <h2 className={FontUnbounded.className} id="rates_h">Тарифы</h2>
            <div className="double-rblock">
                <div>
                    <h6 className={FontUnbounded.className}>Самостоятельное озвучивание</h6>
                    <div className="price">
                        <h3 className={FontUnbounded.className}>1 320 ₽</h3>
                        <span>за 1 млн символов</span>
                    </div>
                    <ul className="list">
                        <li>Получаете доступ в личный кабинет</li>
                        <li>Можете загружать тексты и проверять их звучание</li>
                        <li>Можете редактировать тексты, чтобы добиться эталонного звучания</li>
                        <li>Выбираете голос диктора и скачиваете готовый аудиофайл</li>
                    </ul>
                    <a href={ROUTES.REGISTRATION} className="button registration">Зарегистрироваться</a>
                </div>
                <div>
                    <span className="label">под ключ</span>
                    <h6 className={FontUnbounded.className}>Озвучивание для издательств</h6>
                    <div className="price">
                        <h3 className={FontUnbounded.className}>48 000 ₽</h3>
                        <span>за 1 млн символов <br />1920р. за авторский лист</span>
                    </div>
                    <ul className="list">
                        <li>Выбираете голос диктора</li>
                        <li>Передаете нам фрагмент книги объемом до 10 000 символов</li>
                        <li>Мы предварительно проверяем текст и делаем пробное озвучивание</li>
                        <li>Производим аудио и передаем Вам готовое издание</li>
                    </ul>
                    <a className="button dubbing">Получить предложение</a>
                </div>
            </div>
        </div>
    );
}
