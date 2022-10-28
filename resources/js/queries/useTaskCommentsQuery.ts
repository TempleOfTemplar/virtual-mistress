import {useQuery} from "@tanstack/react-query";
import {fetchTaskComments} from "@/services/TasksService";
import {TaskComment} from "@/Models/TaskComment";

export default function useTaskCommentsQuery(taskId?: string) {
    return useQuery<TaskComment[]>(["comments", taskId], fetchTaskComments, {keepPreviousData: false, enabled: taskId !== undefined})
};
