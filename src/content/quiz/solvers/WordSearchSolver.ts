import { DocumentFacade } from '../../DocumentFacade';
import WordSearchWord, { WordSearchOrientations } from '../../jetpunk/answers/WordSearchWord';
import JetPunkConfig from '../../jetpunk/JetPunkConfig';
import WordSearchPageVar from '../../jetpunk/page-var/WordSearchPageVar';
import { PageType } from '../../jetpunk/PageType';
import { register } from '../quizSolverRegistry';
import { QuizSolver } from './QuizSolver';

interface Coordinates {
	x: number;
	y: number;
}

export class WordSearchSolver extends QuizSolver<WordSearchWord, WordSearchPageVar> {
	private readonly gridMatrix: string[][];

	constructor(protected readonly documentFacade: DocumentFacade<WordSearchPageVar>) {
		super(documentFacade);
		this.gridMatrix = this.createGridMatrix();
	}

	private createGridMatrix(): string[][] {
		const puzzle = this.documentFacade.getPageVar().data.puzzle;
		const grid = puzzle.grid;
		const gridMatrix = [];
		for (let i = 0; i < puzzle.height; i++) {
			const row: string[] = [];
			gridMatrix.push(row);
			for (let j = 0; j < puzzle.width; j++) {
				row.push(grid.charAt(i * puzzle.width + j));
			}
		}
		return gridMatrix;
	}

	protected getQuestions(): WordSearchWord[] {
		return Object.values(this.documentFacade.getPageVar().data.puzzle.words);
	}

	protected getNextQuestion(index: number): string {
		return this.answers[index].id;
	}

	protected solveQuestion(question: string): boolean {
		const answers = this.getAnswers(question);

		if (answers.length != 2) return false;

		const start = answers[0];
		const end = answers[1];

		this.documentFacade.clickElementMoveToNextClickNext(start, end);

		return this.isQuestionSolved(question, answers);
	}

	protected getAnswers(question: string): string[] {
		return this.answers
			.filter((answer) => answer.id === question)
			.flatMap((word) => this.getAnswersForWord(word));
	}

	private getAnswersForWord(word: WordSearchWord): string[] {
		return this.getStartingLetterCoordinates(word)
			.map((coordinates) => ({
				from: coordinates,
				to: this.getEndingLetterCoordinates(word, coordinates)
			}))
			.filter((fromTo) => fromTo.to !== null)
			.flatMap((fromTo) => [
				`[id="${fromTo.from.x}-${fromTo.from.y}"]`,
				`[id="${fromTo.to?.x}-${fromTo.to?.y}"]`
			]);
	}

	private getStartingLetterCoordinates(word: WordSearchWord): Coordinates[] {
		const startingLetter = word.norm.charAt(0);
		const coordinates = [];
		for (let i = 0; i < this.gridMatrix.length; i++) {
			for (let j = 0; j < this.gridMatrix[i].length; j++) {
				if (this.gridMatrix[i][j] === startingLetter) {
					coordinates.push({
						x: j,
						y: i
					});
				}
			}
		}
		return coordinates;
	}

	private getEndingLetterCoordinates(
		word: WordSearchWord,
		startingLetterCoordinates: Coordinates
	): Coordinates | null {
		const w = word.norm;

		if (word.orientation) {
			return this.getEndingLetterCoordinatesWithOrientation(
				startingLetterCoordinates,
				w,
				WordSearchOrientations[word.orientation]
			);
		} else {
			return this.getEndingLetterCoordinatesByTryingEveryOrientation(
				startingLetterCoordinates,
				w
			);
		}
	}

	private getEndingLetterCoordinatesByTryingEveryOrientation(
		startingLetterCoordinates: Coordinates,
		word: string
	): Coordinates | null {
		let result = null;

		const orientations = Object.values(WordSearchOrientations);
		for (const orientation of orientations) {
			result = this.getEndingLetterCoordinatesWithOrientation(
				startingLetterCoordinates,
				word,
				orientation
			);

			if (result != null) {
				return result;
			}
		}

		return null;
	}

	private getEndingLetterCoordinatesWithOrientation(
		startingLetterCoordinates: Coordinates,
		word: string,
		orientation: Coordinates
	): Coordinates | null {
		const length = word.length;

		for (let i = 0; i < length; i++) {
			const x = startingLetterCoordinates.x + i * orientation.x;
			const y = startingLetterCoordinates.y + i * orientation.y;

			if (
				!this.isCoordinateValid(y, this.gridMatrix.length) ||
				!this.isCoordinateValid(x, this.gridMatrix[y].length) ||
				this.gridMatrix[y][x] !== word.charAt(i)
			) {
				break;
			}

			if (i === length - 1) {
				return { x, y };
			}
		}

		return null;
	}

	private isCoordinateValid(coordinate: number, bounds: number): boolean {
		return coordinate >= 0 && coordinate < bounds;
	}

	protected enterAnswer(answer: string): void {}

	protected isQuestionSolved(question: string, answers: string[]): boolean {
		return this.documentFacade.doesElementExist(
			`${JetPunkConfig.wordSearchPageCorrectAnswerSelectorPrefix}${question}${JetPunkConfig.wordSearchPageCorrectAnswerSelectorSuffix}`
		);
	}

	protected endQuiz(): void {}

	protected moveToNextQuestion(): void {}
}

register(PageType.WORD_SEARCH_PAGE, WordSearchSolver);
