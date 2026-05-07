import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '.././hooks/themeContext';
import { rf } from '.././constants/ResponsiveUI';
import { ModalBoxProps } from '.././interfaces/type';

import { icon } from '.././assets/icons/icon';

export default function ModalBox({
  item,
  modalVisible,
  setModalVisible,
}: ModalBoxProps) {
  const { theme } = useAppTheme();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      style={{ backgroundColor: theme.card }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.titleText, { color: theme.text }]}>
            {item ? 'Updated!' : 'Saved!'}
          </Text>

          <Text style={styles.bodyText}>
            {item ? 'Data updated successfully' : 'Data saved successfully'}
          </Text>

          {/* <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.button }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>
              Close
            </Text>
          </TouchableOpacity> */}
          <Image source={icon.success} style={styles.lottie} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  titleText: {
    fontSize: rf(20),
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lottie: { width: 50, height: 50 },
});
