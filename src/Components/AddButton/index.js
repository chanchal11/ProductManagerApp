import Pagination  from "../../Components/Pagination";
import Header from "../../Components/Header";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    }
  }));

export default function AddButton(props){
    const classes = useStyles();

    return (<Fab 
                aria-label={'Add'} 
                className={classes.fab} 
                color={'primary'} 
                size={'large'}
                onClick={props.showForm} >
            <AddIcon/>
        </Fab>);
}