import DailyTriviaQuizQuestion from '../answers/DailyTriviaQuizQuestion';
import PageVar from './PageVar';

export default interface DailyQuizPageVar extends PageVar {
	data: {
		quiz: {
			questions: DailyTriviaQuizQuestion[];
		};
	};
}
