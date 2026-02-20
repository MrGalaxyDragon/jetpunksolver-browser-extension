import MultipleChoiceQuizAnswer from '../../jetpunk/answers/MultipleChoiceQuizAnswer';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import DefaultPageVar from '../../jetpunk/page-var/DefaultPageVar';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { DefaultQuizSolver } from './DefaultQuizSolver';

export class MultipleChoiceQuizSolver extends DefaultQuizSolver<
	MultipleChoiceQuizAnswer,
	DefaultPageVar<MultipleChoiceQuizAnswer>
> {
	protected getNextQuestion(index: number): string {
		return this.answers[index].id;
	}

	protected getAnswers(question: string): string[] {
		return this.answers
			.filter((answer) => answer.id === question)
			.map((answer) => answer.correct)
			.map((answer) => JetPunkConfig.multipleChoiceQuizAnswerSelectorPrefix + answer);
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.clickElement(answer);
	}

	protected isQuestionSolved(
		questionIndex: number,
		question: string,
		answers: string[]
	): boolean {
		return true;
	}

	protected endQuiz(): void {
		this.documentFacade.clickElement(JetPunkConfig.multipleChoiceQuizFinishButtonSelector);
	}
}

register(PageType.MULTIPLE_CHOICE_GAME, MultipleChoiceQuizSolver);
