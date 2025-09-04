import Answer from './answers/Answer';
import { PageType } from './PageType';

export default interface PageVar<A extends Answer> {
	data: {
		quiz: {
			answers: A[];
			answerOrder?: string[];
		};
	};
	pageType: PageType;
}
