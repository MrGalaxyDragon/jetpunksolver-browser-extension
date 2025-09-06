import { DocumentFacade } from '../../DocumentFacade';
import Answer from '../../jetpunk/answers/Answer';
import PageVar from '../../jetpunk/page-var/PageVar';

export abstract class QuizSolver<A extends Answer, P extends PageVar> {
	protected readonly answers: A[];

	constructor(protected readonly documentFacade: DocumentFacade<P>) {
		this.answers = this.getQuestions();
	}

	protected abstract getQuestions(): A[];

	public solve(): boolean {
		let solved = true;
		for (let i = 0; i < this.answers.length; i++) {
			const question = this.getNextQuestion(i);
			if (this.solveQuestion(question)) {
				if (i == this.answers.length - 1) {
					this.endQuiz();
				} else {
					this.moveToNextQuestion();
				}
			} else {
				solved = false;
			}
		}
		return solved;
	}

	protected abstract getNextQuestion(index: number): string;

	protected solveQuestion(question: string): boolean {
		const answers = this.getAnswers(question);
		for (const answer of answers) {
			this.enterAnswer(answer);
			if (this.isQuestionSolved(question, answers)) {
				return true;
			}
		}
		return false;
	}

	protected abstract getAnswers(question: string): string[];

	protected abstract enterAnswer(answer: string): void;

	protected abstract isQuestionSolved(question: string, answers: string[]): boolean;

	protected abstract endQuiz(): void;

	protected abstract moveToNextQuestion(): void;
}
