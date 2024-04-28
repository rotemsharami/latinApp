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
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;



const Services = (services) => {


    const count = useSelector((store) => store.count.count);

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
        {services.services.split(",").map((prop, key) => {
            return (
                    <View style={[styles.listItem, {
                        flexDirection: count.lng == "en" ? "row" :"row-reverse"
                    }]} key={key}>

                    <View style={styles.iconBox}>
                            <MaterialCommunityIcons name={iconsInfo[key]} size={14} color={"#730874"} />
                    </View>
                    <View style={styles.textBox}>
                        <Text style={{
                            paddingTop:4,
                                alignItems:"center",
                                paddingRight: 5,
                                paddingLeft: 5,
                                fontSize:14,
                                color: "#000",
                                textAlign: 'center',
                                lineHeight:11
                                }}
                        >{count.lines.taxonomy_terms.services[prop][count.lng]}</Text>
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
        flexWrap:"wrap"
        
    },
    textBox:{
        alignSelf:"center"
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