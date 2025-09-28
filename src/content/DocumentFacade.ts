import JetPunkConfig from './jetpunk/JetPunkConfig';
import PageVar from './jetpunk/page-var/PageVar';

export class DocumentFacade<P extends PageVar> {
	private pageVar: P | undefined;

	constructor(private readonly document: Document) {}

	public clearElement(querySelector: string): void {
		this.typeToElement(querySelector, '');
	}

	public clickElement(querySelector: string): void {
		const element = this.document.querySelector(querySelector);
		if (element) {
			this.clickAnyElement(element);
		}
	}

	private clickAnyElement(element: Element): void {
		if (element instanceof HTMLElement) {
			element.click();
		} else {
			const rect = element.getBoundingClientRect();

			element.dispatchEvent(
				new MouseEvent('click', {
					view: window,
					bubbles: true,
					cancelable: true,
					clientX: rect.x,
					clientY: rect.y
				})
			);
		}
	}

	public clickElementMoveToNextClickNext(start: string, end: string): void {
		const element1 = this.document.querySelector(start);
		const element2 = this.document.querySelector(end);

		if (element1 && element2) {
			this.clickAnyElement(element1);

			this.moveFromElementToElement(element1, element2);

			this.clickAnyElement(element2);
		}
	}

	private moveFromElementToElement(element1: Element, element2: Element): void {
		const startRect = element1.getBoundingClientRect();
		const endRect = element2.getBoundingClientRect();

		const startX = startRect.left + startRect.width / 2;
		const startY = startRect.top + startRect.height / 2;
		const endX = endRect.left + endRect.width / 2;
		const endY = endRect.top + endRect.height / 2;

		const steps = 10;
		for (let i = 1; i <= steps; i++) {
			const x = startX + (endX - startX) * (i / steps);
			const y = startY + (endY - startY) * (i / steps);

			this.document.elementFromPoint(x, y)?.dispatchEvent(
				new MouseEvent('mousemove', {
					bubbles: true,
					clientX: x,
					clientY: y
				})
			);
		}
	}

	public convertTextToMarkup(text: string): string {
		const el = document.createElement('textarea');
		// eslint-disable-next-line no-unsanitized/property
		el.innerHTML = text;
		return el.value;
	}

	public doesElementExist(querySelector: string): boolean {
		return this.document.querySelector(querySelector) !== null;
	}

	public emulateClickOnSvgPathElement(querySelector: string): void {
		const element = this.document.querySelector(querySelector);
		if (element instanceof SVGPathElement) {
			const svgElement = element.ownerSVGElement;
			if (!svgElement) return;

			const coordinates = this.getPathPageCoordinates(element, svgElement);
			if (coordinates) {
				this.executeClickOnSvgElementWithPosition(svgElement, coordinates.x, coordinates.y);
			}
		}
	}

	private getPathPageCoordinates(
		path: SVGPathElement,
		svg: SVGSVGElement
	): { x: number; y: number } | null {
		const bbox = path.getBBox();

		const ctm = path.getScreenCTM();
		if (!ctm) return null;

		const ctx = this.createCanvas(bbox);
		if (!ctx) return null;

		const path2d = new Path2D(path.getAttribute('d') || '');

		return this.findPointInPathLoop(svg, bbox, ctm, ctx, path2d);
	}

	private createCanvas(bbox: DOMRect): CanvasRenderingContext2D | null {
		const canvas = document.createElement('canvas');
		canvas.width = Math.ceil(bbox.width);
		canvas.height = Math.ceil(bbox.height);
		return canvas.getContext('2d');
	}

	private findPointInPathLoop(
		svg: SVGSVGElement,
		bbox: DOMRect,
		ctm: DOMMatrix,
		ctx: CanvasRenderingContext2D,
		path2d: Path2D
	): { x: number; y: number } | null {
		const maxAttempts = JetPunkConfig.mapQuiz2PointInPathSearchAttempts;

		for (let i = 0; i < maxAttempts; i++) {
			const coordinates = this.findPointInPath(svg, bbox, ctm, ctx, path2d);
			if (coordinates) {
				return coordinates;
			}
		}

		return null;
	}

	private findPointInPath(
		svg: SVGSVGElement,
		bbox: DOMRect,
		ctm: DOMMatrix,
		ctx: CanvasRenderingContext2D,
		path2d: Path2D
	): { x: number; y: number } | null {
		const px = bbox.x + Math.random() * bbox.width;
		const py = bbox.y + Math.random() * bbox.height;

		if (ctx.isPointInPath(path2d, px, py)) {
			return this.calculateCoordinates(svg, ctm, px, py);
		} else {
			return null;
		}
	}

	private calculateCoordinates(
		svg: SVGSVGElement,
		ctm: DOMMatrix,
		px: number,
		py: number
	): { x: number; y: number } {
		const pt = svg.createSVGPoint();
		pt.x = px;
		pt.y = py;
		const screenPt = pt.matrixTransform(ctm);

		return {
			x: screenPt.x + window.scrollX,
			y: screenPt.y + window.scrollY
		};
	}

	private executeClickOnSvgElementWithPosition(
		svgElement: SVGSVGElement,
		x: number,
		y: number
	): void {
		svgElement.dispatchEvent(
			new MouseEvent('click', {
				view: window,
				bubbles: true,
				cancelable: true,
				clientX: x,
				clientY: y
			})
		);
	}

	public getPageVar(): P {
		this.pageVar ??= this.findPageVar();

		return this.pageVar;
	}

	private findPageVar(): P {
		const scriptTags = this.document.getElementsByTagName('script');
		const pattern = /_page = (.*);/;

		for (const scriptTag of scriptTags) {
			const scriptTagAsString = scriptTag.innerHTML;
			const matches = scriptTagAsString.match(pattern);
			if (matches && matches.length > 1) {
				const pageVarString = matches[1];
				const pageVarObject = JSON.parse(pageVarString);
				return pageVarObject as P;
			}
		}

		throw new Error('Variable "_page" not found in any "script" tag');
	}

	public isPageVarLoaded(): boolean {
		try {
			this.findPageVar();
			return true;
		} catch (err) {
			console.info(err);
			return false;
		}
	}

	public getInnerHtmlOfElement(querySelector: string): string | undefined {
		const element = this.document.querySelector(querySelector);
		if (element) {
			return element.innerHTML.trim();
		}
	}

	public getTextOfElement(querySelector: string): string | undefined {
		const element = this.document.querySelector(querySelector);
		if (element) {
			return element.textContent.trim();
		}
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
		}

		element.value = text;

		element.dispatchEvent(new Event('change', { bubbles: true }));
		element.dispatchEvent(new Event('input', { bubbles: true }));
	}

	private typeCharToElement(element: HTMLInputElement, char: string): void {
		element.dispatchEvent(new KeyboardEvent('keydown', { key: char }));
		element.dispatchEvent(new KeyboardEvent('keypress', { key: char }));

		element.value += char;

		element.dispatchEvent(new KeyboardEvent('keyup', { key: char }));
	}
}
