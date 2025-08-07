import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { X, Clock } from 'lucide-react-native';

interface PickupTimeModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (pickupTime: string) => void;
}

const PickupTimeModal: React.FC<PickupTimeModalProps> = ({ visible, onClose, onConfirm }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedTime, setSelectedTime] = useState('');

  // Generate time slots from 9:30 AM to 3:45 PM with 15-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const startMinute = 30;
    const endHour = 15;
    const endMinute = 45;

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
      const time12 = `${currentHour > 12 ? currentHour - 12 : currentHour}:${currentMinute.toString().padStart(2, '0')} ${currentHour >= 12 ? 'PM' : 'AM'}`;
      slots.push(time12);

      currentMinute += 15;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleConfirm = () => {
    if (selectedTime) {
      onConfirm(selectedTime);
      setSelectedTime('');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
              Select Pickup Time
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={isDarkMode ? '#FFFFFF' : '#1F2937'} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.modalSubtitle, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
            Available pickup times: 9:30 AM - 3:45 PM
          </Text>

          <ScrollView style={styles.timeSlotContainer} showsVerticalScrollIndicator={false}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  {
                    backgroundColor: selectedTime === time 
                      ? '#F97316' 
                      : isDarkMode ? '#374151' : '#F9FAFB',
                    borderColor: selectedTime === time 
                      ? '#F97316' 
                      : isDarkMode ? '#4B5563' : '#E5E7EB',
                  }
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Clock 
                  size={18} 
                  color={selectedTime === time ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#1F2937'} 
                />
                <Text style={[
                  styles.timeSlotText,
                  { 
                    color: selectedTime === time ? '#FFFFFF' : isDarkMode ? '#FFFFFF' : '#1F2937' 
                  }
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }]}
              onPress={onClose}
            >
              <Text style={[styles.cancelButtonText, { color: isDarkMode ? '#FFFFFF' : '#1F2937' }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                { 
                  backgroundColor: selectedTime ? '#F97316' : '#9CA3AF',
                  opacity: selectedTime ? 1 : 0.5 
                }
              ]}
              onPress={handleConfirm}
              disabled={!selectedTime}
            >
              <Text style={styles.confirmButtonText}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  timeSlotContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PickupTimeModal;