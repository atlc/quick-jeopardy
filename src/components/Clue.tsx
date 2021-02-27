import { IClue } from '../utils/types';
import dayjs from 'dayjs';
import { useState } from 'react';

const Clue = (clue: IClue) => {
    const [q_or_a, setQORA] = useState(clue.question)

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLElement>) => {
        e.preventDefault();
        setQORA(clue.answer);
    }

    return (
        <div onClick={handleClick} className="my-1 shadow-lg list-group-item list-group-item-action flex-column align-items-start active">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1 text-muted">{clue.category.title.toLocaleUpperCase()}</h5>
                <p className="text-muted">${clue.value || ' unknown'}</p>
            </div>
            <p className="mb-1"><em>{q_or_a}</em></p>
            <small className="text-muted">Original Airdate: {dayjs(clue.airdate).format('dddd, MMMM D, YYYY')}</small>
        </div>
    )
};

export default Clue;