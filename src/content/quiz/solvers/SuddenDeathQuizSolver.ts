import SuddenDeathQuizAnswer from '../../jetpunk/answers/SuddenDeathQuizAnswer';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import DefaultPageVar from '../../jetpunk/page-var/DefaultPageVar';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { DefaultQuizSolver } from './DefaultQuizSolver';

export class SuddenDeathQuizSolver extends DefaultQuizSolver<
	SuddenDeathQuizAnswer,
	DefaultPageVar<SuddenDeathQuizAnswer>
> {
	protected getNextQuestion(index: number): string {
		return this.answers[index].id;
	}

	protected getAnswers(question: string): string[] {
		const selector =
			JetPunkConfig.suddenDeathQuizAnswerSelectorPrefix +
			question +
			JetPunkConfig.suddenDeathQuizAnswerSelectorSuffix;
		return [selector];
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.clickElement(answer);
	}

	protected isQuestionSolved(
		questionIndex: number,
		question: string,
		answers: string[]
	): boolean {
		return answers.some((answer) =>
			this.documentFacade.doesElementExist(
				answer + JetPunkConfig.suddenDeathQuizCorrectAnswerSelector
			)
		);
	}
}

register(PageType.SUDDEN_DEATH_GAME, SuddenDeathQuizSolver);
