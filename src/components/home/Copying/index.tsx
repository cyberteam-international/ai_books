'use client'

import { useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import s from './style.module.scss'
import { FontUnbounded } from "@/fonts";
import { ROUTES } from "@/utils/config";
import { data } from './data';
import SampleVoice from './SampleVoice';

type Props = {};

const Copying = ({}: Props) => {
	const [playIndex, setPlayIndex] = useState<number>()

	const settings = {
		dots: true,
		arrows: true,
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
		}, {
			breakpoint: 740,
			settings: {
				arrows: false,
				slidesToShow: 1.1,
				slidesToScroll: 1
			}
		}]
	}

	return (
		<div id="copying" className={`${s.copying}`}>
			<h2 className={`${FontUnbounded.className} ${s.copying__title}`} id="copying_h">Копирование голосов</h2>
			<h3 className={`${s.copying__subtitle}`}>Загрузите аудиофайл с примером голоса. Настройте интонации и стиль звучания. Озвучивайте ваши тексты нужными голосами за несколько секунд.</h3>
			<Slider {...settings} className={`${s.copying__slider}`}>

				{data && data.map((sample, i) => {
					return (
						<div className={`${s.copying__slide}`} key={i}>
							<Image
								className={`${s.copying__image}`}
								src={sample.avatar} 
								alt={sample.title}
								height={210}
								width={280} 
							/>
							<h4 className={`${s.copying__name} ${FontUnbounded.className}`}>{sample.title}</h4>
							<SampleVoice
								canPlay={playIndex === i}
								setPlayIndex={() => {setPlayIndex(i)}}
								audio={sample.audio}
							/>
						</div>
					)					
				})}
			</Slider>
			<Link className={`${s.copying__button} button`} href={`${ROUTES.WORK}?start`}>Начать</Link>
		</div>
	);
}

export default Copying;