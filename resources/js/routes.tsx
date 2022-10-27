import {MakeGenerics, ReactLocation, Route} from "@tanstack/react-location";
import React from "react";
import ListTasksInfinite from "@/Pages/Task/ListTasksInfinite";
import Register from "@/Pages/Auth/Register";
import CreateOrEditTask from "@/Pages/Task/CreateOrEditTask";
import ViewTask from "@/Pages/Task/ViewTask";
import ListMyTasks from "@/Pages/Task/ListMyTasks";
import Login from "@/Pages/Auth/Login";
import {QueryClient} from "@tanstack/react-query";
import {fetchTaskById} from "@/services/TasksService";

export type LocationGenerics = MakeGenerics<{
    LoaderData: {};
    Params: {
        taskId: string;
    };
    Search: {
        search?: string,
        category?: string,
        toys?: Array<string>,
        tags?: Array<string>,
    };
}>;
// Set up a ReactLocation instance
export const location = new ReactLocation<LocationGenerics>();
const queryClient = new QueryClient();
export const routes: Route<LocationGenerics>[] = [
    {path: "/", element: <ListTasksInfinite/>},
    {path: "login", element: <Login/>},
    {path: "register", element: <Register/>},
    {
        path: "tasks", children:
            [
                {path: "/", element: <ListTasksInfinite/>},
                {path: "add", element: <CreateOrEditTask/>},
                {path: ":taskId/edit", element: <CreateOrEditTask/>},
                {   path: ":taskId",
                    element: <ViewTask/>,
                    loader: ({ params: { taskId } }) => {
                        return queryClient.getQueryData(["tasks", taskId]) ??
                            queryClient.fetchQuery(["tasks", taskId], () =>
                                fetchTaskById(taskId)
                            )
                    }
                },
                {path: "my", element: <ListMyTasks/>},
            ]
    },
];

{/*    <Route index element={<Dashboard/>}/>*/
}
{/*    <Route path='login' element={<Login/>}/>*/
}
{/*    <Route path='register' element={<Register/>}/>*/
}
{/*    <Route path="tasks">*/
}
{/*        <Route path='' element={<ListTasks/>}/>*/
}
{/*        <Route path='add' element={<CreateOrEditTask/>}/>*/
}
{/*        <Route path=':taskId'*/
}
{/*               element={<ViewTask/>}*/
}
{/*        />*/
}
{/*        <Route path='edit/:taskId' element={<CreateOrEditTask/>}/>*/
}
{/*        <Route path='favorite' element={<FavoritedTasks/>}/>*/
}
{/*        <Route path='my' element={<ListMyTasks/>}/>*/
}
{/*    </Route>*/
}
