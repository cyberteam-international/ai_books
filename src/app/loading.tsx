import style from './loading.style.module.scss'
import clsx from "clsx";

type Props = {
    isBlack?: boolean
};

export default function Loading({ isBlack }: Props) {
    return (
        <div className={ clsx(style.loader, isBlack && style.loader__black) }>
            <div className={style.loader__wrapper}>
                <span className={style.loader__animation}></span>
            </div>
        </div>
    );
}
