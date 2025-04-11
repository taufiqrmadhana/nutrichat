import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const GEMINI_API_KEY = "AIzaSyA8oA5wbNn2LsSTaY45deY17nEGxM_cCVc";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "" || loading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [
                {
                  text: `Nama kamu adalah JoniBot. Kamu adalah asisten kesehatan yang ingin berada di sebuah aplikasi 
                  yang menjaga pola makan dan pola hidup bernama NutriChat. Kamu disini memberikan informasi 
                  untuk pengguna agar mereka dapat memilih makanan yang tepat dan sehat.`,
                },
              ],
            },
            contents: [
              {
                parts: [{ text: input }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, aku tidak mengerti.";

      const botMessage: Message = { id: Date.now().toString() + "-bot", text: botReply, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching from Gemini:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nutrichat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === "user" ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.messageText, item.sender === "user" ? styles.userText : styles.botText]}>
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Send a message..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={loading}>
          <Text style={styles.sendText}>{loading ? "..." : "➤"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 16, paddingTop: 40 },
  header: { fontSize: 20, fontWeight: "bold", color: "#ff7f00", textAlign: "left", marginBottom: 10 },
  chatContainer: { flexGrow: 1, justifyContent: "flex-end" },
  messageBubble: { maxWidth: "80%", padding: 10, borderRadius: 10, marginBottom: 8 },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#1e3a8a" },
  botBubble: { alignSelf: "flex-start", backgroundColor: "#e5e7eb" },
  messageText: { fontSize: 14 },
  userText: { color: "white" },
  botText: { color: "black" },
  inputContainer: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderTopWidth: 1, borderColor: "#333" },
  input: { flex: 1, backgroundColor: "#333", color: "white", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 25 },
  sendButton: { marginLeft: 10, backgroundColor: "#ff7f00", padding: 10, borderRadius: 20 },
  sendText: { color: "white", fontSize: 16 },
});
