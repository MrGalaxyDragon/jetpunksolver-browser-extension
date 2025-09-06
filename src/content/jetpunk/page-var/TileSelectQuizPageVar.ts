import TileSelectQuizAnswer from '../answers/TileSelectQuizAnswer';
import TileSelectQuizQuestion from '../answers/TileSelectQuizQuestion';
import DefaultPageVar from './DefaultPageVar';

export default interface TileSelectQuizPageVar extends DefaultPageVar<TileSelectQuizAnswer> {
	data: {
		quiz: {
			questions: TileSelectQuizQuestion[];
			answers: TileSelectQuizAnswer[];
		};
	};
}
