import PageVar from './PageVar';

export default interface TypingSpeedTestPageVar extends PageVar {
	data: {
		passage: Passage;
	};
}

export interface Passage {
	id: number;
	hash: string;
	passage: string;
	topic: string;
}
