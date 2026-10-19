import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const automatedResponses = {
    hello: "Halo! Bagaimana saya bisa membantu Anda hari ini?",
    help: "Tentu, saya di sini untuk membantu! Apa yang Anda butuhkan?",
    schedule: "Anda dapat melihat jadwal pengambilan Anda di bagian 'Jadwal Pengambilan'.",
    thanks: "Sama-sama! Senang bisa membantu Anda.",
    goodbye: "Sampai jumpa! Semoga harimu menyenangkan.",
    default: "Maaf, saya tidak mengerti. Bisakah Anda mengulangi dengan cara yang berbeda?"
  };

  const handleSend = () => {
    if (inputMessage.trim().length === 0) return;

    const newMessages = [
      ...messages,
      { id: messages.length.toString(), text: inputMessage, isUser: true }
    ];

    setMessages(newMessages);

    const response = generateResponse(inputMessage.toLowerCase());

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { id: (messages.length + 1).toString(), text: response, isUser: false }
      ]);
    }, 500);

    setInputMessage('');
  };

  const generateResponse = (userInput) => {
    if (userInput.includes('halo') || userInput.includes('hi') || userInput.includes('hello')) {
      return automatedResponses.hello;
    } else if (userInput.includes('bantu') || userInput.includes('help') || userInput.includes('tolong')) {
      return automatedResponses.help;
    } else if (userInput.includes('jadwal') || userInput.includes('schedule')) {
      return automatedResponses.schedule;
    } else if (userInput.includes('terima kasih') || userInput.includes('thanks')) {
      return automatedResponses.thanks;
    } else if (userInput.includes('sampai jumpa') || userInput.includes('goodbye')) {
      return automatedResponses.goodbye;
    } else {
      return automatedResponses.default;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ketik pesan Anda..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  messageContainer: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#659C6D',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#1D6354',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#1D6354',
    borderRadius: 5,
    marginLeft: 10,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
