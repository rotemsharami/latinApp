import {
    StyleSheet,
    Text,
    View,
    Dimensions,
	TouchableOpacity,
	I18nManager,
	} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import Schedule from '../Schedule/Schedule.js';
import Prices from '../Prices/Prices.js';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');

const OrganizationLines = (organizationLines) => {


	const count = useSelector((store) => store.count.count);
    const getSchedule = (_line) => {
        let schedule = {};
        if(_line.opening != undefined){
            schedule.opening = _line.opening;
        }
        if(_line.opening != undefined){
            schedule.lessons = _line.lessons;
        }
        if(_line.opening != undefined){
            schedule.party = _line.party;
        }
        return schedule;
    }
    return(
        <View style={styles.listBox}>
            <View style={{
					flexDirection: setRowType(count.lng),
				}}>
        {setArray(organizationLines.organizationLines.organizationLines).map((prop, key) => {
            return (
                <TouchableOpacity key={prop.nid} style={styles.menuListItem} onPress={() => {organizationLines._setSelectedLine(prop.nid)}}>
                    <View style={{
                        borderBottomWidth:prop.nid == organizationLines._selectedLine ? 3 : 0,
                        paddingRight:10,
                        paddingLeft:10,
                        marginLeft:  I18nManager.isRTL ? 0 : 0,
                        marginRight:  I18nManager.isRTL ? 0 : 0,
                        paddingBottom:3,
                    }}>
                        <Text style={styles.dayText}>{prop.days_of_week[prop.week_day]}</Text>
                    </View>
                </TouchableOpacity>
            );
        })}
            </View>
            {organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine).length > 0 && 
            <View style={styles.contentBox}>
                <View style={styles.dance_floors}>
                    <Text style={styles.danceFloorsText}>{nice_list_text(organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine)[0].dance_floors)}</Text>
                </View>
                <Schedule
                    schedule={{labels:organizationLines.organizationLines.labels,
                    schedule:setArray(organizationLines.organizationLines.organizationLines).filter(item => item.nid == organizationLines._selectedLine)[0].time_part,
                    schedule:getSchedule(setArray(organizationLines.organizationLines.organizationLines).filter(item => item.nid == organizationLines._selectedLine)[0])
                    }}></Schedule>
                <Prices prices={{labels:organizationLines.organizationLines.labels, prices:setArray(organizationLines.organizationLines.organizationLines).filter(item => item.nid == organizationLines._selectedLine)[0].tickets}}></Prices>
            </View>
            }
        </View>
    );
}
export default OrganizationLines;
const styles = StyleSheet.create({
    menuList:{
        flexDirection:"row"
    },
    menuListItem:{
        flexDirection:"column"
    },
    listItem:{
        flex:1
    },
    listBox:{
        padding:10
    },
    fullInfoBox:{
        flex:1,

    },
    dance_floors:{
        marginTop:10,
        
    },
    danceFloorsText:{
        fontSize:30
    },
    list:{
        
    },
    iconAndDay:{
        flexDirection:"row"
    },
    iconBox:{
        flexDirection:"column"
    },
    textBox:{
        flexDirection:"column"
    },
    text:{
        paddingRight: I18nManager.isRTL ? 4 : 0,
        paddingLeft: I18nManager.isRTL ? 0 : 4,
        fontSize:15
    },
});