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
import {setArray, setRowType} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import { Flex } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const DanceFloors = (danceServices) => {
    const count = useSelector((store) => store.count.count);

    return(
        <View style={styles.listBox}>
            <View style={styles.list}>
        {danceServices.danceServices.split(",").map((prop, key) => {
            return (

                    <View style={[styles.listItem, {
                        flexDirection: setRowType(count.lng),
                    }]} key={key}>


                    <View style={styles.iconBox}>
                        <MaterialCommunityIcons name="music" size={16} color="#730874" />
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.text}>{count.lines.taxonomy_terms.dance_floors[prop][count.lng]}</Text>
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
    listItem:{
        flexDirection:"row",
        paddingTop:0,
        paddingBottom:1
        
    },
    iconBox:{
        paddingTop:3,
        flexDirection:"column",
    },
    textBox:{
        
    },
    text:{

        fontSize:14,
        fontWeight:"normal"
    },
});