import Answer from './Answer';

export default interface MapQuiz2Answer extends Answer {
	display: string;
	path: string;
	tolerance: number;
}
