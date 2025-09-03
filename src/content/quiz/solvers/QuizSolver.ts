import { DocumentFacade } from '../../DocumentFacade';
import Answer from '../../jetpunk/answers/Answer';

export abstract class QuizSolver<A extends Answer> {
	constructor(protected readonly documentFacade: DocumentFacade<A>) {}

	public solve(): boolean {
		let solved = true;
		const questions = this.getQuestions();
		for (const question of questions) {
			if (!this.solveQuestion(question)) {
				solved = false;
			}
		}
		return solved;
	}

	protected abstract getQuestions(): string[];

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
}
