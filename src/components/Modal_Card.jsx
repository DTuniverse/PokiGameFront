import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import {Link} from "react-router-dom"

export default function BasicCard({data, dataImg, indexOfSelected, modalImg, setSelectedPoke, handleClose}) {
  const pokemon = data[indexOfSelected]
  const handleClick=()=>{
    const obj = {
      data:data[indexOfSelected],
      dataImg: modalImg
    }
    setSelectedPoke(obj)
    handleClose();
  }
  
  return (
    <Card sx={{ minWidth: 300, maxWidth:400, backgroundColor:"black", color:"white"}}>
      
      <CardContent>
        
        <Box sx={{display:"flex",flexDirection:"row", alignItems:'center', justifyContent:'center'}}>
        <CardMedia
                component="img"
                sx={{ width:"50%", height:"50%" }}
                image={modalImg}
                title={`Image of ${data[indexOfSelected]?.name.english}`}
            />
            <Box sx={{flexGrow: 1, textAlign:'center'}}>
                <Typography>HP: {data[indexOfSelected]?.base.HP}</Typography> {/* <Box component='span' sx={{width:4,backgroundColor:'green'}} /> */}
                <Typography>Attack: {data[indexOfSelected]?.base.Attack}</Typography>
                <Typography>Defense: {data[indexOfSelected]?.base.Defense}</Typography>
            </Box>
        </Box> 
         
         
        <br />
        <Typography sx={{ textAlign:'center'/* mb: 0.5 */ }} color="text.secondary">
          Description
        </Typography>
        
      </CardContent>
      <CardActions sx={{flexDirection:"column"}}>
        <Button onClick={handleClick} size="medium" fullWidth="true" sx={{ color:"white", ":hover": {bgcolor: "green",color: "white"}}}><Link id="btn_choose" to="/pokemon/arena">I choose you {data[indexOfSelected]?.name.english}</Link></Button>
        <Button onClick={handleClose} size="medium" fullWidth="true" sx={{ color:"white", ":hover": {bgcolor: "red",color: "white"}}}>Not this Time!</Button>
      </CardActions>
    </Card>
  );
}
