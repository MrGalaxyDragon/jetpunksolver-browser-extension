import TypeInQuizAnswer from '../../jetpunk/answers/TypeInQuizAnswer';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import DefaultPageVar from '../../jetpunk/page-var/DefaultPageVar';
import { DefaultQuizSolver } from './DefaultQuizSolver';

export abstract class TypeInQuizSolver<A extends TypeInQuizAnswer> extends DefaultQuizSolver<
	A,
	DefaultPageVar<A>
> {
	protected getNextQuestion(index: number): string {
		return this.answers[index].id;
	}

	protected getAnswers(question: string): string[] {
		return this.answers
			.filter((answer) => answer.id === question)
			.map((answer) => answer.display);
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.typeToElement(JetPunkConfig.textAnswerInputBoxSelector, answer);
		this.documentFacade.clearElement(JetPunkConfig.textAnswerInputBoxSelector);
	}

	protected isQuestionSolved(question: string, answers: string[]): boolean {
		return this.documentFacade.doesElementExist(
			`[${JetPunkConfig.typeInQuizAttributeName}="${question}"]${JetPunkConfig.typeInQuizCorrectAnswerSelector}`
		);
	}
}
