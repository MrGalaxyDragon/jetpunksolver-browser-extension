import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import TypingSpeedTestPageVar from '../../jetpunk/page-var/TypingSpeedTestPageVar';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { QuizSolver } from './QuizSolver';

export class TypingSpeedTestSolver extends QuizSolver<string, TypingSpeedTestPageVar> {
	protected getQuestions(): string[] {
		return this.documentFacade.getPageVar().data.passage.passage.split('');
	}

	protected getNextQuestion(index: number): string {
		return this.answers[index];
	}

	protected getAnswers(question: string): string[] {
		return [question];
	}

	protected enterAnswer(answer: string): void {
		this.documentFacade.typeToElement(JetPunkConfig.typingSpeedTestInputQuerySelector, answer);
	}

	protected isQuestionSolved(
		questionIndex: number,
		question: string,
		answers: string[]
	): boolean {
		return this.documentFacade.doesNthElementHaveClass(
			JetPunkConfig.typingSpeedTestLetterQuerySelector,
			questionIndex,
			JetPunkConfig.typingSpeedTestLetterCorrectClass
		);
	}

	protected endQuiz(): void {}

	protected moveToNextQuestion(): void {}
}

register(PageType.TYPING_SPEED_TEST, TypingSpeedTestSolver);
