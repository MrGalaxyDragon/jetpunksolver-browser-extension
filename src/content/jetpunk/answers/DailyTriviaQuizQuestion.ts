export default interface DailyTriviaQuizQuestion {
	question: string;
	choices: {
		id: string;
		text: string;
	}[];
	correctChoice: string;
	explanation: string;
	submissionId: number;
}
