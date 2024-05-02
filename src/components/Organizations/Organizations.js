import React from 'react';
import PropTypes from 'prop-types';
import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar, Pressable} from 'react-native';
import OrganizationBoxLink from '../OrganizationBoxLink/OrganizationBoxLink';




import { useSelector, useDispatch } from 'react-redux';
import { setArray } from '../../tools/tools';

const Organizations = () => {
	const count = useSelector((store) => store.count.count);
	return(
		<ScrollView>
			<Text>ddd</Text>

			{count.lines != undefined &&
				<View>

				{count.lines.organizations != undefined &&
					<View>
						        
						{setArray(count.lines.organizations).map((item, key) => {
							return (
								// <OrganizationBoxLink _setOrganizationScreen={info._setOrganizationScreen} _setSelectedScreen={info._setSelectedScreen} _setOrganizationNid={info._setOrganizationNid} organization={item} key={"org-"+key}></OrganizationBoxLink>
								<OrganizationBoxLink organization={item} key={"org-"+key}></OrganizationBoxLink>
								
								);
						})}
					</View>
				}
				</View>
			}
		</ScrollView>
	);
}

Organizations.propTypes = {};

Organizations.defaultProps = {};

export default Organizations;
