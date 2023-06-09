import BasicCard from './Modal_Card';
import * as React from 'react';
  import PropTypes from 'prop-types';
  import Button from '@mui/material/Button';
  import DialogTitle from '@mui/material/DialogTitle';
  import Dialog from '@mui/material/Dialog';
  import Typography from '@mui/material/Typography';
export default function Modal({data, dataImg, indexOfSelected, imgOfSelected, setSelectedPoke, playerName, setPlayerName}) {
    const [open, setOpen] = React.useState(false);
    const [modalImg, setModalImg] = React.useState("")
    const fetchActualImg = async () => {
      try {
        const res = await fetch(imgOfSelected.url)
      const data = await res.json()
      setModalImg(data.sprites.other.dream_world.front_default)
      // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  
    React.useEffect(()=>{
      fetchActualImg()
    },[imgOfSelected])

    React.useEffect(()=>{
      if (indexOfSelected!==null){
        setOpen(true)
      }
    },[indexOfSelected])

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      
    };
  
    return (
      <div>
        <Typography variant="subtitle1" component="div">
          Selected: {data[indexOfSelected].name.english}
        </Typography>
        <br />
        <Button variant="outlined" onClick={handleClickOpen}>
          Open simple dialog
        </Button>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          data={data} dataImg={dataImg} indexOfSelected={indexOfSelected} setSelectedPoke={setSelectedPoke} modalImg={modalImg} playerName={playerName} setPlayerName={setPlayerName}
        />
      </div>
    );
  
}
  
function SimpleDialog(props) {
  const { data, dataImg, indexOfSelected, modalImg, onClose, selectedValue, open, setSelectedPoke, playerName, setPlayerName } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  return (
    <Dialog onClose={handleClose} open={open} className="modal-card-parent">
      {/* <DialogTitle className="modal-card-title" sx={{textAlign:'center', color:"white", backgroundColor:"black"}}>{data[indexOfSelected].name.english}</DialogTitle> */}
      <BasicCard data={data} dataImg={dataImg} indexOfSelected={indexOfSelected} modalImg={modalImg} setSelectedPoke={setSelectedPoke} handleClose={handleClose} playerName={playerName} setPlayerName={setPlayerName} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};
