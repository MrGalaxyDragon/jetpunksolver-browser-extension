import Answer from './Answer';

export default interface ClickQuizAnswer extends Answer {
	hint: string;
	subhint: string;
	postgame: string;
	bubble: {
		id: string;
		display: string;
	};
}
