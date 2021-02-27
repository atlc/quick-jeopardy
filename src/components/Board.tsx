import { useState, useEffect } from 'react';
import Clue from './Clue';
import { IClue } from '../utils/types';

const Board = () => {
    const [clues, setClues] = useState<IClue[]>();

    const getClues = () => {
        fetch('https://jservice.io/api/random?count=5')
            .then(res => res.json())
            .then(data => setClues(data));
    }

    useEffect(() => {
        getClues();
    }, []);

    return (
        <div className="container">
            <div className="list-group">
                {clues?.map(clue => (
                    <Clue key={clue.id} {...clue} />
                ))}
            </div>
            <div className="d-flex justify-content-center">
                <div onClick={getClues} className="my-3 btn btn-outline-light">Load more clues?</div>
            </div>
        </div>
    )
}

export default Board;