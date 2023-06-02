import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal_arena.css';

const Modal = ({ data, dataImg, indexOfSelected, imgOfSelected, setSelectedPoke }) => {
  const [open, setOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");

  const fetchActualImg = async () => {
    try {
      const res = await fetch(imgOfSelected?.url);
      const data = await res.json();
      setModalImg(data.sprites.other.dream_world.front_default);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActualImg();
  }, [imgOfSelected]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen}>Button to test</button>
      {open && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            {/* Your custom dialog content */}
          </div>
          <button className="custom-modal-close" onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

Modal.propTypes = {
  data: PropTypes.array,
  dataImg: PropTypes.array,
  indexOfSelected: PropTypes.number,
  imgOfSelected: PropTypes.object,
  setSelectedPoke: PropTypes.func,
};

export default Modal;




  
// function SimpleDialog(props) {
//   const { data, dataImg, indexOfSelected, modalImg, onClose, selectedValue, open, setSelectedPoke } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

//   const handleListItemClick = (value) => {
//     onClose(value);
//   };

//   return (
//     <Dialog onClose={handleClose} open={open} >
//       {/* <DialogTitle sx={{textAlign:'center', backgroundColor:"black", color:"white"}}>{data[indexOfSelected].name.english}</DialogTitle> */}
//       <BasicCard_arena sx={{width: 800}} />
//     </Dialog>
//   );
// }

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   // selectedValue: PropTypes.string.isRequired,
// };
