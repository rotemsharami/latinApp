import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager,
    useWindowDimensions
	} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import Schedule from '../Schedule/Schedule.js';
import Prices from '../Prices/Prices.js';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const renderersProps = {
    ul: {
      enableExperimentalRtl: true
    }
  };
const OrganizationLines = (organizationLines) => {
    const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);
    const { widthA } = useWindowDimensions();
    const [selectedLine, setSelectedLine] = useState(organizationLines.organizationLines.selectedNid != 0 ? organizationLines.organizationLines.selectedNid : setArray(organizationLines.organizationLines.organizationLines)[0].nid);
    const setText = (text) => {
        return {html:text}
    }
    return(
        <View style={styles.listBox}>
            <View style={{
					flexDirection: setRowType(count.general.lng),
				}}>
        {setArray(organizationLines.organizationLines.organizationLines).map((prop, key) => {
            return (
                <TouchableOpacity key={prop.nid} style={styles.menuListItem} onPress={() => setSelectedLine(prop.nid)}>
                    <View style={{
                        borderBottomWidth:prop.nid == selectedLine ? 3 : 0,
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
            <View style={styles.contentBox}>
                <View style={styles.dance_floors}>
                    <Text style={styles.danceFloorsText}>{nice_list_text(organizationLines.organizationLines.organizationLines.filter(item => item.nid == selectedLine)[0].dance_floors)}</Text>
                </View>
                <View style={styles.fullInfoBox}>
                    <RenderHtml
                        contentWidth={width}
                        source={setText(setArray(organizationLines.organizationLines.organizationLines).filter(item => item.nid == selectedLine)[0].text)}
                        enableExperimentalMarginCollapsing={true}
                        tagsStyles={{
                            li:{
                                paddingLeft:5,
                                textAlign:dir,
                                direction:"ltr",
                            },
                            ul:{
                                direction:"ltr",
                                alignContent:"flex-end"
                            }
                        }}
                        renderersProps={renderersProps}
                        style={{backgroundColor:"none"}}
                    />
                </View>
                <Schedule schedule={{labels:organizationLines.organizationLines.labels, schedule:setArray(organizationLines.organizationLines.organizationLines).filter(item => item.nid == selectedLine)[0].time_part}}></Schedule>
                <Prices prices={{labels:organizationLines.organizationLines.labels, prices:setArray(organizationLines.organizationLines.organizationLines).filter(item => item.nid == selectedLine)[0].tickets}}></Prices>
            </View>
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