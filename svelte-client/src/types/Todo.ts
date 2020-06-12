export interface Todo {
    todoId: string
    createdAt: string
    dueDate: string
    name: string
    done: boolean
    attachmentUrl?: string
}