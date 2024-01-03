import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager
	} from 'react-native';
import { setRowType, getSelectedLang, setTextDirection} from '../../tools/tools';

import React, {useRef, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;

const OrganizationBox = (item) => {
    const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);
    return(
        <View style={styles.logoAndTextBox}>
            <View style={{
                flexDirection: setRowType(count.general.lng),
            }}>
                <View style={styles.logo}>
                    <ImageBackground source={{uri:"https://latinet.co.il/"+item.organization.general_image}} resizeMode="cover" style={styles.logoImage}></ImageBackground>
                </View>
                <View style={styles.text}>
                    <Text style={{
						paddingRight: lng =="he" ? 10 : 0,
						paddingLeft: lng =="he" ? 0 : 10,
                        textAlign: dir,
                        color: '#000',
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}>{item.organization.title}</Text>
                    <Text style={{
						paddingRight: lng =="he" ? 10 : 0,
						paddingLeft: lng =="he" ? 0 : 10,
                        color: '#000',
                        textAlign: dir,
                        fontSize: 18,
                        lineHeight:20,
                        marginTop:5,
                        marginBottom:5,
                    }}>{item.organization.slogen}</Text>
                </View>
            </View>
        </View>
    );

}

export default OrganizationBox;
const styles = StyleSheet.create({
logoAndTextBox:{
    width:width,
    padding:10,
    flexDirection:"column",
    borderBottomWidth:2,
    borderBottomColor:"#000",
    
},
logoAndText:{
    flexDirection: 'row',
},
logo:{
    flexDirection:'column',
},
logoImage:{
    width:logoWidth,
    height:logoWidth,
},
text: {
  color: '#000',
  justifyContent:"center",
  height:logoWidth,
  width:textWidth-30,
},
title: {
    paddingRight: I18nManager.isRTL ? 10 : 0,
    paddingLeft: I18nManager.isRTL ? 0 : 10,
      color: '#000',
      fontSize: 24,
      fontWeight: 'bold',
},
description: {
    paddingRight: I18nManager.isRTL ? 10 : 0,
    paddingLeft: I18nManager.isRTL ? 0 : 10,
    color: '#000',
    fontSize: 18,
    lineHeight:20,
    marginTop:5,
    marginBottom:5,
},


});