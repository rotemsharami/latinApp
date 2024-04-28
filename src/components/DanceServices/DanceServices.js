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
import { useSelector, useDispatch } from 'react-redux';

const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const DanceServices = (danceServices) => {


    const count = useSelector((store) => store.count.count);

    return(
        <View style={styles.listBox}>
            <View style={styles.list}>
        {danceServices.danceServices.split(",").map((prop, key) => {
            return (
                <View style={[styles.listItem, {
                    flexDirection: count.lng == "en" ? "row" :"row-reverse"
                }]} key={key}>
                    <View style={styles.iconBox}>
                        <Icon style={styles.mainMenuListItemIcon} name='check-circle' color='#730874' size={17}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.text}>{count.lines.taxonomy_terms.dance_services[prop][count.lng]}</Text>
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


    listItem:{
        flexDirection:"row",
        
    },
    iconBox:{
        paddingTop:4,
        flexDirection:"column",
    },
    textBox:{
        

    },
    text:{
        fontSize:19
    },
});