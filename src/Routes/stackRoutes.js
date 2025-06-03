import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Vacina from '../Screens/vacina/Vacina'
import Login from '../Screens/login/login'
import Cadastro from '../Screens/cadastro/telaCadastro'
 import Frutas from '../Screens/frutas/Frutas'
 import Imc from '../Screens/imc/index'
 import TabRoutes from "./tabRoutes";
import Pressao from "../Screens/pressao";
import Splash from "../Screens/splash/splash";
import Agua from '../Screens/agua';
import Glicemia from "../Screens/glicemia";
import Remedios from '../Screens/remedios';


const Stack = createNativeStackNavigator()

export default function StackRoutes(){

    return(

            <Stack.Navigator>
                <Stack.Screen name="telaSplash" component={Splash}
                options={{headerShown: false}}
                />
                <Stack.Screen
                    name="remedios"
                    component={Remedios}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen name="telaHome" component={TabRoutes}
                options={{headerShown: false}}
                />
                <Stack.Screen name="telaCadastro" component={Cadastro}
               options={{headerShown: false}}
               />
               
                <Stack.Screen name="telaLogin" component={Login}
                options={{headerShown: false}}
                />

                <Stack.Screen name="telaPressao" component={Pressao}
                options={{headerShown: false}}
                />
                <Stack.Screen name="telaAgua" component={Agua}
                options={{headerShown: false}}
                />
                <Stack.Screen name="telaGlicemia" component={Glicemia}
                options={{headerShown: false}}
                />

                 
                
            
                <Stack.Screen name="telaVacinas" component={Vacina}
                    options={{headerShown: false}}
                    />
            

            
            
               
                <Stack.Screen name="telaImc" component={Imc}
                options={{headerShown: false}}
                />
                
                
                
                
                 <Stack.Screen name="telaFrutas" component={Frutas}
                options={{headerShown: false}}
                />
            </Stack.Navigator>


    )
}