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
const Schedule = (schedule) => {
	const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);
    const setText = (text) => {
        return {html:text}
    }
    return(
        <View style={styles.listBox}>
            <View style={{
                flexDirection:setRowType(count.general.lng),
                marginBottom:6
            }}>
                <View style={styles.iconBox}>
                    <Icon name='access-time' color='#000' style={styles.icon} size={17} />
                </View>
                <View style={styles.DisplayTitletBox}>
                    <Text style={styles.DisplayTitle}> {schedule.schedule.labels[4]}</Text>
                </View>
            </View>
            <View style={styles.list}>
        {setArray(schedule.schedule.schedule).map((prop, key) => {
            return (
                <View style={{
                    borderBottomWidth:2,
                    flexDirection:setRowType(count.general.lng),
                    paddingBottom:10,
                    paddingTop:10,

                }} key={key}>
                    <View style={styles.time}>
                        <Text style={{
                            fontWeight:"bold",
                            textAlign:setTextDirection(count.general.lng)
                        }}>{prop.time}</Text>
                    </View>
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
                                paddingLeft:0,
                                paddingRight:0
                            },
                            p:{
                                marginTop:0,
                                marginBottom:0
                            },
                        }}
                    />                            
                        </View>                        
                    </View>
                </View>
            );
        })}
            </View>
        </View>
    );
}
export default Schedule;
const styles = StyleSheet.create({
    listBox:{
        marginTop:10
    },
    time:{
        width:42,
        flexDirection:"column",
    },
    titleText:{
        fontWeight:"bold"
    },
    titleAndText:{
        width:width - 42,
        flexDirection:"column",
    },
    DisplayTitle:{
        fontSize:15,
        fontWeight:"bold"
    },
    iconBox:{
        paddingTop:1
    }
});