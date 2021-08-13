export interface User {
    id?: string;
    uid?: string;
    name?: string;
    email?: string;
    password?: string;
    errors?: any;
    errorMessage?:string;
    success?: boolean;
    isAuthenticated?: boolean;
    authState?:number;
}
export interface Book{

    id?: string;    
    author?: string;
    title?: string;
    description?: string;    
    uid?: string;
    rating?: number

}
export interface Books{
    books?: Book[];
    uid?: string;
    errors?: any;
    errorMessage?:string;
    success?: boolean;  
    isError?: boolean;  
}