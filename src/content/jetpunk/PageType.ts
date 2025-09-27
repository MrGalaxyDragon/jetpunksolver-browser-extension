export const PageType = {
	CLICK_GAME: 'click-game',
	DAILY_GAME: 'daily-game',
	MAP_GAME: 'map-game',
	MAP_GAME_2: 'map-game-2',
	MULTIPLE_CHOICE_GAME: 'mc-game',
	PHOTO_GAME: 'photo-game',
	SUDDEN_DEATH_GAME: 'sd-game',
	TEXT_GAME: 'text-game',
	TILE_GAME: 'tile-game',
	WORD_SEARCH_PAGE: 'word-search-page'
} as const;

export type PageType = (typeof PageType)[keyof typeof PageType];
