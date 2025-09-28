import TypeInQuizAnswer, { TypeIn } from '../../jetpunk/answers/TypeInQuizAnswer';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import DefaultPageVar from '../../jetpunk/page-var/DefaultPageVar';
import { DefaultQuizSolver } from './DefaultQuizSolver';
import RandExp from 'randexp';

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
			.flatMap((answer) => this.getAnswerStringsFromAnswer(answer));
	}

	protected getAnswerStringsFromAnswer(answer: A): string[] {
		const answerStrings = [];

		answerStrings.push(...this.getAnswerTypeIns(answer));

		const displayMissingValue = this.getDisplayMissingValue(answer);
		if (displayMissingValue) {
			answerStrings.push(displayMissingValue);
		}

		answerStrings.push(answer.display);

		return answerStrings;
	}

	protected getAnswerTypeIns(answer: TypeInQuizAnswer): string[] {
		const typeIns = [];

		for (const typeIn of answer.typeins ?? []) {
			typeIns.push(this.getTypeInValue(typeIn));
		}

		return typeIns;
	}

	protected getTypeInValue(typeIn: TypeIn): string {
		switch (typeIn.mode) {
			case 's':
				return typeIn.val;
			case 'r':
				return new RandExp(typeIn.val).gen();
			default:
				return '';
		}
	}

	protected getDisplayMissingValue(answer: TypeInQuizAnswer): string | null {
		const words = [...answer.display.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);

		const joined = words.join(' ');

		return joined === '' ? null : joined;
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.typeToElement(JetPunkConfig.typeInQuizInputBoxSelector, answer);
		this.documentFacade.clearElement(JetPunkConfig.typeInQuizInputBoxSelector);
	}

	protected isQuestionSolved(question: string, answers: string[]): boolean {
		return this.documentFacade.doesElementExist(
			`[${JetPunkConfig.typeInQuizAttributeName}="${question}"]${JetPunkConfig.typeInQuizCorrectAnswerSelector}`
		);
	}
}
