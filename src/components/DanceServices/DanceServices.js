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
import { Flex } from '@react-native-material/core';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const DanceServices = (danceServices) => {
    return(
        <View style={styles.listBox}>
            <View style={styles.list}>
        {setArray(danceServices.danceServices).map((prop, key) => {
            return (
                <View style={styles.listItem} key={key}>
                    <View style={styles.iconBox}>
                        <Icon style={styles.mainMenuListItemIcon} name='check-circle' color='#730874' size={17}/>
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
export default DanceServices;
const styles = StyleSheet.create({
    listBox:{
        flexDirection:"column",
        Flex:1
    },
    labelBox:{
        flexDirection:"column",
        Flex:1
        
        
    },
    label:{
        
    },
    listBox:{
        padding:10,
        flexDirection:'column',
        
    },
    list:{
        flexDirection:"column",
        width:"auto"
    },
    listItem:{
        flexDirection:"row",
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