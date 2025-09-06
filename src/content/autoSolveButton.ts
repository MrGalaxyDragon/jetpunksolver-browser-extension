import JetPunkConfig from './jetpunk/JetPunkConfig';

const autoSolveButtonConfig = {
	attributes: {
		id: 'autosolve-button',
		title: 'Click here to automatically solve this Quiz.'
	},
	text: 'Auto-Solve'
};

const startButtonHolderStyles: Partial<CSSStyleDeclaration> = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-around'
};

export function createAutoSolveButton(startButtonQuerySelector: string): HTMLButtonElement {
	const startButton = getStartButton(startButtonQuerySelector);

	const autoSolveButton = copyStartButton(startButton);
	setAttributes(autoSolveButton);
	setText(autoSolveButton);

	modifyStartButtonHolder(startButton, autoSolveButton);

	copyStyles(
		`${JetPunkConfig.gameGroupSelector} ${startButtonQuerySelector}`,
		`${JetPunkConfig.gameGroupSelector} #${autoSolveButtonConfig.attributes.id}`
	);

	return autoSolveButton;
}

function getStartButton(startButtonQuerySelector: string): HTMLButtonElement {
	const startButton = document.querySelector(startButtonQuerySelector);

	if (startButton instanceof HTMLButtonElement) {
		return startButton;
	} else {
		throw new Error('Start Button was not found.');
	}
}

function copyStartButton(startButton: HTMLButtonElement): HTMLButtonElement {
	const autoSolveButton = startButton.cloneNode(true);

	if (autoSolveButton instanceof HTMLButtonElement) {
		return autoSolveButton;
	} else {
		throw new Error('Auto-Solve Button was not created successfully.');
	}
}

function setAttributes(autoSolveButton: HTMLButtonElement): void {
	for (const [key, value] of Object.entries(autoSolveButtonConfig.attributes)) {
		autoSolveButton.setAttribute(key, value);
	}

	autoSolveButton.removeAttribute('disabled');
}

function setText(autoSolveButton: HTMLButtonElement): void {
	const autoSolveButtonSpan = autoSolveButton.querySelector('span');
	if (autoSolveButtonSpan) {
		autoSolveButtonSpan.textContent = autoSolveButtonConfig.text;
	}
}

function modifyStartButtonHolder(
	startButton: HTMLButtonElement,
	autoSolveButton: HTMLButtonElement
): void {
	const startButtonHolder = startButton.parentElement;

	if (!startButtonHolder) throw new Error('Start Button Parent Element was not found.');

	for (const [key, value] of Object.entries(startButtonHolderStyles)) {
		(startButtonHolder.style as any)[key] = value;
	}

	startButtonHolder.appendChild(autoSolveButton);
}

function copyStyles(oldSelector: string, newSelector: string): void {
	const copiedStylesElement = createCopiedStylesElement();
	for (const sheet of Array.from(document.styleSheets)) {
		copyStyleSheet(oldSelector, newSelector, copiedStylesElement, sheet);
	}
}

function createCopiedStylesElement(): HTMLStyleElement {
	const copiedStylesElement = document.createElement('style');
	document.head.appendChild(copiedStylesElement);
	return copiedStylesElement;
}

function copyStyleSheet(
	oldSelector: string,
	newSelector: string,
	copiedStylesElement: HTMLStyleElement,
	sheet: CSSStyleSheet
): void {
	try {
		const rules = sheet.cssRules;
		for (const rule of rules) {
			copyRule(oldSelector, newSelector, copiedStylesElement, rule);
		}
	} catch (e) {
		console.warn('Cannot access stylesheet', e);
	}
}

function copyRule(
	oldSelector: string,
	newSelector: string,
	copiedStylesElement: HTMLStyleElement,
	rule: unknown
): void {
	if (rule instanceof CSSStyleRule && rule.selectorText === oldSelector) {
		const newRule = `${newSelector} { ${rule.style.cssText} }`;

		copiedStylesElement.appendChild(document.createTextNode(newRule));
	}
}
