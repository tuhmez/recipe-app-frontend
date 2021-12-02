import React from 'react';
import { Routes as AppRoutes, Route} from 'react-router-dom';
import { possibleRoutes } from './routeConstants';
import { Main } from '../containers/Main';
import { CreateRecipePage } from '../containers/CreateRecipePage';
import { ViewRecipePage } from '../containers/ViewRecipePage';
import { SocketClient } from '../socket';
import { EditRecipePage } from '../containers/EditRecipePage';

export interface Props {
  socket: SocketClient;
}

export const Routes = (props: Props) => {
  // Props desconstruction
  const { socket } = props;
  // Constants
  const { main, createRecipePage, viewRecipePage, editRecipePage } = possibleRoutes;

  return (
    <AppRoutes>
      <Route path={main} element={<Main />} />
      <Route path={createRecipePage} element={<CreateRecipePage socket={socket} />}/>
      <Route path={viewRecipePage} element={<ViewRecipePage socket={socket}/>}/>
      <Route path={editRecipePage} element={<EditRecipePage socket={socket}/>}/>
    </AppRoutes>
  )
}
