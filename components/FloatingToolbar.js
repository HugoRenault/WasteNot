// floating tool bar

import React, { useState, useEffect } from 'react';
import {View, Button, Image, StyleSheet} from 'react-native';


export default function FloatingToolbar(props) {
    const [shownPage, showPage] = useState(0); // move it to main for higher scope if we allow horizontal scroll
    return(
        <View>
            <View>Main</View>
            <View>Dishes</View>
            <View>Ingredients</View>
            <View>Camera</View>
        </View>
    );
}