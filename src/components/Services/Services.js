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
const Services = (services) => {
    return(
        <View style={styles.listBox}>
            <View style={styles.list}>
        {setArray(services.services).map((prop, key) => {
            return (
                <View style={styles.listItem} key={key}>
                    <View style={styles.iconBox}>
                        <Icon style={styles.mainMenuListItemIcon}
                            name='check-circle'
                            color={prop.active ? "#ed60d6" : "#000"}
                            size={17}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={{
                                alignItems:"center",
                                paddingRight:4,
                                paddingLeft: 4,
                                fontSize:11,
                                color: prop.active ? "#fff" : "#000",
                                textAlign: 'center',
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
        
    },
    list:{
        flexDirection:"row",
        flexWrap:"wrap"
        
    },
    listItem:{
        paddingTop:10,
        flexDirection:"column",
        width:width/5,
    },
    iconBox:{
        
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