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
import {setArray, getSelectedLang, setTextDirection, setRowType} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import RenderHtml from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const Prices = (prices) => {
    const setText = (text) => {
        return {html:text}
    }

	const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);


    return(
        <View style={styles.listBox}>
            <View style={{
                flexDirection:setRowType(count.general.lng),
                marginBottom:6
            }}>
                <View style={styles.iconBox}>
                    <Icon name='payment' color='#000' style={styles.icon} size={17} />
                </View>
                <View style={styles.DisplayTitletBox}>
                    <Text style={styles.DisplayTitle}> {prices.prices.labels[5]}</Text>
                </View>
            </View>
            <View style={styles.list}>
        {setArray(prices.prices.prices).map((prop, key) => {
            return (
                <View
                    style={{
                        flexDirection:setRowType(count.general.lng),
                        backgroundColor:"#dbdbdb",
                        marginBottom:2,
                    }}
                    key={key}
                >
                    <View style={styles.titleAndText}>
                        <View style={styles.listItemTitle}>
                            <Text style={styles.titleText}>{prop.title}</Text>
                        </View>
                        <View style={styles.listItemText}>
                            <RenderHtml
                                contentWidth={width}
                                source={setText(prop.text)}
                                enableExperimentalMarginCollapsing={true}
                                tagsStyles={{
                                    li:{
                                        paddingLeft:5
                                    },
                                    p:{
                                        marginTop:0,
                                        marginBottom:0
                                    },
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.price}>
                        <Text style={styles.priceText}>{prop.price} ₪</Text>
                    </View>
                </View>
            );
        })}
            </View>
        </View>
    );
}
export default Prices;
const styles = StyleSheet.create({
    price:{
        justifyContent: 'center',
        width:80,
        flexDirection:"column",
        backgroundColor:"#730874"
    },
    listBox:{
        paddingRight:10,
        paddingLeft:0,
        flexDirection:"column",
        width:width-10,
        marginTop:20,
        
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