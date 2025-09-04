import ClickQuizAnswer from '../../jetpunk/answers/ClickQuizAnswer';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { QuizSolver } from './QuizSolver';

export class ClickQuizSolver extends QuizSolver<ClickQuizAnswer> {
	protected getNextQuestion(index: number): string {
		return this.answers[index].id;
	}

	protected getAnswers(question: string): string[] {
		return [this.getAnswer(question)].filter((answer) => answer !== '');
	}

	private getAnswer(question: string): string {
		const answer = this.documentFacade.getAnswers().find((answer) => answer.id === question);
		if (!answer) {
			return '';
		}
		return JetPunkConfig.clickQuizAnswerSelectorPrefix + answer.bubble.id;
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.clickElement(answer);
	}

	protected isQuestionSolved(question: string, answers: string[]): boolean {
		return this.documentFacade.doesElementExist(
			`${this.getAnswer(question)}${JetPunkConfig.clickQuizCorrectAnswerSelector}`
		);
	}
}

register(PageType.CLICK_GAME, ClickQuizSolver);
