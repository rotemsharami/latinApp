import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager,
    ScrollView
	} from 'react-native';

import React, {useRef, useState, useEffect} from 'react';
import {setArray, setTextDirection, setRowType} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import RenderHtml from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const Prices = (prices) => {

	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);


    return(
        <View style={styles.listBox}>
            <View style={{
                flexDirection:setRowType(count.lng),
                marginBottom:6
            }}>
                <View style={styles.iconBox}>
                    <Icon name='payment' color='#000' style={styles.icon} size={17} />
                </View>
                <View style={styles.DisplayTitletBox}>
                    <Text style={styles.DisplayTitle}> {count.lines.global_metadata.labels[count.lng][9]}</Text>
                </View>
            </View>
            <ScrollView style={styles.list}>
        {setArray(prices.prices).map((prop, key) => {
            return (
                <View
                    style={{
                        flexDirection:setRowType(count.lng),
                        backgroundColor:"#a797ad",
                        marginBottom:2,
                    }}
                    key={key}
                >
                    <View style={styles.titleAndText}>
                        <View style={styles.listItemTitle}>
                            
                        </View>
                        <View style={styles.listItemText}>
                            <Text style={styles.titleText}>{prop[count.lng].title}</Text>
                        </View>
                    </View>
                    <View style={styles.price}>
                        <Text style={styles.priceText}>{prop.price} ₪</Text>
                    </View>
                </View>
            );
        })}
            </ScrollView>
        </View>
    );
}
export default Prices;
const styles = StyleSheet.create({
    price:{
        justifyContent: 'center',
        width:80,
        flexDirection:"column",
        backgroundColor:"#474747",
    },
    listBox:{
        paddingRight:10,
        paddingLeft:0,
        flexDirection:"column",
        width:width-10,
        marginTop:20,
        height:height-179-104-30-216-50,
        
    },  
    priceText:{
        fontWeight:"bold",
        textAlign:'center',
        color:"#FFF"
    },
    titleText:{
        fontWeight:"bold",
    },
    titleAndText:{
        width:width - 100,
        flexDirection:'column',
        padding:10
        
    },
    DisplayTitle:{
        fontSize:15,
        fontWeight:"bold"
    },
    iconBox:{
        paddingTop:1
    }

});