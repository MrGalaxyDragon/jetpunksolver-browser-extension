import JetPunkConfig from "../../jetpunk/JetPunkConfig";
import { QuizSolver } from "./QuizSolver";

export abstract class TypeInQuizSolver extends QuizSolver {
    protected getQuestions(): string[] {
        return this.documentFacade.getPageVar().data.quiz.answers
            .map(answer => answer.id);
    }

    protected getAnswers(question: string): string[] {
        return this.documentFacade.getPageVar().data.quiz.answers
            .filter(answer => answer.id === question)
            .map(answer => answer.display);
    }

    protected enterAnswer(answer: string): void {
        this.documentFacade.typeToElement(JetPunkConfig.textAnswerInputBoxSelector, answer);
        this.documentFacade.clearElement(JetPunkConfig.textAnswerInputBoxSelector);
    }

    protected isQuestionSolved(question: string, answers: string[]): boolean {
        return this.documentFacade.doesElementExist(`[${JetPunkConfig.answerCssProperty}="${question}"]${JetPunkConfig.correctAnswerSelector}`);
    }
}