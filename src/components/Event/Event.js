import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager} from 'react-native';

import React, {useRef, useState, useEffect} from 'react';
import {setArray, getSelectedLang, setTextDirection, setRowType} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import RenderHtml from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/3;
const textWidth = width - logoWidth;
const Event = (event) => {
	const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);

    console.log(event.route.params.event);


    return(
        <View style={styles.section}>

            <View style={styles.eventItem}>
                <View style={styles.image}>
                    <Image
                        style={{width: '100%', height: '100%'}}
                        source={{uri:'https://latinet.co.il/'+event.route.params.event.general_image[0]}}
                        />
                </View>
                <View style={styles.titleAndText}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.titleText}>{event.route.params.event.title}</Text>
                        <Text style={styles.textText}>{event.route.params.event.address}</Text>
                    </View>
                </View>

            </View>



        </View>
    );
}
export default Event;
const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	containerBox:{
		
	},	
	eventsList:{
	},

	eventsListBox:{
	},
	eventItem:{
		padding:10,
		flexDirection:"row",
		width:"100%"
	},
	image:{
		width:logoWidth,
		height:logoWidth,
	},
	titleAndText:{
		color: '#000',
		justifyContent:"center",
		height:logoWidth,
		width:textWidth-30,
		
		
	},
	title:{
		fontWeight:"bold",
		
		
	},
	itemTitle:{
		padding:10,
		width:width-logoWidth

	},
	titleText:{
		fontSize:30,
		lineHeight:30,

		
	},
	textText:{

	}
});          
