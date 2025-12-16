
export interface Note {
    id: number,
    title: string,
    body: string,
    createdAt: string,
    durationSections?: number,
    tags: string[],
    isFavourite: boolean;
    status: 'ready' | 'generating'

}

