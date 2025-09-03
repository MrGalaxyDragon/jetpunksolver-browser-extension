import PictureQuizAnswer from '../../jetpunk/answers/PictureQuizAnswer';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { TypeInQuizSolver } from './TypeInQuizSolver';

export class PictureQuizSolver extends TypeInQuizSolver<PictureQuizAnswer> {}

register(PageType.PHOTO_GAME, PictureQuizSolver);
