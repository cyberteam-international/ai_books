import {useState} from 'react';
import Cookies from "js-cookie";
import {DateTime} from "luxon";

export const UseFreeGpt = () => {
    const [freeGpt, setFreeGpt] = useState(Cookies.get('free-gpt') || '0')

    const maxFreeGpt = 10

    function getFreeGpt() {
        return parseInt(freeGpt)
    }

    function addFreeGpt() {
        setFreeGpt((prevState) => {
            const val = (parseInt(prevState) + 1).toString()
            Cookies.set('free-gpt', val, {
                expires: DateTime.now().endOf('day').toJSDate(),
            })

            return val
        })
    }

    return {
        getFreeGpt,
        addFreeGpt,
        maxFreeGpt
    };
};