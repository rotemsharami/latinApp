import {
    StyleSheet,
    Text,
    View,
    Linking,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager
	} from 'react-native';

import {setArray} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import { Flex } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const Location = (organization) => {
    return(
        <View style={styles.container}>
            <View style={styles.iconAndText}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#730874" />
                </View>
                <View style={styles.text}>
                    <Text>{organization.organization.address}, {organization.organization.city}</Text>
                </View>
            </View>
        </View>
    );
}
export default Location;
const styles = StyleSheet.create({
    iconAndText:{
        flexDirection:"row"
    },

    icon:{

    },

    text:{

    },


    listBox:{
        flexDirection:"column",
        Flex:1
    },
    labelBox:{
        flexDirection:"column",
        Flex:1,

        
    },
    label:{
        
    },
    listBox:{
        padding:10,
        flexDirection:'column',
        
    },
    list:{
        flexDirection:"row",
    },
    listItem:{
        flexDirection:"row",
        borderColor:"#730874",
        borderWidth:1,
        borderRadius:50,
        marginLeft: I18nManager.isRTL ? 4 : 0,
        marginRight: I18nManager.isRTL ? 0 : 4,
        paddingTop:0,
        paddingLeft: I18nManager.isRTL ? 4 : 2,
        paddingRight: I18nManager.isRTL ? 7 : 4,
        paddingBottom:1
        
    },
    iconBox:{
        paddingTop:2,
        flexDirection:"column",
    },
    textBox:{
        marginLeft: I18nManager.isRTL ? 0 : -2,
        marginRight: I18nManager.isRTL ? -2 : 0,

    },
    text:{
        paddingRight: I18nManager.isRTL ? 4 : 0,
        paddingLeft: I18nManager.isRTL ? 0 : 4,
        fontSize:15
    },
});