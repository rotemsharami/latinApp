import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager
	} from 'react-native';
import { setRowType, setTextDirection, getImageUrl} from '../../tools/tools';
import Location from '../Location/Location';
import {LinearGradient} from 'expo-linear-gradient';


import React, {useRef, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = 80;
const textWidth = width - logoWidth;

const OrganizationBox = (item) => {

    

	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);


    return(
        <LinearGradient style={styles.logoAndTextBox}
            colors={['#efdbf7','#FFF']}
        >



            <View style={[{
                flexDirection: setRowType(count.lng),
            }]}
            
            >

                <View style={styles.logo}>
                    <ImageBackground source={{uri:getImageUrl(item.organization.general_image)}} resizeMode="cover" style={styles.logoImage}></ImageBackground>
                </View>
                <View style={styles.text}>
                    <Text style={{
						paddingRight: 4,
						paddingLeft: 4,
                        textAlign: dir,
                        color: '#000',
                        fontSize: 24,
                        lineHeight:24,
                        fontWeight: 'bold',
                    }}>{item.organization[count.lng].title}</Text>
                    <Text style={{
						paddingRight: 4,
						paddingLeft: 4,
                        color: '#000',
                        textAlign: dir,
                        fontSize: 18,
                        lineHeight:18,
                    }}>{item.organization[count.lng].slogen}</Text>
                    <View style={{
                        paddingLeft:2,
                        paddingRight:2
                    }}>
                        <Location organization={item.organization}></Location>
                    </View>
                </View>
            </View>
            
        </LinearGradient>
    );

}

export default OrganizationBox;
const styles = StyleSheet.create({
logoAndTextBox:{
    width:width,
    padding:10,
    flexDirection:"column",
    borderBottomColor:"#474747",
    height:100,
    
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
      color: '#000',
      fontSize: 24,
      fontWeight: 'bold',
},
description: {
    color: '#000',
    fontSize: 18,
    lineHeight:20,
    marginTop:5,
    marginBottom:5,
},


});