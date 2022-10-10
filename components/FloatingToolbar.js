// floating tool bar

import React, { useState, useEffect } from 'react';
import {View, Button, Image, StyleSheet, Text} from 'react-native';


export default function FloatingToolbar(props) {
    const [shownPage, showPage] = useState(0); // move it to main for higher scope if we allow horizontal scroll
    return(
        <View>
            <View><Text>Main</Text></View>
            <View><Text>Dishes</Text></View>
            <View><Text>Ingredients</Text></View>
            <View><Text>Camera</Text></View>
        </View>
    );
}