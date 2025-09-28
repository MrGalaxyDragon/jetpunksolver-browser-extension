export default interface WordSearchWord {
	id: string;
	word: string;
	norm: string;
	orientation?: WordSearchOrientationKey;
	clue: null;
	image: null;
	border?: number;
	wordBankId: string;
}

export const WordSearchOrientations = {
	0: { x: 0, y: 1 },
	1: { x: 0, y: -1 },
	2: { x: 1, y: 0 },
	3: { x: -1, y: 0 },
	4: { x: 1, y: 1 },
	5: { x: -1, y: -1 },
	6: { x: -1, y: 1 },
	7: { x: 1, y: -1 }
} as const;

type WordSearchOrientation = typeof WordSearchOrientations;

type WordSearchOrientationKey = keyof WordSearchOrientation;
