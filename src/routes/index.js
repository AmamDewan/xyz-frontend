import {Switch, BrowserRouter} from "react-router-dom";
import {allRoutes} from "./route"

const Router = () => {
  return (
		<BrowserRouter>
			<Switch>
				{allRoutes.map((route, index) => {
					return (
						<route.route
							key={index}
							path={route.path}
							exact={true}
							component={route.component}
						>
						</route.route>
					)
				})}
			</Switch>
		</BrowserRouter>
  );
};

export default Router;