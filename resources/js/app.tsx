import React, {useState} from 'react';
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./Pages/Auth/Register";
import ViewTask from "./Pages/Task/ViewTask";
import {AppShell, ColorScheme, ColorSchemeProvider, createStyles, Footer, MantineProvider} from "@mantine/core";
import AppHeader from "@/Components/AppHeader";
import {NotificationsProvider} from "@mantine/notifications";
import {QueryClient} from "@tanstack/react-query";
import {taskLoader} from "@/Loaders/TaskLoader";
import {ReactRouter6Adapter} from "use-query-params/adapters/react-router-6";
import {QueryParamProvider} from "use-query-params";
import ListTasksInfinite from "@/Pages/Task/ListTasksInfinite";
import {AnimateSharedLayout} from 'framer-motion';
import {ModalsProvider} from '@mantine/modals';
import NiceModal from '@ebay/nice-modal-react';
import CreateOrEditTask from "@/Pages/Task/CreateOrEditTask";

const simultaneousAnimations = ({
                                    hideEnteringElements,
                                    animateEnteringElements,
                                    animateExitingElements,
                                    animateFlippedElements
                                }: any) => {
    hideEnteringElements();
    animateExitingElements();
    animateFlippedElements();
    animateEnteringElements();
};

const useStyles = createStyles((theme) => ({
        layout: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            main: {
                paddingTop: 24
            }
        },
    })
);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 10,
        },
    },
});
// <Route index element={<Dashboard/>}/>*/}
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
{/*               loader: ({ params }) => {*/
}
{/*                    return fakeGetTeam(params.teamId);*/
}
{/*                }*/
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
{/*    <Route path="*" element={<Navigate to={'tasks'}/>}/>*/
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <QueryParamProvider adapter={ReactRouter6Adapter}>
            <AppShell
                footer={
                    <Footer height={60} p="md">
                        Application footer
                    </Footer>
                }
                padding={0}
                header={
                    <AppHeader>
                    </AppHeader>
                }
            >
                <AnimateSharedLayout>
                    <Outlet/>
                </AnimateSharedLayout>
            </AppShell>
        </QueryParamProvider>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
            {
                path: 'tasks',
                element: <ListTasksInfinite/>,
                children: [
                    {
                        path: "edit/:taskId",
                        element: <CreateOrEditTask/>
                    },
                    {
                        path: ":taskId",
                        element: <ViewTask/>
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard/>,

                    },
                ],
            }
        ]
    },

]);

function App() {
    //Getting isAuthenticated store value from Authentication reducer.
    // const {isAuthenticated, validateUserLoader} = useSelector(state => state.authenticateReducer)

    // const {userInfo: user} = useSelector((state) => state.user);
    //const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         dispatch({
    //             type: actions.GET_AUTH_USER,
    //         });
    //     }
    // }, [])

    // if (validateUserLoader) {
    //     return <Spinner/>;
    // }
    const {classes, theme, cx} = useStyles();
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
            <ModalsProvider>
                <NotificationsProvider>
                    <NiceModal.Provider>
                        <RouterProvider router={router}/>
                    </NiceModal.Provider>

                    {/*<Routes>*/}
                    {/*    <Route index element={<Dashboard/>}/>*/}
                    {/*    <Route path='login' element={<Login/>}/>*/}
                    {/*    <Route path='register' element={<Register/>}/>*/}
                    {/*    <Route path="tasks">*/}
                    {/*        <Route path='' element={<ListTasks/>}/>*/}
                    {/*        <Route path='add' element={<CreateOrEditTask/>}/>*/}
                    {/*        <Route path=':taskId'*/}
                    {/*               element={<ViewTask/>}*/}
                    {/*        />*/}
                    {/*        <Route path='edit/:taskId' element={<CreateOrEditTask/>}/>*/}
                    {/*        <Route path='favorite' element={<FavoritedTasks/>}/>*/}
                    {/*        <Route path='my' element={<ListMyTasks/>}/>*/}
                    {/*    </Route>*/}
                    {/*    <Route path="*" element={<Navigate to={'tasks'}/>}/>*/}
                    {/*</Routes>*/}
                </NotificationsProvider>
            </ModalsProvider>
        </MantineProvider>
    </ColorSchemeProvider>
}

export default App;
