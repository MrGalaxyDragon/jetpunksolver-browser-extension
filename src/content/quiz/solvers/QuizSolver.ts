import { DocumentFacade } from '../../DocumentFacade';
import PageVar from '../../jetpunk/page-var/PageVar';

export abstract class QuizSolver<A, P extends PageVar> {
	protected readonly answers: A[];

	constructor(protected readonly documentFacade: DocumentFacade<P>) {
		this.answers = this.getQuestions();
	}

	protected abstract getQuestions(): A[];

	public async solve(): Promise<boolean> {
		let solved = true;
		for (let i = 0; i < this.answers.length; i++) {
			const question = this.getNextQuestion(i);
			if (!this.solveQuestion(i, question)) {
				solved = false;
			}

			if (i == this.answers.length - 1) {
				this.endQuiz();
			} else {
				this.moveToNextQuestion();
			}
		}
		return solved;
	}

	protected abstract getNextQuestion(index: number): string;

	protected solveQuestion(questionIndex: number, question: string): boolean {
		const answers = this.getAnswers(question);
		for (const answer of answers) {
			this.enterAnswer(answer);
			if (this.isQuestionSolved(questionIndex, question, answers)) {
				return true;
			}
		}
		return false;
	}

	protected abstract getAnswers(question: string): string[];

	protected abstract enterAnswer(answer: string): void;

	protected abstract isQuestionSolved(
		questionIndex: number,
		question: string,
		answers: string[]
	): boolean;

	protected abstract endQuiz(): void;

	protected abstract moveToNextQuestion(): void;
}
