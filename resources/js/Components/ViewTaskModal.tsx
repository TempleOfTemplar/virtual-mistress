import NiceModal, {useModal} from '@ebay/nice-modal-react';
import {Modal} from '@mantine/core';
import React from "react";
import {useMatch} from "@tanstack/react-location";
import {LocationGenerics} from "@/routes";

export default NiceModal.create(({outlet}) => {
    console.log("outlet", outlet);
    const modal = useModal();
    const {
        params: { taskId },
    } = useMatch<LocationGenerics>();
    const mm = document.getElementById('modal-manager');
    return (
        <Modal
            withinPortal={false}
            target={mm}
            size="auto"
            onClose={() => {
                modal.resolve()
            }}
            opened={true}
        >{outlet}</Modal>
    );
});
