import NiceModal, {useModal} from '@ebay/nice-modal-react';
import {Modal} from '@mantine/core';
import {motion} from "framer-motion";
import React from "react";
import {useParams} from "react-router-dom";

export default NiceModal.create(({outlet}) => {
    console.log("outlet", outlet);
    const modal = useModal();
    let {taskId} = useParams<string>();
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
