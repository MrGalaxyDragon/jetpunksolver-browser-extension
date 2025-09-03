import Answer from './jetpunk/Answer';
import PageVar from './jetpunk/PageVar';

export class DocumentFacade {
	private pageVar: PageVar | undefined;

	constructor(private readonly document: Document) {}

	public clearElement(querySelector: string): void {
		this.typeToElement(querySelector, '');
	}

	public clickElement(querySelector: string): void {
		const element = this.document.querySelector(querySelector);
		if (element instanceof HTMLElement) {
			element.click();
		}
	}

	public doesElementExist(querySelector: string): boolean {
		return this.document.querySelector(querySelector) !== null;
	}

	public getAnswers(): Answer[] {
		return this.getPageVar().data.quiz.answers;
	}

	public getPageVar(): PageVar {
		this.pageVar ??= this.findPageVar();

		return this.pageVar;
	}

	private findPageVar(): PageVar {
		const scriptTags = this.document.getElementsByTagName('script');
		const pattern = /_page = (.*);/;

		for (const scriptTag of scriptTags) {
			const scriptTagAsString = scriptTag.innerHTML;
			const matches = scriptTagAsString.match(pattern);
			if (matches && matches.length > 1) {
				const pageVarString = matches[1];
				const pageVarObject = JSON.parse(pageVarString);
				return pageVarObject as PageVar;
			}
		}

		throw new Error('Variable "_page" not found in any "script" tag');
	}

	public typeToElement(querySelector: string, text: string): void {
		const element = this.document.querySelector(querySelector);
		if (element instanceof HTMLInputElement) {
			this.typeStringToElement(element, text);
		}
	}

	private typeStringToElement(element: HTMLInputElement, text: string): void {
		if (text !== '') {
			for (const char of text) {
				this.typeCharToElement(element, char);
			}
		} else {
			element.value = text;
		}
		element.dispatchEvent(new Event('change', { bubbles: true }));
	}

	private typeCharToElement(element: HTMLInputElement, char: string): void {
		element.dispatchEvent(new KeyboardEvent('keydown', { key: char }));
		element.dispatchEvent(new KeyboardEvent('keypress', { key: char }));

		element.value += char;

		element.dispatchEvent(new Event('input', { bubbles: true }));
		element.dispatchEvent(new KeyboardEvent('keyup', { key: char }));
	}
}
