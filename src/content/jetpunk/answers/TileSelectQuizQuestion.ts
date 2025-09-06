export default interface TileSelectQuizQuestion {
	id: string;
	question: string;
	tiles: {
		id: string;
		qid: string;
		sel: boolean;
	}[];
}
