import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager
	} from 'react-native';
import { setRowType, setTextDirection, setArray, getImageUrl} from '../../tools/tools';
import {navigate} from "../../../RootNavigation";
import {LinearGradient} from 'expo-linear-gradient';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = 60;
const textWidth = width - logoWidth;

const LearnBoxLink = (item) => {

	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);



	const changeNid = useCallback((nid) => {
		item._setOrganizationNid(nid);
        item._setSelectedScreen("Organization");
        item._setOrganizationScreen("info");
	}, [item._setOrganizationNid]);

    return(

        <LinearGradient style={styles.logoAndTextBox}
            colors={["#FFF", "#FFF", '#fbefff',]}
        >
            
            <TouchableOpacity onPress={() => {
                //changeNid(item.organization.nid)
                navigate("Organization", {"orgNid": item.organization.org_nid, "screenType": "learns", "selectedLearn": item.organization.nid, "source":"Learns"});
                }}>
                <View style={{
                    flexDirection: setRowType(count.lng),
                }}>


                    
                    <View style={styles.logo}>
                        <ImageBackground source={{uri:getImageUrl(count.lines.organizations[item.organization.org_nid].general_image)}} resizeMode="cover" style={styles.logoImage}></ImageBackground>
                    </View>
                    <View style={styles.text}>
                        <Text style={{
                            paddingRight: count.lng =="he" ? 10 : 0,
                            paddingLeft: count.lng =="he" ? 0 : 10,
                            textAlign: dir,
                            color: '#595959',
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>{count.lines.taxonomy_terms.cours_type[item.organization.course_type][count.lng]+" "+count.lines.taxonomy_terms.dance_floors[item.organization.dance_style][count.lng]}</Text>
                        <Text style={{
                            paddingRight: count.lng =="he" ? 10 : 0,
                            paddingLeft: count.lng =="he" ? 0 : 10,
                            color: '#595959',
                            textAlign: dir,
                            fontSize: 16,
                            lineHeight:20,
                            marginBottom:5,
                        }}>{count.lines.organizations[item.organization.org_nid][count.lng].title}</Text>
                        

                    </View>
                </View>
            </TouchableOpacity>
        </LinearGradient>
    );

}

export default LearnBoxLink;
const styles = StyleSheet.create({
logoAndTextBox:{
    width:width,
    padding:10,
    flexDirection:"column",
    borderBottomWidth:1,
    borderBottomColor:"#dcc5e3"
    
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
      fontSize: 20,
      fontWeight: 'bold',
},
description: {
    color: '#000',
    fontSize: 18,
    lineHeight:20,
},


});