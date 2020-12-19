import React, { useState } from 'react';
// import clsx from 'clsx';
import { makeStyles /*, useTheme */ } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export default function MultipleSelect({ allTags, setSelectedTagNames, selectedTagNames }) {
    // const [tagList, setTagList] = useState([]);

    const classes = useStyles();

    const handleChange = (event) => {
        console.log("in handle change:", event.target.value)


        setSelectedTagNames(event.target.value);

    };
    // console.log("list of tags once selected in tags.js:", selectedTagNames)


    return (
        <div>
            <FormControl className={classes.formControl} >
                <InputLabel id="demo-mutiple-checkbox-label">tag(s)</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={selectedTagNames}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {allTags.map((tag) => (
                        <MenuItem key={tag.tag} value={tag.tag}>
                            <Checkbox checked={selectedTagNames.indexOf(tag.tag) > -1} />
                            <ListItemText primary={tag.tag} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}