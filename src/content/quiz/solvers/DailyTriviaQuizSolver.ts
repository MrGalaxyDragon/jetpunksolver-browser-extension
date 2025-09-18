import DailyTriviaQuizQuestion from '../../jetpunk/answers/DailyTriviaQuizQuestion';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import DailyTriviaQuizPageVar from '../../jetpunk/page-var/DailyTriviaQuizPageVar';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { QuizSolver } from './QuizSolver';

export class DailyTriviaQuizSolver extends QuizSolver<
	DailyTriviaQuizQuestion,
	DailyTriviaQuizPageVar
> {
	protected getQuestions(): DailyTriviaQuizQuestion[] {
		return this.documentFacade.getPageVar().data.quiz.questions;
	}

	public async solve(): Promise<boolean> {
		if (this.documentFacade.doesElementExist(JetPunkConfig.dailyQuizCurrentQuestionSelector)) {
			return super.solve();
		} else {
			return new Promise((resolve) => {
				setTimeout(() => resolve(this.solve()), JetPunkConfig.dailyQuizStartDelayInterval);
			});
		}
	}

	protected getNextQuestion(index: number): string {
		const optionalElementText = this.documentFacade.getInnerHtmlOfElement(
			JetPunkConfig.dailyQuizCurrentQuestionSelector
		);
		return optionalElementText ?? '';
	}

	protected getAnswers(question: string): string[] {
		const transformedQuestion = this.convertTextToMarkup(question);
		return this.answers
			.filter((answer) => this.convertTextToMarkup(answer.question) === transformedQuestion)
			.map((answer) => answer.correctChoice)
			.map((choice) => JetPunkConfig.dailyQuizAnswerSelectorPrefix + choice);
	}

	private convertTextToMarkup(text: string): string {
		return this.documentFacade.convertTextToMarkup(text);
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.clickElement(answer + JetPunkConfig.dailyQuizAnswerSelectorSuffix);
	}

	protected isQuestionSolved(question: string, answers: string[]): boolean {
		return answers.some((answer) =>
			this.documentFacade.doesElementExist(
				answer + JetPunkConfig.dailyQuizCorrectAnswerSelector
			)
		);
	}

	protected endQuiz(): void {
		this.documentFacade.clickElement(JetPunkConfig.dailyQuizFinishButtonSelector);
	}

	protected moveToNextQuestion(): void {
		this.documentFacade.clickElement(JetPunkConfig.dailyQuizNextQuestionButtonSelector);
	}
}

register(PageType.DAILY_GAME, DailyTriviaQuizSolver);
