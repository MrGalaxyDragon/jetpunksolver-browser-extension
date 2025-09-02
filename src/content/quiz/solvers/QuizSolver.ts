import { DocumentFacade } from "../../DocumentFacade";

export abstract class QuizSolver {
    constructor(protected readonly documentFacade: DocumentFacade) {}
}