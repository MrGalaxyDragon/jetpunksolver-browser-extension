import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { TypeInQuizSolver } from './TypeInQuizSolver';

export class PictureQuizSolver extends TypeInQuizSolver {}

register(PageType.PHOTO_GAME, PictureQuizSolver);
