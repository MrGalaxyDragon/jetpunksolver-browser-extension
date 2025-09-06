import { createAutoSolveButton } from './autoSolveButton';
import { DocumentFacade } from './DocumentFacade';
import getStartButtonQuerySelector from './jetpunk/getStartButtonQuerySelector';
import { createSolver } from './quiz/quizSolverFactory';

let isLoaded = false;

document.addEventListener('readystatechange', (e) => {
	if (document.readyState === 'complete') {
		loaded();
	}
});

function loaded() {
	if (isLoaded) return;

	try {
		isLoaded = true;

		const documentFacade = new DocumentFacade(document);
		const startButtonQuerySelector = getStartButtonQuerySelector(documentFacade);

		createAutoSolveButton(startButtonQuerySelector).addEventListener(
			'click',
			async function () {
				const solver = createSolver(documentFacade);
				documentFacade.clickElement(startButtonQuerySelector);
				const isSolved = await solver.solve();
				console.log('Quiz was' + (isSolved ? '' : ' not') + ' solved successfully');
			}
		);
	} catch (err) {
		console.warn('An error occured', err);
		isLoaded = false;
	}
}
