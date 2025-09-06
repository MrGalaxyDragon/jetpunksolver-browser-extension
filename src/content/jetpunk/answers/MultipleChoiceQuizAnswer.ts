import Answer from './Answer';

export default interface MultipleChoiceQuizAnswer extends Answer {
	choices: {
		id: string;
		text: string;
	};
	question: string;
	correct: string;
}
