import clsx from "clsx";

import style from './style.module.scss'

type Props = {};

export default function page({}: Props) {

    return (
        <main className={clsx('container', style.offer)}>
            <section>
                <h1>Политика запрещенного использования</h1>
                <p>Эта Политика запрещенного использования дополняет Условия предоставления услуг AiBooks и применяется
                    к вашему доступу и использованию наших Сервисов,
                    входным данным, которые вы предоставляете Сервисам, и использованию выходных данных, которые вы
                    создаете с помощью Сервисов
                    (включая ваше использование за пределами нашего Веб-сайта и наших Сервисов).
                    Определенные термины, используемые в настоящей Политике, имеют значения, изложенные в Условиях
                    предоставления услуг AiBooks.</p>
            </section>

            <section>
                <h2>Запрещенный контент</h2>
            </section>

            <section>
                <h3>1. Угрозы безопасности детей. Сюда входят:</h3>
                <ol className={clsx(style.offer__ordered, style.offer__ordered_number)} style={{paddingLeft: '0'}}>
                    <li>1.1. Сексуализированный контент: контент откровенного сексуального содержания с участием
                        несовершеннолетних или контент, который пропагандирует сексуализацию детей или угрожает ей,
                        включая контент с грумингом и обнаженной натурой. Мы сообщаем о материалах, содержащих очевидные
                        материалы о сексуальном насилии над детьми, в Национальный центр по делам пропавших и
                        эксплуатируемых детей.
                    </li>
                    <li>1.2. Контент, не соответствующий возрасту: Контент, предназначенный для несовершеннолетних и
                        пропагандирующий сексуальное содержание, графическое насилие, непристойности или другие темы для
                        взрослых.
                    </li>
                    <li>1.3. Киберзапугивание и харассмент: Контент, который позорит, унижает, травит или прославляет
                        страдания несовершеннолетних, включая контент, который угрожает несовершеннолетним травлей или
                        домогательствами.
                    </li>
                </ol>
            </section>

            <section>
                <h3>2. Незаконный или регулируемый контент. Сюда входят:</h3>
                <ol className={clsx(style.offer__ordered, style.offer__ordered_number)} style={{paddingLeft: '0'}}>
                    <li>2.1. Нарушение прав интеллектуальной собственности: Контент, который нарушает, незаконно
                        присваивает или иным образом нарушает права интеллектуальной собственности другой стороны.
                    </li>
                    <li>2.2. Нарушения конфиденциальности: Контент, нарушающий права другой стороны на
                        неприкосновенность частной жизни, как определено в применимом законодательстве, включая
                        незаконное использование чьего-либо голоса.
                    </li>
                    <li>2.3. Незаконные товары или вещества: Контент, который продвигает или облегчает операции с
                        незаконными наркотиками, оружием или другими опасными материалами.
                    </li>
                    <li>2.4. Незаконные сервисы: Контент, который продвигает или содействует незаконным услугам, таким
                        как торговля людьми или сексуальные услуги.
                    </li>
                    <li>2.5. Фармацевтические препараты: Реклама медицинских устройств, услуг или фармацевтических
                        продуктов без нашего предварительного письменного разрешения.
                    </li>
                </ol>
            </section>

            <section>
                <h3>3. Материалы, содержащие мошенничество и оскорбления. Сюда входят:</h3>
                <ol className={clsx(style.offer__ordered, style.offer__ordered_number)} style={{paddingLeft: '0'}}>
                    <li>3.1. Мошенничество: Контент, который манипулирует, вводит в заблуждение или вводит в заблуждение
                        других с целью получения денег или собственности, в том числе финансовых, идентификационных
                        данных или вознаграждений.
                    </li>
                    <li>3.2. Несанкционированный доступ: Контент, предназначенный для нарушения безопасности или
                        получения несанкционированного доступа к компьютерным системам или сетям, включая подмену или
                        социальную инженерию.
                    </li>
                    <li>3.3. Олицетворение: Несанкционированное использование личности другого человека во вредных,
                        несатиричных целях, включая несанкционированную сексуализацию или автоматические звонки.
                    </li>
                    <li>3.4. Спам: контент, который продвигает или облегчает распространение спама.
                    </li>
                </ol>
            </section>

            <section>
                <h3>4. Содержание дезинформации о выборах. Сюда входят:</h3>
                <ol className={clsx(style.offer__ordered, style.offer__ordered_number)} style={{paddingLeft: '0'}}>
                    <li>4.1. Подавление избирателей: Контент, предназначенный для введения избирателей в заблуждение
                        относительно времени, места, средств или требований к участию в голосовании, или ложные
                        утверждения, которые могут существенно помешать голосованию.
                    </li>
                    <li>4.2. Искажение информации о кандидатах: Контент, предназначенный для выдвижения себя за
                        политических кандидатов или избранных государственных чиновников в несатирических целях.
                    </li>
                    <li>4.3. Вмешательство в демократические процессы: Контент, который продвигает или подстрекает к
                        вмешательству в демократические процессы, включая кампании по дезинформации.
                    </li>
                    <li>4.4. Политическая реклама (без предварительного письменного разрешения)
                    </li>
                </ol>
            </section>

            <section>
                <h3>5. Материалы, содержащие насилие, ненависть или домогательства. Сюда входят:</h3>
                <ol className={clsx(style.offer__ordered, style.offer__ordered_number)} style={{paddingLeft: '0'}}>
                    <li>5.1. Угрозы насилия, экстремизм или терроризм: Контент, который угрожает, подстрекает или
                        пропагандирует насилие в отношении отдельного лица или группы.
                    </li>
                    <li>5.2. Сексуальное насилие: Контент, который изображает сексуальное насилие или эксплуатацию,
                        угрожает ими или пропагандирует их.
                    </li>
                    <li>5.3. Разжигание ненависти: Контент, направленный против отдельных лиц или групп, вызывающий
                        ненависть, домогательства, дискриминацию или насилие по защищаемым признакам, включая расу,
                        национальное или этническое происхождение, религию, возраст, пол, гендер, сексуальную ориентацию
                        или физические способности.
                    </li>
                    <li>5.4. Домогательства: Контент, пропагандирующий домогательства, угрозы, устрашающее, хищническое
                        поведение или преследование.
                    </li>
                    <li>5.5. Членовредительство: Контент, который пропагандирует или облегчает самоубийство или
                        членовредительство, включая расстройства пищевого поведения.
                    </li>
                    <li>5.6. Медицинская дезинформация: Контент, отрицающий наличие определенных заболеваний.
                    </li>
                </ol>
            </section>


            <section>
                <h2>Запрещенное использование Сервисов</h2>
                <p>Вы не имеете права:</p>
                <ol className={clsx(style.offer__ordered, style.offer__ordered_number)} style={{paddingLeft: '0'}}>
                    <li>1.1. Использовать наши Услуги в любых незаконных или неавторизованных целях или участвовать,
                        поощрять или рекламировать любую деятельность, которая нарушает Условия предоставления услуг
                        AiBooks или настоящую Политику запрещенного использования или каким-либо образом угрожает,
                        мошенничает или наносит вред.
                    </li>
                    <li>1.2. Используйте наши Услуги в любых коммерческих целях, в том числе для рекламы, если вы
                        являетесь Бесплатным Пользователем.
                    </li>
                    <li>1.4. Продавать или перепродавать наши Услуги.</li>
                    <li>1.5. Продавать, перепродавать, сдавать в аренду, одалживать, присваивать, распространять,
                        исполнять, лицензировать, сублицензировать или использовать в коммерческих целях любой Результат
                        (или любую его часть), созданный с использованием нашего продукта Sound Effects, отдельно для
                        любых целей, включая, помимо прочего, в виде отдельных файлов, аудиосэмплов, музыки или звука,
                        библиотек или других коллекций звуков.
                    </li>
                    <li>1.6. Использовать любой интеллектуальный анализ данных, роботов или аналогичные методы сбора или
                        извлечения данных, предназначенные для очистки или извлечения данных из наших Сервисов, кроме
                        как в соответствии с инструкциями, содержащимися в нашем файле robot.txt, и только для
                        компиляции результатов поиска.
                    </li>
                    <li>1.7. Изменять наши Сервисы, удалять любые уведомления о правах собственности или маркировку,
                        связанные с Результатами или нашими Сервисами, или иным образом создавать любые производные
                        работы на основе наших Сервисов.
                    </li>
                    <li>1.8. Использовать или пытаться использовать учетную запись или информацию другого пользователя
                        без разрешения этого пользователя и нас.
                    </li>
                    <li>1.9. Использовать наши Сервисы любым способом, который может помешать другим пользователям в
                        полной мере пользоваться нашими Сервисами, нарушить их работу, негативно повлиять на них или
                        помешать им в полной мере пользоваться нашими Сервисами или который может каким-либо образом
                        повредить, отключить, перегрузить или ухудшить функционирование наших Сервисов.
                    </li>
                    <li>1.10. Осуществлять реинжиниринг любого аспекта наших Сервисов или делать что-либо, что может
                        привести к обнаружению или раскрытию исходного кода, или обходить (A) меры, применяемые для
                        предотвращения или ограничения доступа или использования любой части наших Сервисов, или (B)
                        ограничения, направленные на сдерживание или предотвращение использования Сервисов, нарушающих
                        эту Политику Запрещенного использования.
                    </li>
                    <li>1.11. Разрабатывать или использовать любые приложения или программное обеспечение, которые
                        взаимодействуют с нашими Сервисами без нашего разрешения (например, через наши API).
                    </li>
                    <li>1.12. Использовать любую часть наших Сервисов или их Результаты для исследований и разработки
                        продуктов, моделей и сервисов, конкурирующих с AiBooks.
                    </li>
                    <li>1.13. Используйте любую часть наших Сервисов или их Выходные данные в качестве входных данных
                        для любых технологий машинного обучения или искусственного интеллекта, которые не предоставлены
                        вам нами.
                    </li>
                    <li>1.14. Использовать любую часть наших Сервисов или их Выходных данных как часть набора данных,
                        который может быть использован для обучения, точной настройки, разработки, тестирования или
                        улучшения любых технологий машинного обучения или искусственного интеллекта.
                    </li>
                </ol>
            </section>
            <section>
                <h2>Правоприменение</h2>
                <p>Применение этой Политики остается на усмотрение AiBooks, и несоблюдение этой Политики в каждом
                    конкретном случае не означает отказа от нашего права применять ее в других случаях. Настоящая
                    Политика не создает никаких прав или частных прав на действия со стороны какой-либо третьей стороны
                    или каких-либо разумных ожиданий того, что Сервисы не будут содержать контент, запрещенный настоящей
                    Политикой, или что нежелательные материалы будут незамедлительно удалены после их размещения.
                </p>
                <p>Мы используем комбинацию автоматизированных систем, отчетов пользователей и отзывов людей для оценки
                    контента, который может нарушать эту Политику запрещенного использования. Для пользователей,
                    нарушающих эту Политику запрещенного использования, мы можем удалить нарушающий контент и / или
                    приостановить доступ к сервису. В отношении определенного контента, который представляет реальный
                    риск причинения вреда, мы оставляем за собой право связаться с соответствующими правоохранительными
                    органами или сотрудничать с ними.</p>
            </section>
        </main>
    )
}