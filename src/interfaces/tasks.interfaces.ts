export interface tasksInterfaces{
    id: number,
    title: string,
    content: string,
    finished: boolean,
    categoryId?: number | null,
    userId: number
};

export type createTaskBodyInterfaces = Omit<tasksInterfaces, 'id' | "finished">;

export type updateTaskInterface = Omit<tasksInterfaces, 'id'>;

export type updateTaskBodyInterface = Partial<updateTaskInterface>;