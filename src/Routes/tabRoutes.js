import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from '@expo/vector-icons'

import Home from '../Screens/home/home.js'
 import Perfil from '../Screens/perfil/index.js'
 import Notificacoes from '../Screens/notificacoes/index.js'
 import Settings from '../Screens/settings/index.js'

const Tab = createBottomTabNavigator()

export default function TabRoutes(){

    return(
        <Tab.Navigator 
        
        screenOptions={{headerShown: false,
             tabBarStyle: {
                 width: '100%', 
                 height: 80,
                borderTopColor: 'transparent',
                backgroundColor: 'black',
                backgroundColor: '#fff'
            },
            tabBarIconStyle: { marginTop: 15},
            tabBarActiveTintColor: 'red',
                 
        }}>
            <Tab.Screen 
            name="Home"
             component={Home} 
            options={{
                tabBarIcon: ({size, color}) => <Feather name="home" size={size} color={color}   />,
                tabBarLabel: "Home"
            }}/>

            <Tab.Screen 
            name="Perfil"
             component={Perfil} 
             options={{
                tabBarIcon: ( {size, color}) => <Feather name="user" size={size} color={color}  />
             }}/>


            <Tab.Screen 
            name="Notificacoes"
             component={Notificacoes} 
             options={{
                tabBarIcon: ( {size, color}) => <Feather name="bell" size={size} color={color}  />
             }}/>

            <Tab.Screen 
            name="Configuracoes"
             component={Settings} 
             options={{
                tabBarIcon: ( {size, color}) => <Feather name="settings" size={size} color={color}  />
             }}/>
        </Tab.Navigator>
    )
}

