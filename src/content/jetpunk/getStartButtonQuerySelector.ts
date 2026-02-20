import { DocumentFacade } from '../DocumentFacade';
import JetPunkConfig from './JetPunkConfig';
import PageVar from './page-var/PageVar';
import { PageType } from './PageType';

export default function getStartButtonQuerySelector(
	documentFacade: DocumentFacade<PageVar>
): string | null {
	const pageVar = documentFacade.getPageVar();
	if (pageVar.pageType === PageType.WORD_SEARCH_PAGE) {
		return null;
	} else if (pageVar.pageType === PageType.TYPING_SPEED_TEST) {
		return JetPunkConfig.typingSpeedTestStartButtonQuerySelector;
	} else if (pageVar.pageType === PageType.DAILY_GAME) {
		return JetPunkConfig.dailyQuizStartButtonQuerySelector;
	} else {
		return JetPunkConfig.startButtonQuerySelector;
	}
}
