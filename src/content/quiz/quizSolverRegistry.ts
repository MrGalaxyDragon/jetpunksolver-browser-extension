import { DocumentFacade } from '../DocumentFacade';
import PageVar from '../jetpunk/page-var/PageVar';
import { PageType } from '../jetpunk/PageType';
import { QuizSolver } from './solvers/QuizSolver';

export type Constructor<A, P extends PageVar, T extends QuizSolver<A, P> = QuizSolver<A, P>> = new (
	documentFacade: DocumentFacade<P>
) => T;

export const registry = new Map<PageType, Constructor<unknown, PageVar>>();

export function register<A, P extends PageVar>(name: PageType, ctor: Constructor<A, P>) {
	registry.set(name, ctor as unknown as Constructor<unknown, PageVar>);
}
