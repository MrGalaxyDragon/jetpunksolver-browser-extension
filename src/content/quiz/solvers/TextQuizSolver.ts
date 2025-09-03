import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { TypeInQuizSolver } from './TypeInQuizSolver';

export class TextQuizSolver extends TypeInQuizSolver {}

register(PageType.TEXT_GAME, TextQuizSolver);
