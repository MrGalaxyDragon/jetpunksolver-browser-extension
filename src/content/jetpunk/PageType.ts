export const PageType = {
    CLICK_GAME: 'click-game',
    DAILY_GAME: 'daily-game',
    MAP_GAME: 'map-game',
    MULTIPLE_CHOICE_GAME: 'mc-game',
    PHOTO_GAME: 'photo-game',
    SUDDEN_DEATH_GAME: 'sd-game',
    TEXT_GAME: 'text-game',
    TILE_GAME: 'tile-game',
} as const;

export type PageType = (typeof PageType)[keyof typeof PageType];