import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
// import {
//     createNewTag
// } from '../api';


const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },

});

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& .MuiTextField-root': {
//         margin: theme.spacing(1),
//         width: 200,
//       },
//     },
//   }));

function SimpleDialog(props) {

    const classes = useStyles();

    const { onClose, selectedValue, open, allTags, setNewTag, newTag, setAllTags, createNewTag } = props;
    const [validTag, setValidTag] = useState(true)




    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleNewTag = (event) => {
        event.preventDefault()
        setValidTag(true)
        const newTag = event.target.value

        allTags.forEach(tag => {

            if (newTag === tag.tag) {
                console.log("tag is undefined or already created")
                setValidTag(false)

            } else {
                console.log("all good")
                // setNewTag(newTag)

            }

        })
        setNewTag(newTag)

    }

    const buildNewTag = async (event) => {

        event.preventDefault()
        const theNewTag = { tag: newTag }
        // console.log("new tag on click:", theNewTag)



        const allTags = await createNewTag(theNewTag)
        // console.log("all tags returned from db", allTags)
        handleClose()
        setAllTags(allTags)

    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>

            {validTag ?
                <>
                    <form className={classes.root} noValidate autoComplete="off" style={{ margin: "50px", padding: "10px" }}>
                        <TextField id="standard-basic" label="tags" onChange={handleNewTag} />
                    </form>
                    <Button variant="contained" color="primary" style={{ margin: "auto", marginBottom: "30px" }} onClick={buildNewTag}>
                        Add
                  </Button>  </>

                :
                <>
                    <form className={classes.root} noValidate autoComplete="off" style={{ margin: "50px", padding: "10px" }} onChange={handleNewTag} >
                        <TextField
                            error
                            id="filled-error"
                            label="Error"
                            value={newTag}
                            helperText="Duplicate tag."
                        />
                    </form>
                    <Button disabled={true} variant="contained" color="primary" style={{ margin: "auto", marginBottom: "30px" }} >Add
        </Button> </>}




        </Dialog >
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ allTags, newTag, setNewTag, setAllTags, createNewTag, buildNewTag }) {
    const [open, setOpen] = useState(false);
    // const [selectedValue, setSelectedValue] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // setSelectedValue(value);
    };

    return (
        <div>

            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Create New Tag
            </Button>
            <SimpleDialog /*selectedValue={selectedValue}*/ open={open} onClose={handleClose} allTags={allTags} newTag={newTag} setNewTag={setNewTag} setAllTags={setAllTags} createNewTag={createNewTag} buildNewTag={buildNewTag} />
        </div>
    );
}