import Answer from './Answer';

export default interface TypeInQuizAnswer extends Answer {
	display: string;
	isName: boolean;
	node: string;
}
