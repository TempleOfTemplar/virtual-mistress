import {useMutation, useQueryClient} from "@tanstack/react-query";
import {setTaskFavorite} from "@/services/TasksService";
import {Task} from "@/Models/Task";

export const useUpdateIsFavorite = (key = "tasks", query?: any) => {
    const queryClient = useQueryClient();
    const queryKeyArray = [key];
    if (query) {
        queryKeyArray.push(query);
    }
    return useMutation(
        setTaskFavorite,
        {
            // When mutate is called:
            onMutate: async (taskId: string) => {
                await queryClient.cancelQueries(queryKeyArray);
                const previousTasks = queryClient.getQueryData<Task[]>(queryKeyArray);
                if (previousTasks) {
                    const taskToUpdateIndex = previousTasks.findIndex(task => task.id.toString() === taskId);
                    const tasksToUpdate = JSON.parse(JSON.stringify(previousTasks));
                    tasksToUpdate[taskToUpdateIndex].has_favorited = !tasksToUpdate[taskToUpdateIndex].has_favorited;
                    queryClient.setQueryData<Task[]>(queryKeyArray, [
                        ...tasksToUpdate,
                    ])
                }
                return previousTasks ? {previousTasks} : {previousTasks: []};
            },
            // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err, variables, context) => {
                if (context) {
                    queryClient.setQueryData<Task[]>(queryKeyArray, [...context.previousTasks])
                }
            },
            // Always refetch after error or success:
            onSuccess: () => {
                queryClient.refetchQueries(['favoriteTasks'])
            },
        },
    )
}
