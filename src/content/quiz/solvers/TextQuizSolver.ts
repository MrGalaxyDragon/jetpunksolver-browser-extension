import TextQuizAnswer from '../../jetpunk/answers/TextQuizAnswer';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { TypeInQuizSolver } from './TypeInQuizSolver';

export class TextQuizSolver extends TypeInQuizSolver<TextQuizAnswer> {}

register(PageType.TEXT_GAME, TextQuizSolver);
