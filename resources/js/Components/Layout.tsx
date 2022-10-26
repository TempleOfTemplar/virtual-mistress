import React from 'react';
import {AppShell, Footer} from "@mantine/core";
import AppHeader from "@/Components/AppHeader";
import {AnimateSharedLayout, LayoutGroup} from "framer-motion";
import { Outlet } from '@tanstack/react-location';

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
                <AppHeader>
                </AppHeader>
            }
        >
            <LayoutGroup>
                <Outlet/>
            </LayoutGroup>
        </AppShell>
    );
};

export default Layout;
