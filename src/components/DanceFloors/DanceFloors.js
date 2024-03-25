import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager
	} from 'react-native';

import React, {useRef, useState, useEffect} from 'react';
import {setArray} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const DanceFloors = (danceFloors) => {
    return(
        <View style={styles.listBox}>

            <View style={styles.labelBox}>
                <Text style={styles.label}>{"Music Ganers"}:</Text>
            </View>

            <View style={styles.list}>
        {setArray(danceFloors.danceFloors).map((prop, key) => {
            return (
                <View style={styles.listItem} key={key}>
                    <View style={styles.iconBox}>
                        <Icon style={styles.mainMenuListItemIcon} name='audiotrack' color='#730874' size={17}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.text}>{prop.name}</Text>
                    </View>
                </View>
            );
        })}
            </View>
        </View>
    );
}
export default DanceFloors;
const styles = StyleSheet.create({
    labelBox:{
        
        
        
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