import React from 'react';
import { Routes as AppRoutes, Route} from 'react-router-dom';
import { possibleRoutes } from './routeConstants';
import { Main } from '../containers/Main';
import { CreateRecipePage } from '../containers/CreateRecipePage';
import { SocketClient } from '../socket';

export interface Props {
  socket: SocketClient;
}

export const Routes = (props: Props) => {
  // Props desconstruction
  const { socket } = props;
  // Constants
  const { main, createRecipePage } = possibleRoutes;

  return (
    <AppRoutes>
      <Route path={main} element={<Main />} />
      <Route path={createRecipePage} element={<CreateRecipePage socket={socket} />}/>
    </AppRoutes>
  )
}
