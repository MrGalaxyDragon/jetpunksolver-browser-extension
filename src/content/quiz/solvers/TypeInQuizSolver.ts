import TypeInQuizAnswer from '../../jetpunk/answers/TypeInQuizAnswer';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import { QuizSolver } from './QuizSolver';

export abstract class TypeInQuizSolver<A extends TypeInQuizAnswer> extends QuizSolver<A> {
	protected getQuestions(): string[] {
		return this.documentFacade.getAnswers().map((answer) => answer.id);
	}

	protected getAnswers(question: string): string[] {
		return this.documentFacade
			.getAnswers()
			.filter((answer) => answer.id === question)
			.map((answer) => answer.display);
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.typeToElement(JetPunkConfig.textAnswerInputBoxSelector, answer);
		this.documentFacade.clearElement(JetPunkConfig.textAnswerInputBoxSelector);
	}

	protected isQuestionSolved(question: string, answers: string[]): boolean {
		return this.documentFacade.doesElementExist(
			`[${JetPunkConfig.answerCssProperty}="${question}"]${JetPunkConfig.correctAnswerSelector}`
		);
	}
}
