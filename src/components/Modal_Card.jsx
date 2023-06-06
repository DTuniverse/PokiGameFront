import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import {Link} from "react-router-dom"
import TextField from '@mui/material/TextField';
import { CardHeader } from '@mui/material';


export default function BasicCard({data, dataImg, indexOfSelected, modalImg, setSelectedPoke, handleClose, playerName, setPlayerName}) {
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
    <Card sx={{ minWidth: 300, maxWidth:400, color:"white"}}>
      {/* font-family: Shojumaru, cursive; */}
      <CardContent >
      
        
          <Typography sx={{textAlign:"center", fontFamily:"Shojumaru, cursive"}} variant="h4">{data[indexOfSelected].name.english}</Typography>
        
        <Box sx={{display:"flex",flexDirection:"row", alignItems:'center', justifyContent:'center'}}>
        
        <CardMedia
                component="img"
                sx={{ width:"50%", height:"50%" }}
                image={modalImg}
                title={`Image of ${data[indexOfSelected]?.name.english}`}
            />
            <Box sx={{flexGrow: 1, textAlign:'center'}}>
                <Typography sx={{fontFamily:"Shojumaru, cursive"}}>HP: {data[indexOfSelected]?.base.HP}</Typography> {/* <Box component='span' sx={{width:4,backgroundColor:'green'}} /> */}
                <Typography sx={{fontFamily:"Shojumaru, cursive"}}>Attack: {data[indexOfSelected]?.base.Attack}</Typography>
                <Typography sx={{fontFamily:"Shojumaru, cursive"}}>Defense: {data[indexOfSelected]?.base.Defense}</Typography>
            </Box>
        </Box> 
        
         
         
      
        {/* <Typography sx={{ textAlign:'center'}} color="text.secondary">
          Description
        </Typography>
         */}
      </CardContent>
      <CardActions sx={{flexDirection:"column"}}>
        <input style={{fontFamily:"Shojumaru, cursive"}} type="text" className="playerName" value={playerName} placeholder="Enter your Name here" onChange={e=>setPlayerName(e.target.value)}  />
        <br />
        <Button onClick={handleClick} size="medium" fullWidth="true" sx={{ color:"white", ":hover": {bgcolor: "green",color: "white"}, fontFamily:"Shojumaru, cursive"}}><Link id="btn_choose" to="/pokemon/arena">I choose you {data[indexOfSelected]?.name.english}</Link></Button>
        <Button onClick={handleClose} size="medium" fullWidth="true" sx={{ color:"white", ":hover": {bgcolor: "red",color: "white"},fontFamily:"Shojumaru, cursive"}}>Not this Time!</Button>
      </CardActions>
    </Card>
  );
}
