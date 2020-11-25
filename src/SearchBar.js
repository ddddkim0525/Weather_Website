import {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { navigate } from "@reach/router"
const API_BASE = "https://api.weatherbit.io/v2.0/forecast/daily"
const NUM_DAYS = 3

const useStyles = makeStyles((theme)=> ({
    root: {
      minWidth: 275,
      marginTop: theme.spacing(2),
    },
    pos: {
      marginBottom: 12,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
  }));
  
  function SearchBar(){
      const [cities] = useState(["Minneapolis","Jackson","Kansas","New York","Other"])
      const [city, setCity] = useState("")
      const [isError, setIsError] = useState(false)
      
      const handleChange = (event) =>{
          setCity(event.target.value)
        }
        
        async function acessAPI(city){
            try{
                const response = await fetch(API_BASE + "?city=" + city + "&days=" + NUM_DAYS + "&key=" + process.env.REACT_APP_API_KEY)
                const json = await response.json()
                const {data} = json
                return data
            }
            catch(error){
                return undefined
            }
        }
        
        const handleSubmit = (event) => {
            event.preventDefault()

            let submittedCity = city
            if (submittedCity === "Other"){
                submittedCity = event.target[1].value
            }

            const data = acessAPI(submittedCity)
            data.then((data)=>{
                if (data === undefined){
                    setIsError(true)
                }
                else{
                    navigate(`/forecast/${submittedCity}`, {state: {data: data}})
                }
            })

        }

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <form onSubmit = {handleSubmit}>
                <CardContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-label">Select City</InputLabel>
                        <Select labelId="select-label" value={city} onChange={handleChange}>
                            {cities.map((city) => (
                                <MenuItem value={city} key={city}>{city}</MenuItem>
                            ))}
                        </Select>
                        {city === "Other" && 
                        <TextField label="City Name"/>}
                        {isError && 
                        <Typography variant="caption" color="error">Invalid Location Submitted</Typography>}
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button type="submit" variant="contained">Submit</Button>
                </CardActions>
            </form>
        </Card>
    )
}

export default SearchBar