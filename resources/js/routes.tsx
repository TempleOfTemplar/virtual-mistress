import React from "react";
import ListTasksInfinite from "@/Pages/Task/ListTasksInfinite";
import Register from "@/Pages/Auth/Register";
import CreateOrEditTask from "@/Pages/Task/CreateOrEditTask";
import ViewTask from "@/Pages/Task/ViewTask";
import ListMyTasks from "@/Pages/Task/ListMyTasks";
import Login from "@/Pages/Auth/Login";
import {createReactRouter, createRouteConfig, Outlet} from "@tanstack/react-router";
import Dashboard from "@/Pages/Dashboard";
import FavoritedTasks from "@/Pages/Task/FavoritedTasks";

// Set up a ReactLocation instance
// export const location = new ReactLocation<LocationGenerics>();
// export const routes: Route<LocationGenerics>[] = [
//     {path: "/", element: <ListTasksInfinite/>},
//     {path: "login", element: <Login/>},
//     {path: "register", element: <Register/>},
//     {
//         path: "tasks", children:
//             [
//                 {path: "/", element: <ListTasksInfinite/>},
//                 {path: "add", element: <CreateOrEditTask/>},
//                 {path: ":taskId/edit", element: <CreateOrEditTask/>},
//                 {
//                     path: ":taskId",
//                     element: <ViewTask/>,
//                     loader: ({params: {taskId}}) => {
//                         return queryClient.getQueryData(["tasks", taskId]) ??
//                             queryClient.fetchQuery(["tasks", taskId], () =>
//                                 fetchTaskById(taskId)
//                             )
//                     }
//                 },
//                 {path: "my", element: <ListMyTasks/>},
//             ]
//     },
// ];

const routeConfig = createRouteConfig().createChildren((createRoute) => [
    createRoute({
        path: '/',
        element: <Dashboard/>,
    }),
    createRoute({
        path: 'login',
        element: <Login/>
    }),
    createRoute({
        path: 'register',
        element: <Register/>
    }),
    createRoute({
        path: 'tasks',
        element: <Outlet/>
    }).createChildren((createRoute) => [
        createRoute({path: '/', element: <ListTasksInfinite/>}),
        createRoute({
            path: 'add',
            element: <CreateOrEditTask/>,
        }),
        createRoute({
            path: ':taskId/edit',
            element: <CreateOrEditTask/>,
        }),
        createRoute({
            path: ':taskId',
            parseParams: ({ taskId }) => ({ taskId: Number(taskId) }),
            stringifyParams: ({ taskId }) => ({ taskId: `${taskId}` }),
            element: <ViewTask/>,
        }),
        createRoute({
            path: 'my',
            element: <ListMyTasks/>,
        }),
        createRoute({
            path: 'favorite',
            element: <FavoritedTasks/>,
        })
    ])
]);
export const router = createReactRouter({
    routeConfig,
})

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
