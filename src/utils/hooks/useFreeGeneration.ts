import {useCallback, useState} from 'react';
import Cookies from "js-cookie";
import {DateTime} from "luxon";

export const UseFreeGeneration = () => {
    const [freeGeneration, setFreeGeneration] = useState(Cookies.get('free-generation') || '0')

    const maxFreeGeneration = 10

    const getFreeGeneration = useCallback(() => {
        return parseInt(freeGeneration)
    }, [freeGeneration])

    function addFreeGeneration() {
        setFreeGeneration((prevState) => {
            const val = (parseInt(prevState) + 1).toString()
            Cookies.set('free-generation', val, {
                expires: DateTime.now().endOf('day').toJSDate(),
            })

            return val
        })
    }

    return {
        getFreeGeneration,
        addFreeGeneration,
        maxFreeGeneration
    };
};