import MapQuizAnswer from '../answers/MapQuizAnswer';
import DefaultPageVar from './DefaultPageVar';

export default interface MapQuizPageVar extends DefaultPageVar<MapQuizAnswer> {
	data: {
		quiz: {
			answers: MapQuizAnswer[];
			answerOrder: string[];
		};
	};
}
