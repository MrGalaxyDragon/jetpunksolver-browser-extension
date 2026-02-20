import MapQuiz2Answer from '../../jetpunk/answers/MapQuiz2Answer';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import DefaultPageVar from '../../jetpunk/page-var/DefaultPageVar';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { DefaultQuizSolver } from './DefaultQuizSolver';

export class MapQuiz2Solver extends DefaultQuizSolver<
	MapQuiz2Answer,
	DefaultPageVar<MapQuiz2Answer>
> {
	protected getNextQuestion(index: number): string {
		const optionalElementText = this.documentFacade.getTextOfElement(
			JetPunkConfig.mapQuiz2CurrentQuestionSelector
		);
		return optionalElementText ?? '';
	}

	protected getAnswers(question: string): string[] {
		return this.answers
			.filter((answer) => answer.display === question)
			.map((answer) => answer.path)
			.map((path) => JetPunkConfig.mapQuiz2AnswerSelectorPrefix + path);
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.emulateClickOnSvgPathElement(answer);
	}

	protected isQuestionSolved(
		questionIndex: number,
		question: string,
		answers: string[]
	): boolean {
		return answers.some((answer) =>
			this.documentFacade.doesElementExist(
				answer + JetPunkConfig.mapQuiz2CorrectAnswerSelector
			)
		);
	}
}

register(PageType.MAP_GAME_2, MapQuiz2Solver);
