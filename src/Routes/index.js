import  {NavigationContainer} from '@react-navigation/native';

import TabRoutes from './tabRoutes';
import StackRoutes from './stackRoutes';
export default function App(){

    return (
        <NavigationContainer>

            <StackRoutes />

        </NavigationContainer>
    )

}