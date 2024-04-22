import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager
	} from 'react-native';
import { setRowType, setTextDirection, setArray} from '../../tools/tools';
import {navigate} from "../../../RootNavigation";

import React, {useRef, useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = 60;
const textWidth = width - logoWidth;

const OrganizationBoxLink = (item) => {
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);



	const changeNid = useCallback((nid) => {
		item._setOrganizationNid(nid);
	}, [item._setOrganizationNid]);

    return(
        <View style={styles.logoAndTextBox}>
            <TouchableOpacity onPress={() => changeNid(item.organization.nid)}>
                <View style={{
                    flexDirection: setRowType(count.lng),
                }}>
                    <View style={styles.logo}>
                        <ImageBackground source={{uri:"https://latinet.co.il/"+item.organization.general_image}} resizeMode="cover" style={styles.logoImage}></ImageBackground>
                    </View>
                    <View style={styles.text}>
                        <Text style={{
                            paddingRight: count.lng =="he" ? 10 : 0,
                            paddingLeft: count.lng =="he" ? 0 : 10,
                            textAlign: dir,
                            color: '#000',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>{item.organization.title}</Text>
                        <Text style={{
                            paddingRight: count.lng =="he" ? 10 : 0,
                            paddingLeft: count.lng =="he" ? 0 : 10,
                            color: '#000',
                            textAlign: dir,
                            fontSize: 16,
                            lineHeight:20,
                            marginTop:5,
                            marginBottom:5,
                        }}>{item.organization.slogen}</Text>
                        

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

}

export default OrganizationBoxLink;
const styles = StyleSheet.create({
logoAndTextBox:{
    width:width,
    padding:10,
    flexDirection:"column",
    borderBottomWidth:2,
    borderBottomColor:"#730874",
    
},
logoAndText:{
    flexDirection: 'row',
},
logo:{
    flexDirection:'column',
    borderRadius: 150 / 2,
	overflow: "hidden",
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
      fontSize: 20,
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