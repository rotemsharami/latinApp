import React from 'react';
import PropTypes from 'prop-types';
import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar, Pressable} from 'react-native';
import OrganizationBoxLink from '../OrganizationBoxLink/OrganizationBoxLink';
import LearnBoxLink from '../LearnBoxLink/LearnBoxLink';



import { useSelector, useDispatch } from 'react-redux';
import { setArray } from '../../tools/tools';

const Learns = (info) => {

	

	const count = useSelector((store) => store.count.count);
	return(
		<ScrollView>

			{count.lines != undefined &&
				<View>

				{count.lines.learn != undefined &&
					<View>
						        
						{setArray(count.lines.learn).map((item, key) => {
							return (
								<LearnBoxLink _setOrganizationScreen={info._setOrganizationScreen} _setSelectedScreen={info._setSelectedScreen} _setOrganizationNid={info._setOrganizationNid} organization={item} key={"org-"+key}></LearnBoxLink>
								//<OrganizationBoxLink organization={item} key={"org-"+key}></OrganizationBoxLink>
								
								);
						})}
					</View>
				}
				</View>
			}
		</ScrollView>
	);
}


export default Learns;
