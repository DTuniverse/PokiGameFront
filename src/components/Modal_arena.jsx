import BasicCard_arena from './Modal_Card_arena';
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import "./Modal_arena.css";  

import { DialogContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  customDialog: {
    maxWidth: '800px', // Set your desired max width here
  },
}));


export default function Modal({ data, dataImg, indexOfSelected, imgOfSelected, setSelectedPoke }) {
  const [open, setOpen] = React.useState(false);
  const [modalImg, setModalImg] = React.useState("");
  const classes = useStyles();

  const fetchActualImg = async () => {
    try {
      const res = await fetch(imgOfSelected?.url);
      const data = await res.json();
      setModalImg(data.sprites.other.dream_world.front_default);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchActualImg();
  }, [imgOfSelected]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen}>Button to test</button>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.customDialog }} // Apply custom style class to the paper class of the Dialog component
        data={data} dataImg={dataImg} indexOfSelected={indexOfSelected} setSelectedPoke={setSelectedPoke} modalImg={modalImg}
      >
        {/* Your dialog content */}
      </Dialog>
    </div>
  );
}




  
function SimpleDialog(props) {
  const { data, dataImg, indexOfSelected, modalImg, onClose, selectedValue, open, setSelectedPoke } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} >
      {/* <DialogTitle sx={{textAlign:'center', backgroundColor:"black", color:"white"}}>{data[indexOfSelected].name.english}</DialogTitle> */}
      <BasicCard_arena sx={{width: 800}} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};
