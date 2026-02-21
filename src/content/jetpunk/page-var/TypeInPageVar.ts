import TypeInQuizAnswer, { TypeIn } from '../answers/TypeInQuizAnswer';
import DefaultPageVar from './DefaultPageVar';

export default interface TypeInPageVar<A extends TypeInQuizAnswer> extends DefaultPageVar<A> {
	data: {
		quiz: {
			answers: A[];
		};
		recommendedTypeins?: {
			[key: string]: TypeIn[];
		};
	};
}
