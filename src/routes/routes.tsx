import React from 'react';
import { Routes as AppRoutes, Route} from 'react-router-dom';
import { possibleRoutes } from './routeConstants';
import { RecipesMain } from '../containers/RecipesMainPage';
import { CreateRecipePage } from '../containers/CreateRecipePage';
import { ViewRecipePage } from '../containers/ViewRecipePage';
import { EditRecipePage } from '../containers/EditRecipePage';
import { AboutPage } from '../containers/AboutPage';
import { IssuePage } from '../containers/IssuePage';
import { SocketClient } from '../socket';

export interface Props {
  socket: SocketClient;
}

export const Routes = (props: Props) => {
  // Props desconstruction
  const { socket } = props;
  // Constants
  const {
    about,
    recipes,
    createRecipePage,
    main,
    viewRecipePage,
    editRecipePage,
    issues,
  } = possibleRoutes;

  return (
    <AppRoutes>
      <Route path={main} element={<RecipesMain />} />
      <Route path={recipes} element={<RecipesMain />} />
      <Route path={createRecipePage} element={<CreateRecipePage socket={socket} />}/>
      <Route path={viewRecipePage} element={<ViewRecipePage socket={socket}/>}/>
      <Route path={editRecipePage} element={<EditRecipePage socket={socket}/>}/>
      <Route path={about} element={<AboutPage />} />
      <Route path={issues} element={<IssuePage socket={socket} />} />
    </AppRoutes>
  )
}
