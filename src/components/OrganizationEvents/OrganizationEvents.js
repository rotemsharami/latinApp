import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager,
    Image,
    useWindowDimensions
	} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import { setRowType, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
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


const OrganizationEvents = (organizationEvents) => {
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);
    const { widthA } = useWindowDimensions();
    const [selectedLine, setSelectedLine] = useState(organizationEvents.organizationEvents.selectedNid != 0 ? organizationEvents.organizationEvents.selectedNid : setArray(organizationEvents.organizationEvents.organizationEvents)[0].nid);
    
    console.log("https://latinet.co.il/"+setArray(organizationEvents.organizationEvents.organizationEvents).filter(item => item.nid == selectedLine)[0].general_image[0]);
    
    
    const setText = (text) => {
        return {html:text}
    }
    return(
        <View style={styles.listBox}>
            <View style={{
					flexDirection: setRowType(count.lng),
				}}>
        {setArray(organizationEvents.organizationEvents.organizationEvents).map((prop, key) => {
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
                        <Text style={styles.dayText}>{prop.event_date}</Text>
                    </View>
                </TouchableOpacity>
            );
        })}
            </View>
            <View style={styles.contentBox}>

                <View style={styles.eventTitle}>
                    <Text style={styles.eventTitleText}>{setArray(organizationEvents.organizationEvents.organizationEvents).filter(item => item.nid == selectedLine)[0].title}</Text>
                </View>


                <View>


                    <ImageBackground source={{uri:"https://latinet.co.il/"+setArray(organizationEvents.organizationEvents.organizationEvents).filter(item => item.nid == selectedLine)[0].general_image[0]}} resizeMode="cover" style={styles.image}></ImageBackground>


                </View>


                <View style={styles.dance_floors}>
                    <Text style={styles.danceFloorsText}>{nice_list_text(setArray(organizationEvents.organizationEvents.organizationEvents).filter(item => item.nid == selectedLine)[0].dance_floors)}</Text>
                </View>
                <View style={styles.fullInfoBox}>
                    <RenderHtml
                        contentWidth={width}
                        source={setText(setArray(organizationEvents.organizationEvents.organizationEvents).filter(item => item.nid == selectedLine)[0].text)}
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
                        style={{
                            backgroundColor:"none",
                            
                        }}
                    />
                </View>
                
                <Schedule schedule={{labels:organizationEvents.organizationEvents.labels, schedule:setArray(organizationEvents.organizationEvents.organizationEvents).filter(item => item.nid == selectedLine)[0].time_part}}></Schedule>
                
                
                <Prices prices={{labels:organizationEvents.organizationEvents.labels, prices:setArray(organizationEvents.organizationEvents.organizationEvents).filter(item => item.nid == selectedLine)[0].tickets}}></Prices>
                
            </View>
        </View>
    );
}
export default OrganizationEvents;
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
        paddingRight:10,
        paddingLeft:10,
    },
    fullInfoBox:{
        flex:1,

    },

    image: {
		width:width-20,
		flex: 1,
		justifyContent: 'flex-end',
        height:height/4,
        paddingRight:0
	},

    eventTitle:{
        marginTop:10
    },
    eventTitleText:{
        fontSize:30,
        lineHeight:30
    },
    dance_floors:{
        marginTop:10,
        
    },
    danceFloorsText:{
        fontSize:13,
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