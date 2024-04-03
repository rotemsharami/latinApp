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
import { MaterialCommunityIcons } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;



const Services = (services) => {

    let iconsInfo = [
        "air-conditioner",
        "glass-cocktail",
        "bottle-soda-classic",
        "cup-water",
        "parking",
        "locker-multiple",
        "silverware-fork-knife",
        "basket-check-outline",
        "camera",
        "security",
    ];

    return(
        <View style={styles.listBox}>
            <View style={styles.list}>
        {setArray(services.services).map((prop, key) => {
            return (
                <View style={styles.listItem} key={key}>
                    <View style={styles.iconBox}>
                            <MaterialCommunityIcons name={iconsInfo[key]} size={30} color={prop.active ? "#9b9b9b" : "#FFF"} />
                    </View>
                    <View style={styles.textBox}>
                        <Text style={{
                            paddingTop:4,
                                alignItems:"center",
                                paddingRight: I18nManager.isRTL ? 4 : 0,
                                paddingLeft: I18nManager.isRTL ? 0 : 4,
                                fontSize:11,
                                color: prop.active ? "#9b9b9b" : "#fff",
                                textAlign: 'center',
                                lineHeight:11
                                }}
                        >{prop.name}</Text>
                    </View>
                </View>
            );
        })}
            </View>
        </View>
    );
}
export default Services;
const styles = StyleSheet.create({
    listBox:{
        padding:10
    },
    list:{
        flexDirection:"row",
        flexWrap:"wrap"
        
    },
    listItem:{
        paddingTop:10,
        flexDirection:"column",
        width:(width-20)/5,
        backgroundColor:"#6d6969",
    },
    iconBox:{
        alignItems:"center"
    },
    textBox:{
        flexDirection:"column",
    },
    text:{
        // alignItems:"center",
        // paddingRight: I18nManager.isRTL ? 4 : 0,
        // paddingLeft: I18nManager.isRTL ? 0 : 4,
        // fontSize:11,
        // color:"#fff",
        // textAlign: 'center',
    },
});