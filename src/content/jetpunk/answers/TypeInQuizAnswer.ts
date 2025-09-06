import Answer from './Answer';

export default interface TypeInQuizAnswer extends Answer {
	display: string;
	isName: boolean;
	mode?: string;
	typeins?: TypeIn[];
}

export interface TypeIn {
	val: string;
	mode: 's' | 'r';
}
