import style from './loading.style.module.scss'

export default function Loading() {
    return (
        <div className={style.loader}>
            <svg height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 459.926 459.926" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path style={{fill: '#ffff'}} d="M229.963,45.76c90.863,0,165.545,70.421,172.46,159.542l-32-32l-8.437,8.437l42.765,42.765h8.437 l46.738-46.744l-8.437-8.437l-37.018,37.024c-6.432-96.204-86.699-172.52-184.508-172.52 c-101.998,0-184.973,82.981-184.973,184.973h11.934C56.924,123.389,134.553,45.76,229.963,45.76z"></path> <path style={{fill: '#ffff'}} d="M229.963,414.166c-90.863,0-165.545-70.421-172.46-159.542l32,32l8.437-8.437l-42.765-42.765 h-8.437L0,282.161l8.437,8.437l37.018-37.018c6.432,96.204,86.699,172.52,184.508,172.52 c101.998,0,184.973-82.975,184.973-184.973h-11.934C403.002,336.537,325.373,414.166,229.963,414.166z"></path> </g> </g> </g></svg>
        </div>
    )
}