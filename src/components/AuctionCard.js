import { Card, CardMedia } from "@mui/material";

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AuctionCard = () => {

    return (
        <Card sx ={{ maxWidth: 345, marginTop: '35px' }}>
            <CardMedia
                sx = {{ height: 140 }}
                image="./images/blueSapphire.png"
                title="Blue Sapphire" 
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Blue Sapphire
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default AuctionCard;