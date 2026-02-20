import TileSelectQuizQuestion from '../../jetpunk/answers/TileSelectQuizQuestion';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import TileSelectQuizPageVar from '../../jetpunk/page-var/TileSelectQuizPageVar';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { QuizSolver } from './QuizSolver';

export class TileSelectQuizSolver extends QuizSolver<
	TileSelectQuizQuestion,
	TileSelectQuizPageVar
> {
	private currentQuestionId: string | null = null;

	protected getQuestions(): TileSelectQuizQuestion[] {
		return this.documentFacade.getPageVar().data.quiz.questions;
	}

	protected getNextQuestion(index: number): string {
		this.currentQuestionId = this.findIdForQuestionText(index);
		return this.currentQuestionId;
	}

	private findIdForQuestionText(index: number): string {
		const question = this.getQuestionText(index);
		return this.answers
			.filter((answer) => answer.question === question)
			.map((answer) => answer.id)
			.reduce((prev, answer) => answer, '');
	}

	private getQuestionText(index: number): string {
		const selector =
			JetPunkConfig.tileSelectQuizCurrentQuestionSelectorPrefix +
			(index + 1) +
			JetPunkConfig.tileSelectQuizCurrentQuestionSelectorSuffix;
		const optionalElementText = this.documentFacade.getTextOfElement(selector);
		return optionalElementText ?? '';
	}

	protected getAnswers(question: string): string[] {
		return this.answers
			.filter((answer) => answer.id === question)
			.flatMap((answer) => answer.tiles)
			.filter((tile) => tile.sel)
			.map((tile) => JetPunkConfig.tileSelectQuizAnswerSelectorPrefix + tile.id);
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.clickElement(answer);
	}

	protected isQuestionSolved(
		questionIndex: number,
		question: string,
		answers: string[]
	): boolean {
		return false;
	}

	protected endQuiz(): void {
		this.documentFacade.clickElement(JetPunkConfig.tileSelectQuizFinishButtonSelector);
	}

	protected moveToNextQuestion(): void {
		const nextButtonQuerySelector =
			JetPunkConfig.tileSelectQuizNextQuestionButtonSelectorPrefix +
			this.currentQuestionId +
			JetPunkConfig.tileSelectQuizNextQuestionButtonSelectorSuffix;

		this.documentFacade.clickElement(nextButtonQuerySelector);
	}
}

register(PageType.TILE_GAME, TileSelectQuizSolver);
