export interface Task {
    id: number;
    title: string;
    description?: string;
    dueDate: Date;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Pending' | 'Completed';
}