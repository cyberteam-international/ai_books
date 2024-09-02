export type SampleVoices = {
    title: string,
	avatar: string,
    audio: string
}

export const data: SampleVoices[] = [
	{
		title: 'Брежнев',
		avatar: '/avatar-brezhnev.png',
		audio: 'sample-brezhnev.mp3',
	},
	{
		title: 'Шерлок Холмс',
		avatar: '/avatar-livanov.png',
		audio: 'sample-livanov.mp3',
	},
	{
		title: 'Сквидвард',
		avatar: '/avatar-squidward.png',
		audio: 'sample-squidward.mp3',
	},
	{
		title: 'Король Лич',
		avatar: '/avatar-lich.png',
		audio: 'sample-lich.mp3',
	}
]