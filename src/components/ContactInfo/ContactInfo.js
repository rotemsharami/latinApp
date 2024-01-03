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
import {setArray} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const ContactInfo = (contactInfo) => {
    return(
        <View style={styles.container}>
            <View style={styles.titleLabel}>
                <Text style={styles.titleLabelText}>fff</Text>
            </View>

        </View>
    );
}
export default ContactInfo;
const styles = StyleSheet.create({
    container:{
        padding:10
    }
});