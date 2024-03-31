import {Animated, FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import SlideItem from './SlideItem';

const {width, height} = Dimensions.get('screen');
const Slider = ({organizationsCarusel}) => {
	
	const [data, setData] = useState([]);
	const [index, setIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const dataFetchedRef = useRef(false).current;

	const renderItem = useCallback(({item}) => (
		<View key={item.nid}>
		   <SlideItem item={item} />
		</View>
	), []);


	const handleOnScroll = event => {
		Animated.event([{
				nativeEvent: {
					contentOffset: {
						x: scrollX,
					},
				},
			},],{
			useNativeDriver: false,
		},
		)(event);
	};
	
	const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
		setIndex(viewableItems[0].index);
	}).current;

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
	}).current;

	return (

		
		<View style={styles.container}>
			<FlatList
				data={organizationsCarusel}
				// renderItem={({item}) => <SlideItem item={item} />}
				renderItem={renderItem}
				horizontal
				keyExtractor={(item, index) => index.toString()}
				vertical={false}
				pagingEnabled
				snapToAlignment="start"
				showsHorizontalScrollIndicator={true}
				onScroll={handleOnScroll}
				viewabilityConfig={viewabilityConfig}
				nestedScrollEnabled={false}
				removeClippedSubviews={true}
			/>
		</View>
	);
};

export default Slider;
const styles = StyleSheet.create({
	container:{
		height:(height/3),
	}
});