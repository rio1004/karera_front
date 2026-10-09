export const formatNumber = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null || value === '') {
    return '0.00';
  }

  let numValue: number;
  if (typeof value === 'string') {
    numValue = parseFloat(value);
    // Handle invalid number strings
    if (isNaN(numValue)) {
      return '0.00';
    }
  } else {
    numValue = value;
  }

  if (isNaN(numValue)) {
    return '0.00';
  }

  try {
    return numValue.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } catch (error) {
    console.error('Error formatting number:', error);
    return '0.00';
  }
};