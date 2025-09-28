import WordSearchWord from '../answers/WordSearchWord';
import PageVar from './PageVar';

export default interface WordSearchPageVar extends PageVar {
	data: {
		puzzle: Puzzle;
	};
}

export interface Puzzle {
	shape: 'sq' | 'hex';
	grid: string;
	words: {
		[key: string]: WordSearchWord;
	};
	width: number;
	height: number;
}
