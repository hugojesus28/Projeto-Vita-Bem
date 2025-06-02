import colors from "../color/color";

import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',

    },

    header:{
        flex: 0.1,
        width: '100%',
        flexDirection: 'row',

    },

    boxImgHeader:{
        width: '15%',
        height: '100%',
        objectFit: 'cover',
        
    },
    titPag:{
        width: '85%',
        paddingLeft: '30%'
    }
    
})