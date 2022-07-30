import React from 'react';
import {Button, Modal, Paper} from "@mui/material";
import {Form, Formik} from "formik";
import InputHandler from "../input-handler/inputHandler";
import {v4 as uuid} from 'uuid'
import {useDispatch} from "react-redux";
import * as Yup from 'yup'
import {createNewFolder} from "../../store/actions/handleFolders";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {md: "420px", xs: "90%"},
    border: 'none',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    outline: "none",
};

const fileState = {
    name: "", files: [],
}

const validation = Yup.object({
    name: Yup.string().required()
})

const CreateFolderModal = ({open, setOpen}) => {
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    return (<Modal
        open={open}
        onClose={handleClose}
    >
        <Paper sx={style}>
            <Formik
                validationSchema={validation}
                onSubmit={(values) => {
                    dispatch(createNewFolder({...values, type: "folder", gid: uuid()}))
                    setOpen(false)
                }}
                initialValues={fileState}
            >
                {() => (<Form>
                    <InputHandler label="Folder Name" name={"name"}/>
                    <Button type={"submit"} sx={{mt: 2}} fullWidth variant={"outlined"}>Create</Button>
                </Form>)}
            </Formik>
        </Paper>
    </Modal>);
};

export default CreateFolderModal;