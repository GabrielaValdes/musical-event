export interface IResponse<T = void>{
    success: boolean;
    errors: string[];
    result:T;
}

export interface IResponsePaginator<pages,T = void>{
    totalPages: pages;
    success: boolean;
    errors: string[];
    result:T;
}