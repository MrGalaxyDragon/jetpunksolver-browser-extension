import { DocumentFacade } from '../DocumentFacade';
import PageVar from '../jetpunk/page-var/PageVar';
import { PageType } from '../jetpunk/PageType';
import { QuizSolver } from './solvers/QuizSolver';

export type Constructor<T extends QuizSolver<unknown, PageVar> = QuizSolver<unknown, PageVar>> =
	new (documentFacade: DocumentFacade<PageVar>) => T;

export const registry = new Map<PageType, Constructor>();

export function register(name: PageType, ctor: Constructor) {
	registry.set(name, ctor);
}
