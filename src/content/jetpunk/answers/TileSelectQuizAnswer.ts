import Answer from './Answer';

export default interface TileSelectQuizAnswer extends Answer {
	qid: string;
	text: string;
	questionText: string;
	image: object | null;
	border: number;
	sel: boolean;
}
