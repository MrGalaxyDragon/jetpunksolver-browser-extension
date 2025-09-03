import { createAutoSolveButton } from './autoSolveButton';
import { DocumentFacade } from './DocumentFacade';
import JetPunkConfig from './jetpunk/JetPunkConfig';
import { createSolver } from './quiz/quizSolverFactory';

createAutoSolveButton().addEventListener('click', function () {
	const documentFacade = new DocumentFacade(document);
	const solver = createSolver(documentFacade);
	documentFacade.clickElement(JetPunkConfig.startButtonQuerySelector);
	const isSolved = solver.solve();
	console.log('Quiz was' + (isSolved ? '' : ' not') + ' solved successfully');
});
