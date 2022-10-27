import React, {useState} from 'react';
import {ColorScheme, createStyles} from "@mantine/core";
import {QueryClient} from "@tanstack/react-query";
import {Router} from '@tanstack/react-location';
import {routes} from "@/routes";
import {location} from './routes';
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import Layout from "@/Components/Layout/Layout";
import './global-styles.css';

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

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <QueryParamProvider adapter={ReactRouter6Adapter}>
//             <AppShell
//                 footer={
//                     <Footer height={60} p="md">
//                         Application footer
//                     </Footer>
//                 }
//                 padding={0}
//                 header={
//                     <AppHeader>
//                     </AppHeader>
//                 }
//             >
//                 <AnimateSharedLayout>
//                     <Outlet/>
//                 </AnimateSharedLayout>
//             </AppShell>
//         </QueryParamProvider>,
//         children: [
//             {
//                 path: 'login',
//                 element: <Login/>
//             },
//             {
//                 path: 'register',
//                 element: <Register/>
//             },
//             {
//                 path: 'tasks',
//                 element: <ListTasksInfinite/>,
//                 children: [
//                     {
//                         path: "edit/:taskId",
//                         element: <CreateOrEditTask/>
//                     },
//                     {
//                         path: ":taskId",
//                         element: <ViewTask/>
//                     },
//                     {
//                         path: "dashboard",
//                         element: <Dashboard/>,
//
//                     },
//                 ],
//             }
//         ]
//     },
// ]);
const lightTheme = createTheme({
    type: 'light',
    theme: {}
})
const darkTheme = createTheme({
    type: 'dark',
    theme: {}
})

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

    return <NextThemesProvider defaultTheme="dark"
                               attribute="class"
                               value={{
                                   light: lightTheme.className,
                                   dark: darkTheme.className
                               }}>
        <NextUIProvider>
            <Router
                location={location}
                routes={routes}
                defaultPendingElement={
                    <div>
                        ...SPINNER...
                    </div>
                }
                // defaultLinkPreloadMaxAge={defaultLinkPreloadMaxAge}
                // defaultLoaderMaxAge={defaultLoaderMaxAge}
                // defaultPendingMs={defaultPendingMs}
                // defaultPendingMinMs={defaultPendingMinMs}
                // Normally, the options above aren't changing, but for this particular
                // example, we need to key the router when they change
                // key={[
                //     defaultLinkPreloadMaxAge,
                //     defaultLoaderMaxAge,
                //     defaultPendingMs,
                //     defaultPendingMinMs,
                // ].join(".")}
            >
                <Layout/>
                {/*<ReactLocationDevtools position="bottom-right" />*/}
            </Router>
            {/*<RouterProvider router={router}/>*/}

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
        </NextUIProvider>
    </NextThemesProvider>
}

export default App;
