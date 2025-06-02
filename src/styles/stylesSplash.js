import color from '../color/color';

import { StyleSheet, Animated } from 'react-native';


export default StyleSheet.create({

    fundoSplash: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewImagem: {
        backgroundColor: color.branco,
        borderRadius: '50%',
        width: '60%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgVitaBem:{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }

})