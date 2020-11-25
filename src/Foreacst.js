import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    card:{
        marginTop: theme.spacing(2),
    },
    icon:{
        height: 80,
        width: 80,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

 const extractDisplayData = (data) => {
     const {valid_date, sunrise_ts, sunset_ts, max_temp, min_temp, weather} = data
    
     let date = valid_date
     let dayTemp = max_temp + "\xB0C"
     let nightTemp = min_temp + "\xB0C"

     let sunriseDate = new Date(sunrise_ts)
     let sunsetDate = new Date(sunset_ts)
     let sunrise = sunriseDate.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })
     let sunset = sunsetDate.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })
    
     let weatherIco = weather.icon
     let weatherDesc = weather.description

     return {date, sunrise, sunset, dayTemp, nightTemp, weatherIco, weatherDesc}
 }

function Forecast(props){
    const displayData = props.location.state.data.map(extractDisplayData)
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant="body1">
                <Link href="/">﹤Back</Link>
            </Typography>
            <Typography variant="h5">Three Days Forecast for {props.city} </Typography>
            <Grid container spacing={2}>
                {displayData.map((data)=>(
                    <Grid key={data.valid_date} item>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="body1">Date: {data.date}</Typography>
                                <Typography variant="body1">Day: {data.dayTemp}</Typography>
                                <Typography variant="body1">Night: {data.nightTemp}</Typography>
                                <CardMedia image={`/icons/${data.weatherIco}.png`} title="Weather Icon" className={classes.icon}/>
                                <Typography variant="body1">Weather: {data.weatherDesc}</Typography>
                                <Typography variant="body1">Sunrise: {data.sunrise}</Typography>
                                <Typography variant="body1">Sunset: {data.sunset}</Typography>
                            </CardContent>
                        </Card>
                    </Grid> 
                ))}
            </Grid>
        </div>
    )
}

export default Forecast