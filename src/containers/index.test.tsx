import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TabNavigation from './TabNavigation';
import appConfig from '../../tamagui.config';
import {TamaguiProvider} from 'tamagui';

describe('TabNavigation', () => {
  const setup = () =>
    // Arrange
    render(
      <TamaguiProvider config={appConfig}>
        <TabNavigation />
      </TamaguiProvider>,
    );

  test('Tab Navigation switches between screens', async () => {
    const {getByText} = setup(); // Use the setup function

    // By default, the "Legend" screen should be active
    expect(getByText('Legend')).toBeTruthy();
    expect(getByText('Form')).toBeFalsy();

    // Navigate to the "Form" screen
    fireEvent.press(getByText('Form'));

    // Now, the "Form" screen should be active
    expect(getByText('Legend')).toBeFalsy();
    expect(getByText('Form')).toBeTruthy();
  });
});
