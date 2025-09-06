import TextQuizAnswer from '../../jetpunk/answers/TextQuizAnswer';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { TypeInQuizSolver } from './TypeInQuizSolver';

export class TextQuizSolver extends TypeInQuizSolver<TextQuizAnswer> {
	protected getAnswerStringsFromAnswer(answer: TextQuizAnswer): string[] {
		const answerStrings = super.getAnswerStringsFromAnswer(answer);

		if (answer.cols.length == 2) {
			answerStrings.push(answer.cols[1]);
		}

		return answerStrings;
	}
}

register(PageType.TEXT_GAME, TextQuizSolver);
