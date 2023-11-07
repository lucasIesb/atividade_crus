import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen/HomeScreen';

import AlunosScreen from '../screens/AlunosScreen/AlunosScreen';


const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}  
         options={{ tabBarButton: () => null }}
        
        />

        <Tab.Screen
          name="Alunos"
          component={AlunosScreen}
          options={{ tabBarButton: () => null }}
       
        />
     
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
