import { Route, Switch } from 'react-router-dom';
import { CalculationSetup } from '../pages/CalculationSetup';

import {Login} from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Operations } from '../pages/Operations';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/config-calculo" component={CalculationSetup} />
      <Route path="/token" component={Dashboard} />
      <Route path="/operacoes" component={Operations} />
    </Switch>
  );
};
