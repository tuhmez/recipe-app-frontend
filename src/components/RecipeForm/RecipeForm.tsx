import React, { forwardRef, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  CloudUpload,
  DeleteOutline,
  FilterList,
  FirstPage,
  Edit,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons';
import MaterialTable, { Column, Icons, MTableActions, MTableBody, MTableHeader } from 'material-table';
import { Ingredient, IngredientUnits, RecipeMessage, RecipeType } from '../../proto/recipe_pb';
import { useStyles } from './styles';

const recipeTypeItems = () => {
  const returnItems: JSX.Element[] = [];
  Object.keys(RecipeType).forEach((type, index) => {
    returnItems.push((
      <MenuItem key={`recipe-type-${type}`} value={index}>{type}</MenuItem>
    ));
  });
  return returnItems;
};

let ingredientUnitLookup: any = {};
Object.keys(IngredientUnits).forEach((unit, index) => {
  ingredientUnitLookup[index] = unit;
});
const columns: Column<any>[] = [
  {
    title: 'Name',
    field: 'name',
    align: 'left',
    cellStyle: {
      width: '20%'
    }
  },
  {
    title: 'Measurement',
    field: 'measurement',
    type: 'numeric',
    align: 'left',
    cellStyle: {
      width:'5%',
    }
  },
  {
    title: 'Unit',
    field: 'unit',
    lookup: ingredientUnitLookup,
    align: 'left',
    cellStyle: {
      width: '10%'
    }
  }
];


export interface Props {
  data: RecipeMessage.AsObject;
}

const RecipeForm = (props: Props) => {
  // Props Destructuring
  const { data } = props;
  // Styles
  const classes = useStyles();
  // States
  const [name, setName] = useState(data.name);
  const [type, setType] = useState(data.type);
  const [website, setWebsite] = useState(data.linkToWebsite);
  const [ingredientsList, setIngredientsList] = useState(data.ingredientsList);
  const [stepsList, setStepsList] = useState(data.stepsList);
  const [difficulty, setDifficulty] = useState(data.difficulty);
  const [keywordsList, setKeywordsList] = useState(data.keywordsList);
  const [keywordsComponentList, setKeywordsComponentList] = useState<JSX.Element[]>([]);
  const [favorited, setFavorited] = useState(data.favorited);
  // Effects
  useEffect(() => {

  }, [keywordsList]);
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const onChangeType = (event: React.ChangeEvent<{ value: unknown }>) => setType(event.target.value as number);
  const onChangeWebsite = (event: React.ChangeEvent<HTMLInputElement>) => setWebsite(event.target.value);

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Typography variant='h4'>
          New Recipe
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          id='recipe-name'
          required
          label='Name'
          variant='filled'
          fullWidth
          value={name}
          onChange={onChangeName}
        />
      </Grid>
      <Grid item>
        <FormControl variant='filled' className={classes.formControl}>
          <InputLabel id='recipe-type-label'>Recipe Type</InputLabel>
          <Select
            labelId='recipe-type-label'
            id='recipe-type'
            value={type}
            onChange={onChangeType}
          >
            {recipeTypeItems()}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Typography variant='h5' >
          Ingredients
        </Typography>
      </Grid>
      <Grid item>
        <div style={{maxWidth: '95vw', scale: '90%'}}>
          <MaterialTable
            data={ingredientsList}
            columns={columns}
            icons={icons}
            title={''}
            options={{
              actionsColumnIndex: -1,
              actionsCellStyle: {
                justifySelf: 'center',
                alignSelf: 'center'
              }
            }}
            components={{
              Container: props => (
                <Paper variant='outlined' elevation={0} {...props} />
              ),
            }}
            editable={{
              onRowAdd: newData => {
                return new Promise((resolve, reject) => {
                  const { name, measurement, unit } = newData;
                  setIngredientsList(prevState => {
                    let newState = [...prevState];
                    newState.push({
                      name,
                      measurement: Number(measurement),
                      unit: Number(unit)
                    });
                    return newState;
                  });
                  resolve(() => { });
                })
              },
              onRowDelete: dataToDelete => {
                return new Promise((resolve, reject) => {
                  setIngredientsList(prevState => {
                    let newState = [...prevState];
                    const index = dataToDelete.tableData.id;
                    newState.splice(index, 1);
                    return newState;
                  });
                  resolve(() => { });
                });
              },
              onRowUpdate: (updatedData, oldData) => {
                return new Promise((resolve, reject) => {
                  const { name, measurement, unit } = updatedData;
                  setIngredientsList(prevState => {
                    let newState = [...prevState];
                    newState[oldData.tableData.id] = {
                      name,
                      measurement: Number(measurement),
                      unit: Number(unit)
                    }
                    return newState;
                  });
                  resolve(() => { });
                });
              }
            }}
            localization={{
              body: {
                emptyDataSourceMessage: 'No ingredients yet!'
              }
            }}
          />
        </div>
      </Grid>
      <Grid item>
        <TextField
          id='recipe-website-link'
          label='Website'
          variant='filled'
          fullWidth
          value={website}
          onChange={onChangeWebsite}
        />
      </Grid>
      <Grid item>
        <input
          accept='image/*'
          className={classes.input}
          id='recipe-images'
          multiple
          type='file'
        />
        <label htmlFor='recipe-images'>
          <Button
            variant='contained'
            startIcon={<CloudUpload />}
            component='span'
            color='primary'
          >
            Upload Images
          </Button>
        </label>
      </Grid>
    </Grid>
  )
};

export default RecipeForm;

const icons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
