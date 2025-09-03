import Answer from "./Answer";
import { PageType } from "./PageType";

export default interface PageVar {
    data: {
        quiz: {
            answers: Answer[],
        },
    },
    pageType: PageType,
};