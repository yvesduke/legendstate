import React from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import styles from './styles';

interface IFormInput {
  firstName: string;
  lastName: string;
}

const HookForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    Alert.alert(
      'Form Submitted',
      `First Name: ${data.firstName}\nLast Name: ${data.lastName}`,
    );
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && (
        <Text style={styles.errorText}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Last name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.firstName && (
        <Text style={styles.errorText}>This is required.</Text>
      )}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HookForm;
