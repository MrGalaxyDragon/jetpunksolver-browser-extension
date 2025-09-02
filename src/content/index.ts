import { createAutoSolveButton } from "./autoSolveButton";
import { DocumentFacade } from "./DocumentFacade";
import { createSolver } from "./quiz/quizSolverFactory";

createAutoSolveButton().addEventListener('click', function () {
	const documentFacade = new DocumentFacade(document);
	const solver = createSolver(documentFacade);
});