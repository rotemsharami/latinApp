import React, {useRef, useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import { ButtonGroup } from '@rneui/themed';
import {navigate} from "../../../RootNavigation";
import {getMyObject, setObjectValue} from "../../tools/tools";
import storage from '../../storage/storage';
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement, changeLanguage} from '../../actions/counterActions';
const Configuration = (info) => {
	const dispatch = useDispatch();
	const count = useSelector((store) => store.count.count);
	const changeLng = (lng) => {
	  dispatch(changeLanguage(lng));
	};
	const [sdata, setSdata] = useState({});
	useEffect(() => {
		storage
		.load({
		  key: 'latinApp',
		  autoSync: true,
		  syncInBackground: true,
		  syncParams: {
			extraFetchOptions: {
			},
			someFlag: true
		  }
		})
		.then(ret => {
			setSdata(ret);
		})
		.catch(err => {
		  switch (err.name) {
			case 'NotFoundError':
			  break;
			case 'ExpiredError':
			  break;
		  }
		});
		

		if(sdata.lng != undefined){
			
		}else{

		}




		// if(newU === true){
			
		// }
	}, [sdata]);

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [newU, setNewU] = useState(true);

	return(
		<View style={styles.container}>
			<View style={styles.buttonsBox}>
				<ButtonGroup
					buttons={['English', 'עברית']}
					selectedIndex={selectedIndex}
					buttonStyle={styles.button}
					vertical={true}
					onPress={(value) => {
						let lng = value == 0 ? "en" : "he";
						setSelectedIndex(value);
						changeLng(lng);
						setObjectValue({lng:lng});
						navigate("HomePage", {});
					}}
					containerStyle={{ marginBottom: 20 }}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonsBox:{
		alignSelf:"center",
		width:"100%",
	},
	container:{
		height:"100%",
		justifyContent:"center"
	}
});

export default Configuration;