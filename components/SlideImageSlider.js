import React, { useRef, useState } from 'react';
import { View, ScrollView, Image, Dimensions,StyleSheet } from 'react-native';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';

const SlideImageSlider = ({ images }) => {
  // console.log(images);
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    setCurrentPage(page);
  };

  const handleSwipe = (pageIndex) => {
    if (scrollViewRef.current) {
      const offset = pageIndex * Dimensions.get('window').width;
      scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
    }
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View style={{width: Dimensions.get('window').width-20, height: 350, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.8)'}}>
             <ReactNativeZoomableView
            zoomEnabled={true}
            maxZoom={3}
            minZoom={1}
            zoomStep={1}
            initialZoom={1}
            bindToBorders={true}
            style={styles.zoomableView}
          >
          <Image key={index} source={{uri:image}} style={{ width: 320, height: index==0?240: 300 }} />
          </ReactNativeZoomableView>
          
          </View>
        ))}
      </ScrollView>
      
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 0,paddingVertical: 8, backgroundColor: 'rgba(255,255,255,0.8)',}}>
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: index === currentPage ? 'rgba(88,44,36,1)' : 'rgba(0,0,0,0.2)',
              marginHorizontal: 5,
            }}
            onTouchEnd={() => handleSwipe(index)}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  zoomableView: {
    // paddingTop:42,
    // backgroundColor:"red"
  }})

export default SlideImageSlider;