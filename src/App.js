import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Router, Link} from "@reach/router"
import SearchBar from './SearchBar';
import Forecast from './Foreacst'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  }
}))
function App() {
  const classes = useStyles();

  return (
    <div>
     <AppBar position="static">
       <Typography variant="h6" className={classes.title}>
         INOVID
       </Typography>
     </AppBar>
     <Router>
      <SearchBar path="/"/>
      <Forecast path="forecast/:city"/>
     </Router>
    </div>
  );
}

export default App;
