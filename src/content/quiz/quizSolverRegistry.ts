import { DocumentFacade } from '../DocumentFacade';
import { PageType } from '../jetpunk/PageType';
import { QuizSolver } from './solvers/QuizSolver';

export type Constructor<T extends QuizSolver = QuizSolver> = new (
	documentFacade: DocumentFacade
) => T;

export const registry = new Map<PageType, Constructor>();

export function register(name: PageType, ctor: Constructor) {
	registry.set(name, ctor);
}
