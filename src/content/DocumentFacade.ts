import PageVar from "./jetpunk/PageVar";

export class DocumentFacade {
    private pageVar: PageVar | undefined;

    constructor(private readonly document: Document) {}

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
}