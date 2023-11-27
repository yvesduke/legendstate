import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../assets/constants';
import {ButtonVariant} from '../../../types/button.enum';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = ButtonVariant.SUCCESS,
  small,
  ...restProps
}) => {
  const handleButtonVariance = () => {
    if (variant === ButtonVariant.DANGER) {
      return styles.danger;
    }
    return styles.success;
  };

  const handleSize = () => {
    return small ? styles.small : styles.default;
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      {...restProps}
      style={[handleButtonVariance(), handleSize()]}>
      {restProps.children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  default: {padding: 10, borderRadius: 4, marginTop: 8, alignItems: 'center'},
  small: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  success: {
    backgroundColor: COLORS.GREEN,
  },
  danger: {
    backgroundColor: COLORS.RED,
  },
});
