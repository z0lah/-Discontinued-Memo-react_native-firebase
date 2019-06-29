import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import App from './App';
import Home from './Home';
import HomeC from './HomeC';
import Main from './Main';
import AddOrder from './AddOrder';
import Profile from './Profile';
import TambahAdmin from './TambahAdmin';

const AppNavigator = createStackNavigator({
  Main: { screen: Main },
  Home: { screen: Home },
  HomeC: { screen: HomeC },
  AddOrder: { screen: AddOrder},
  Profile: { screen: Profile},
  TambahAdmin: { screen: TambahAdmin}
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
