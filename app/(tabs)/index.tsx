import React, { useState } from 'react';
import { 
   StyleSheet, 
   Text, 
   View, 
   Image,
   TouchableOpacity,
   TextInput,
   ScrollView
} from 'react-native';
import { Stack } from 'expo-router';
import colors from "../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import CategoryButton from '@/components/CategoryButton';
import Listings from '@/components/Listings';
import listingData from "@/data/destinations.json";
import GroupListings from '@/components/GroupListing';
import GroupData from '@/data/groups.json';

const Page = () => {
   const headerHeight = useHeaderHeight();
   const [category, setCategory] = useState('All');

   const onCatChanged = (category: string) => {
    console.log("category", category);
     setCategory(category);
   }
    return (
      <>
     <Stack.Screen options={{
      headerTransparent: true,
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => {}}
         style={{
            marginLeft: 20
         }}
         >
          <Image 
            source={{uri: "https://xsgames.co/randomusers/avatar.php?g=female"}}
            style={{
               width: 40,
               height: 40,
               borderRadius: 10
            }}
          />
        </TouchableOpacity>
       ),
       headerRight: () => (
         <TouchableOpacity 
           onPress={() => {}}
           style={{
            marginRight: 20,
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 10,
            shadowColor: "#171717",
            shadowOffset: { width: 2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3
           }}
         >
            <Ionicons 
             name="notifications" 
             size={20} 
             color={colors.black} />
         </TouchableOpacity>
       )
     }} />
     <View style={[styles.container, { paddingTop: headerHeight}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headingText}>Explore The Beautiful World!</Text>
        <View style={styles.searchSectionWrapper}>
          <View style={styles.searchBar}>
            <Ionicons 
              name="search" 
              size={18} 
              style={{
                marginRight: 5
              }}
              color={colors.black}
            />
            <TextInput placeholder="Search..." />
          </View>
          <TouchableOpacity 
            onPress={() => {}}
            style={styles.filterBtn}
            >
             <Ionicons 
              name="options" 
              size={28} 
              color={colors.white}
            /> 
          </TouchableOpacity>
        </View>

        <CategoryButton 
          onCategoryChanged={onCatChanged}
         />
         <Listings
          listings={listingData}
          category={category}
         />
         <GroupListings listings={GroupData} />
         </ScrollView>
     </View>
     </>
    );
}

export default Page;

const styles = StyleSheet.create({
   container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.bgColor
   },
   headingText: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.black,
      marginTop: 10,
   },
   searchSectionWrapper: {
     flexDirection: 'row',
     marginVertical: 20
   },
   searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 10
   },
   filterBtn: {
     backgroundColor: colors.primaryColor,
     padding: 12,
     borderRadius: 10,
     marginLeft: 20
   }
})