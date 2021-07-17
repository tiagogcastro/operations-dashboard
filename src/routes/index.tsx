import { Route, Switch } from 'react-router-dom';
import { CalculationSetup } from '../pages/CalculationSetup';

import {Login} from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Operations } from '../pages/Operations';
import { NewOperationProvider } from '../contexts/NewOperationsContext';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/config-calculo" component={CalculationSetup} />
      <Route path="/token" component={Dashboard} />
      <NewOperationProvider>
        <Route path="/operacoes" component={Operations} />
      </NewOperationProvider>
    </Switch>
  );
};
