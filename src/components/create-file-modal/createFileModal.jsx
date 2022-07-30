import React from 'react';
import {Button, Modal, Paper} from "@mui/material";
import {Form, Formik} from "formik";
import InputHandler from "../input-handler/inputHandler";
import {v4 as uuid} from 'uuid'
import {createNewFile} from "../../store/actions/handleFiles";
import {useDispatch} from "react-redux";
import * as Yup from 'yup'

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
    name: "", tags: [], groups: [], content: "",
}

const validation = Yup.object({
    name: Yup.string().required()
})

const CreateFileModal = ({open, setOpen}) => {
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
                        dispatch(createNewFile({...values, type: "file", fid: uuid(), date: Date.now()}))
                        setOpen(false)
                    }}
                    initialValues={fileState}
                >
                    {() => (<Form>
                            <InputHandler label="File Name" name={"name"}/>
                            <Button type={"submit"} sx={{mt: 2}} fullWidth variant={"outlined"}>Create</Button>
                        </Form>)}
                </Formik>
            </Paper>
        </Modal>);
};

export default CreateFileModal;