import Answer from '../../jetpunk/answers/Answer';
import DefaultPageVar from '../../jetpunk/page-var/DefaultPageVar';
import { QuizSolver } from './QuizSolver';

export abstract class DefaultQuizSolver<
	A extends Answer,
	P extends DefaultPageVar<A>
> extends QuizSolver<A, P> {
	protected getQuestions(): A[] {
		return this.documentFacade.getPageVar().data.quiz.answers;
	}

	protected endQuiz(): void {}

	protected moveToNextQuestion(): void {}
}
