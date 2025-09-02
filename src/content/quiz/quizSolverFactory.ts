import { registry } from "./quizSolverRegistry";
import * as QuizSolvers from "./solvers/nonAbstractQuizSolvers";
import { DocumentFacade } from "../DocumentFacade";
import { QuizSolver } from "./solvers/QuizSolver";

export function createSolver(documentFacade: DocumentFacade): QuizSolver {
    loadSolvers();

    const pageVar = documentFacade.getPageVar();
    const pageType = pageVar.pageType;

    for (const [name, Ctor] of registry) {
        if (name === pageType) {
            return new Ctor(documentFacade);
        }
    }
    
    throw new Error('No solver for given page type found');
}

function loadSolvers(): void {
    console.log('The following quiz solver classes are loaded:', QuizSolvers);
}