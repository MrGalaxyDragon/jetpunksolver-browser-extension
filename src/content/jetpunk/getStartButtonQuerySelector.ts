import { DocumentFacade } from '../DocumentFacade';
import JetPunkConfig from './JetPunkConfig';
import PageVar from './page-var/PageVar';
import { PageType } from './PageType';

export default function getStartButtonQuerySelector(
	documentFacade: DocumentFacade<PageVar>
): string {
	const pageVar = documentFacade.getPageVar();
	if (pageVar.pageType === PageType.DAILY_GAME) {
		return JetPunkConfig.dailyQuizStartButtonQuerySelector;
	} else {
		return JetPunkConfig.startButtonQuerySelector;
	}
}
