import React from 'react'
import './Checklist.scss'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Checklist = ({title,done}) => {

    return (
        <div className="checklist">
            <FormControlLabel 
            control={
                <Checkbox
                />
            }
            label={title}/>

            <IconButton>
                <MoreHorizIcon/>
            </IconButton>
        </div>
    )
}

export default Checklist
