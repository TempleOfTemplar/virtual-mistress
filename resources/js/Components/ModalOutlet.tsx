import React from 'react';
import {Modal} from "@mantine/core";
import {Outlet, useNavigate} from "react-router-dom";

const ModalOutlet = () => {
    const navigate = useNavigate();
    // https://reactrouter.com/en/main/hooks/use-outlet
    return (
        <Modal opened={true} onClose={() => {
            navigate(-1)
        }} size="auto" title="Modal size auto">
            <Outlet/>
        </Modal>
    )
};

export default ModalOutlet;
