import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-borderless/borderless.css'
import { IClue } from '../utils/types';
import Clue from './Clue';

const Board = () => {
    const SELECTION_MAX = 100;
    const SELECTION_RESET = 25;
    const [clues, setClues] = useState<IClue[]>();
    const [count, setCount] = useState(5);
    const [hasUpdated, setUpdate] = useState(false);

    const getClues = () => {
        fetch(`https://jservice.io/api/random?count=${count}`)
            .then(res => res.json())
            .then(data => setClues(data));
    }

    useEffect(() => {
        getClues();
    }, [hasUpdated]);

    const updateCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Ensuring only numerical data comes through
        let parsed = Number(e.target.value.replace(/[a-zA-Z\D\W]/g, ''));
        if (parsed > SELECTION_MAX || isNaN(parsed)) {
            parsed = SELECTION_RESET;
            Swal.fire({
                title: 'Too many questions or invalid input!',
                text: `You must choose between 1 and ${SELECTION_MAX} questions. The selection has been reset to ${SELECTION_RESET} questions.`,
                timer: 5000
            })
            .then(() => {
                getClues();
            })
        }
        setCount(parsed);
    }

    const triggerUpdate = (e: React.MouseEvent<HTMLButtonElement | HTMLElement>) => {
        e.preventDefault();
        setUpdate(!hasUpdated);
    }

    return (
        <div className="container">
            <div className="list-group">
                {clues?.map(clue => (
                    <Clue key={clue.id} {...clue} />
                ))}
            </div>
            <div className="d-flex justify-content-center mb-5">
                <button onClick={getClues} className="my-4 btn btn-outline-light">Load more clues?</button>
            </div>
            <hr className="border border-white" />
            <p className="text-white d-flex justify-content-center">Enter a custom amount of questions to fetch between 1 and {SELECTION_MAX}</p>
            <div className="d-flex justify-content-center">
                <form className="form-inline">
                    <div className="form-group mr-1">
                        <input type="number" defaultValue={5}
                            className="form-control mx-auto"
                            min={1} max={SELECTION_MAX}
                            onChange={updateCount}
                        />
                    </div>
                    <div className="form-group ml-1">
                        <button onClick={triggerUpdate} className="my-4 btn btn-outline-light">Get # of questions</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Board;