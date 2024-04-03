import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
    Linking,
	I18nManager
	} from 'react-native';

import React, {useRef, useState, useEffect} from 'react';
import {setArray} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const ContactInfo = (itemInfo) => {




    return(
        <View style={styles.container}>
            <View style={styles.titleLabel}>
                <Text style={styles.titleLabelText}></Text>
            </View>


            <View style={styles.list}>
                {itemInfo.itemInfo.route.params.event.facebook != undefined &&
                    <TouchableOpacity onPress={() => { Linking.openURL(itemInfo.itemInfo.route.params.event.facebook.uri); }}>
                        <View style={styles.listItem}>
                            <View style={styles.iconBox}>
                                <Icon style={styles.mainMenuListItemIcon} name='facebook' color='#FFF' size={30}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                {itemInfo.itemInfo.route.params.event.info_link != undefined &&
                    <TouchableOpacity onPress={() => { Linking.openURL(itemInfo.itemInfo.route.params.event.info_link.uri); }}>
                        <View style={styles.listItem}>
                            <View style={styles.iconBox}>
                                <Icon style={styles.mainMenuListItemIcon} name='credit-card' color='#FFF' size={30}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                {itemInfo.itemInfo.route.params.event.instegram != undefined &&
                    <TouchableOpacity onPress={() => { Linking.openURL(itemInfo.itemInfo.route.params.event.instegram.uri); }}>
                        <View style={styles.listItem}>
                            <View style={styles.iconBox}>
                                <MaterialCommunityIcons name="instagram" size={30} color="#FFF" />
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                {itemInfo.itemInfo.route.params.event.site != undefined &&
                    <TouchableOpacity onPress={() => { Linking.openURL(itemInfo.itemInfo.route.params.event.site.uri); }}>
                        <View style={styles.listItem}>
                            <View style={styles.iconBox}>
                                <MaterialCommunityIcons name="web" size={30} color="#FFF" />
                            </View>
                        </View>
                    </TouchableOpacity>
                }




                
            </View>



        </View>
    );
}
export default ContactInfo;
const styles = StyleSheet.create({
    container:{
    },
    list:{
        flexDirection:'row',
        justifyContent:"space-around",
        backgroundColor:"#730874"
    },

    listItem:{
        backgroundColor:"#730874",
        flexDirection:'column',
        padding:10,
    },


});