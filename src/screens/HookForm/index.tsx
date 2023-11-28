import React from 'react';
import {Text} from 'tamagui';
import {View, TextInput, Button, Alert} from 'react-native';
import {useForm, SubmitHandler} from 'react-hook-form';
import styles from './styles';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  gender: GenderEnum;
}

export default function HookForm() {
  const {register, handleSubmit} = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data, 'submit');
    Alert.alert(JSON.stringify(data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} {...register('firstName')} />
      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} {...register('lastName')} />
      <Text style={styles.label}>Age</Text>
      <TextInput style={styles.input} {...register('age')} />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
