import React from 'react';
import {AppShell, Footer} from "@mantine/core";
import {AnimateSharedLayout, LayoutGroup} from "framer-motion";
import {Outlet} from '@tanstack/react-location';
import classes from './Layout.module.css';
import AppNavbar from "@/Components/NavBar/NavBar";

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
