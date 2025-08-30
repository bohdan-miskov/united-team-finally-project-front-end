export const calculatePasswordStrength = password => {
  if (!password) return 0;

  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  if (/[a-z]/.test(password)) strength += 1;

  if (/\d/.test(password)) strength += 1;

  if (/[^a-zA-Z\d]/.test(password)) strength += 1;

  return Math.min(strength, 4);
};

export const getPasswordStrengthText = strength => {
  switch (strength) {
    case 0:
      return 'Very Weak';
    case 1:
      return 'Weak';
    case 2:
      return 'Fair';
    case 3:
      return 'Good';
    case 4:
      return 'Strong';
    default:
      return '';
  }
};

export const getPasswordStrengthColor = strength => {
  switch (strength) {
    case 0:
    case 1:
      return 'very-weak';
    case 2:
      return 'fair';
    case 3:
      return 'good';
    case 4:
      return 'strong';
    default:
      return '';
  }
};
