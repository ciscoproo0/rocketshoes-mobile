import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Cart from './pages/Cart';

import Header from './components/Header';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Cart,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        header: () => <Header navigation={navigation} />,
        cardStyle: {
          backgroundColor: '#191920',
        },
      }),
    },
  ),
);

export default Routes;
