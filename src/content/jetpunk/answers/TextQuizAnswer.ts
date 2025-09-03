import TypeInQuizAnswer from './TypeInQuizAnswer';

export default interface TextQuizAnswer extends TypeInQuizAnswer {
	cols: string[];
	path: string;
}
