//#region  GET GENRES / GET GENRE
export interface IResponseGenre {
	description: string;
	id: number;
	status: boolean;
}
//#endregion

export interface IResponseGenreById {
	description: string;
	id: number;
	status: boolean;
}

export interface IRequestCreateGenre {
	description: string;
}

