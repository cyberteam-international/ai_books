import clsx from 'clsx'

import { FontUnbounded } from '@/fonts'

import About from '@components/home/About'
import Voices from '@components/home/Voices'
import Rates from '@components/home/Rates'
import Support from '@components/home/Support'

import './style.scss'

export default function PageHome() {

    return (
        <main className='home'>
            <div className="home__container container">
                <h1 className={clsx('home__title', FontUnbounded.className)}>Автоматическое озвучивание текстов и аудиокниг</h1>
                <h5 className={clsx('home__subtitle', FontUnbounded.className)}>Создаем аудио на основе ваших текстов с помощью технологий искусственного интеллекта. </h5>
            </div>
            <div className='home__wrapper'>
                <div className='container excavation'></div>
                <a href="#about_h" aria-description='' className="more_button"></a>
            </div>
            <About/>
            <Voices/>
            <Rates/>
            <Support/>
        </main>
    )
}