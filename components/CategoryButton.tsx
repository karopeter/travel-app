import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import colors from '@/app/constants/colors';
import destinationCategories from '@/data/categories';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
    onCategoryChanged: (category: string) => void;
  }
const CategoryButton = ({onCategoryChanged}: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null >([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];
       setActiveIndex(index);

      selected?.measure((x) => {
        scrollRef.current?.scrollTo({x: x, y: 0, animated: true});
      });

      onCategoryChanged(destinationCategories[index].title);
     };
    return (
      <View>
         <Text style={styles.title}>Categories</Text>
         <ScrollView
         ref={scrollRef}
          contentContainerStyle={{
            gap: 20,
            paddingHorizontal: 10,
            marginBottom: 10
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          >
             {destinationCategories.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  ref={(el) => itemRef.current[index] = el}
                  onPress={() => handleSelectCategory(index)}
                  style={activeIndex == index ? styles.categoriesBtnActive : styles.categoriesBtn}
                >
                  <MaterialCommunityIcons 
                    name={item.iconName as any}
                    size={20}
                    color={activeIndex == index ? colors.white : colors.black}
                 />
                  <Text style={activeIndex == index ? styles.categoriesBtnActiveText : styles.categoriesBtnTxt}>{item.title}</Text>
                </TouchableOpacity>
             ))}
         </ScrollView>
      </View>
    );
}

export default CategoryButton;

const styles = StyleSheet.create({
   title:{
    fontSize: 22,
    fontWeight: '700',
    color: colors.black
   },
   categoriesBtn: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: colors.white,
     paddingHorizontal: 16,
     paddingVertical: 10,
     borderRadius: 10,
     shadowColor: "#333333",
     shadowOffset: { width: 1, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 3,
   },
   categoriesBtnActive: {
    flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: colors.primaryColor,
     paddingHorizontal: 16,
     paddingVertical: 10,
     borderRadius: 10,
     shadowColor: "#333333",
     shadowOffset: { width: 1, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 3,
   },
   categoriesBtnActiveText: {
     marginLeft: 5,
     color: colors.white,
   },
   categoriesBtnTxt: {
    marginLeft: 5,
    color: colors.black
   }
})