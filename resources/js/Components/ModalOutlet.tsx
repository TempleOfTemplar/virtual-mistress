import React from 'react';
import {Modal} from "@mantine/core";
import {Outlet, useNavigate} from "@tanstack/react-location";

const ModalOutlet = () => {
    const navigate = useNavigate();
    // https://reactrouter.com/en/main/hooks/use-outlet
    return (
        <Modal opened={true} onClose={() => {
            navigate({to: -1})
        }} size="auto" title="Modal size auto">
            <Outlet/>
        </Modal>
    )
}

export default ModalOutlet;
