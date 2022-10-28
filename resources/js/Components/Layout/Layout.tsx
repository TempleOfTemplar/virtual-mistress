import React from 'react';
import {AppShell, Footer} from "@mantine/core";
import AppNavbar from "@/Components/NavBar/NavBar";
import { Outlet } from '@tanstack/react-router';

const Layout = () => {
    return (
        <AppShell
            footer={
                <Footer height={60} p="md">
                    Application footer
                </Footer>
            }
            padding={0}
            header={
                <AppNavbar/>
            }
        >
                <Outlet/>
        </AppShell>
    );
};

export default Layout;
