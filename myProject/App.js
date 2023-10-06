import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';

export default function App() {
  const denominations = [
    { name: '2000 ', key: '1', value: 2000 },
    { name: '500 ', key: '2', value: 500 },
    { name: '200 ', key: '3', value: 200 },
    { name: '100 ', key: '4', value: 100 },
    { name: '50 ', key: '5', value: 50 },
    { name: '20 ', key: '6', value: 20 },
    { name: '10 ', key: '7', value: 10 },
  ];

  const [denominationQuantities, setDenominationQuantities] = useState(
    Array(denominations.length).fill('')
  );

  const handleQuantityChange = (index, value) => {
    // Validate input as a number
    if (/^\d+$/.test(value) || value === '') {
      const newQuantities = [...denominationQuantities];
      newQuantities[index] = value;
      setDenominationQuantities(newQuantities);
    }
  };

  const calculateTotalValue = () => {
    let totalValues = [];

    for (let i = 0; i < denominations.length; i++) {
      const quantity = parseInt(denominationQuantities[i]) || 0;
      totalValues[i] = quantity * denominations[i].value;
    }

    return totalValues;
  };

  const totalValues = calculateTotalValue();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Denomination App</Text>
        {denominations.map((item, index) => (
          <View key={item.key}>
            <View style={styles.den}>
              <Text style={{fontWeight: '900',fontSize: 25}}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 5 ,fontWeight: 900}}>x</Text>
                {/* <View style={styles.textInputContainer}> */}
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(value) => handleQuantityChange(index, value)}
                    value={denominationQuantities[index]}
                    cursorColor={'black'}
                  />
                {/* </View> */}
              </View>
              <Text style={{fontWeight: '900',fontSize: 25}}> = {totalValues[index]}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.total}>Total : ₨ {totalValues.reduce((a, b) => a + b)}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#87CEEB',
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 900,
  },
  den: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'pink',
    padding: 10,
    fontSize: 24,
    fontWeight: '900',
    
  },
  // textInputContainer: {
    
  //   width: 100,
  //   marginLeft: 10,
  //   flex: 1,
  //   alignContent: 'center',
  // },
  input: {
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width: 100,
    fontWeight: '900',
    fontSize: 22,
    marginLeft: 5,
    
    // borderRadius: 10,
  },
  total: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#00FF7F',
    padding: 10,
    marginTop: 10,
    fontWeight: 900,
  },
});
