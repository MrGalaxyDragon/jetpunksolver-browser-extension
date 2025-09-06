import Answer from '../answers/Answer';
import PageVar from './PageVar';

export default interface DefaultPageVar<A extends Answer> extends PageVar {
	data: {
		quiz: {
			answers: A[];
		};
	};
}
