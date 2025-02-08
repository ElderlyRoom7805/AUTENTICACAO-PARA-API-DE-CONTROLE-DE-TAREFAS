export interface categoriesInterfaces{
    id: number,
    name: string,
    userId: number
}

export type createCategoryBodyInterfaces = Omit<categoriesInterfaces, 'id'>