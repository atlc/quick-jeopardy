export interface IClue {
    id: number,
    answer: string,
    question: string,
    value: number | null,
    airdate: string,
    created_at: string,
    updated_at: string,
    category_id: number,
    game_id: number | null,
    invalid_count: number | null,
    category: {
        id: number,
        title: string,
        created_at: string,
        updated_at: string,
        clues_count: number
    }
}