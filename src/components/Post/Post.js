import React, { useRef } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Animated, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { setTextDirection } from "../../tools/tools.js";

const { width } = Dimensions.get('screen');

const Post = ({ route }) => {
    const count = useSelector((store) => store.count.count);
    const dir = setTextDirection(count.lng);
    const scaleAnim = useRef(new Animated.Value(0)).current;

    return (
        <View style={[styles.container, {
			flex: 1,
			padding:10
			
			}]}>
			<View 
				style={{
					marginTop:5
				}}
			><Text
				style={{
					paddingTop:5,
					fontSize:40,
					lineHeight:38,
					fontWeight:"bold"
				}}
			>{route.params.item.title}</Text></View>

			<View 
				style={{
					marginTop:10
				}}
			><Text
				style={{
					fontSize:24,
					lineHeight:25
				}}
			>{route.params.item.short_description}</Text></View>

            <ImageBackground
                source={{ uri: "https://latinet.co.il/" + route.params.item.general_image[0].uri }}
                style={styles.imageBackground}
            >
                {/* Add any content you want to overlay on the background image here */}
            </ImageBackground>

        </View>
    );
};

export default Post;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        width: '100%',
		marginTop:10,
        aspectRatio: 9 / 5,
        justifyContent: 'center', // Optional: Center content vertically
        alignItems: 'center', // Optional: Center content horizontally
    },
});
