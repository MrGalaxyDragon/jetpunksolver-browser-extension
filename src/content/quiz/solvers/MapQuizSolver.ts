import { DocumentFacade } from '../../DocumentFacade';
import MapQuizAnswer from '../../jetpunk/answers/MapQuizAnswer';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { QuizSolver } from './QuizSolver';

export class MapQuizSolver extends QuizSolver<MapQuizAnswer> {
	private readonly answersInOrder: string[];

	constructor(protected readonly documentFacade: DocumentFacade<MapQuizAnswer>) {
		super(documentFacade);
		this.answersInOrder = this.documentFacade.getPageVar().data.quiz.answerOrder ?? [];
	}

	protected getNextQuestion(index: number): string {
		return this.answersInOrder[index];
	}

	protected getAnswers(question: string): string[] {
		return [this.getAnswer(question)];
	}

	private getAnswer(question: string): string {
		return JetPunkConfig.mapQuizAnswerSelectorPrefix + question;
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.clickElement(answer);
	}

	protected isQuestionSolved(question: string, answers: string[]): boolean {
		const acceptedAnswers = answers.filter(
			(answer) => !this.documentFacade.doesElementExist(answer)
		);
		return acceptedAnswers.length !== answers.length;
	}
}

register(PageType.MAP_GAME, MapQuizSolver);
