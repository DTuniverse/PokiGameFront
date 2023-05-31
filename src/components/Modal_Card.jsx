import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';


export default function BasicCard({data, dataImg, indexOfSelected, modalImg}) {
  const pokemon = data[indexOfSelected]
  
  
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
        <Button size="medium" fullWidth="true" sx={{ color:"white", ":hover": {bgcolor: "green",color: "white"}}}>I choose you {data[indexOfSelected]?.name.english}</Button>
        <Button size="medium" fullWidth="true" sx={{ color:"white", ":hover": {bgcolor: "red",color: "white"}}}>Not this Time!</Button>
      </CardActions>
    </Card>
  );
}
