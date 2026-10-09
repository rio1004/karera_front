import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface WalletPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void;
  onForgotPassword?: () => void;
}

export const WalletPinModal: React.FC<WalletPinModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onForgotPassword,
}) => {
  const [pin, setPin] = useState<string[]>(['', '', '', '']); // Array to hold each digit
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Focus the first empty input when modal opens
      const firstEmptyIndex = pin.findIndex(digit => digit === '');
      if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
        inputRefs.current[firstEmptyIndex]?.focus();
      }
    } else {
      // Clear PIN when modal closes
      setPin(['', '', '', '']);
    }
  }, [isOpen]); // Only run when isOpen changes

  if (!isOpen) return null;

  const handlePinInput = (digit: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = digit;
    setPin(newPin);

    // Auto-focus next input
    if (digit !== '' && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyboardClick = (value: string) => {
    const currentPin = pin.join(''); // Current complete PIN string

    if (value === 'clear') {
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus(); // Focus first input
    } else if (value === 'backspace') {
      if (currentPin.length > 0) {
        const lastFilledIndex = pin.findLastIndex(d => d !== '');
        if (lastFilledIndex !== -1) {
            const newPin = [...pin];
            newPin[lastFilledIndex] = '';
            setPin(newPin);
            inputRefs.current[lastFilledIndex]?.focus(); // Focus the cleared input
        }
      }
    } else if (currentPin.length < 4) {
      // Add digit if PIN is not full
      const firstEmptyIndex = pin.findIndex(digit => digit === '');
      if (firstEmptyIndex !== -1) {
        handlePinInput(value, firstEmptyIndex);
      }
    }
  };

  const handleConfirmClick = () => {
    const enteredPin = pin.join('');
    if (enteredPin.length === 4) {
      onConfirm(enteredPin);
    } else {
      // You might want to add a toast message here for incomplete PIN
      alert('Please enter a 4-digit PIN.');
    }
  };

  const numericKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 shadow-lg max-w-sm w-full relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6 mt-4">
          <img src="/images/money_wallet.png" alt="Wallet Icon" className="mx-auto mb-3 w-16 h-16" /> {/* Use a similar icon */}
          <h2 className="text-xl font-semibold text-gray-800">Enter your 4-Digit Wallet PIN</h2>
        </div>

        {/* PIN Input Fields */}
        <div className="flex justify-center space-x-3 mb-6">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={el => {
                if (el) {
                  inputRefs.current[index] = el;
                }
              }}
              type="password" // Use type="password" to mask input
              maxLength={1}
              value={digit}
              readOnly // Make it read-only to force numpad input
              className="w-14 h-14 text-center text-3xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00A24A]"
              onClick={() => inputRefs.current[index]?.focus()} // Allow clicking to focus
              // No onChange needed directly as we use the keypad
            />
          ))}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {numericKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleKeyboardClick(key)}
              className="bg-gray-100 rounded-lg py-4 text-2xl font-semibold text-gray-800 hover:bg-gray-200 active:bg-gray-300"
            >
              {key}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleKeyboardClick('clear')}
            className="bg-gray-100 rounded-lg py-4 text-2xl font-semibold text-gray-800 hover:bg-gray-200 active:bg-gray-300 flex justify-center items-center"
          >
            {/* Refresh/Clear icon */}
            <img src="/icons/keypad_refresh.svg" alt="Refresh" className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => handleKeyboardClick('0')}
            className="bg-gray-100 rounded-lg py-4 text-2xl font-semibold text-gray-800 hover:bg-gray-200 active:bg-gray-300"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => handleKeyboardClick('backspace')}
            className="bg-gray-100 rounded-lg py-4 text-2xl font-semibold text-gray-800 hover:bg-gray-200 active:bg-gray-300 flex justify-center items-center"
          >
            <img src="/icons/keypad_remove.svg" alt="Remove" className="w-6 h-6" />
          </button>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmClick}
          className="w-full bg-[#00A24A] text-white py-4 rounded-lg text-lg font-medium hover:bg-[#008A3F] transition-colors"
        >
          Confirm
        </button>

        {/* Forgot PIN Link */}
        {onForgotPassword && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-blue-500 text-sm font-medium hover:underline"
            >
              Forgot Wallet PIN?
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body // Portal to document.body to ensure it's on top
  );
};