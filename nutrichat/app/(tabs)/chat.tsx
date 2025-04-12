import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";

const GEMINI_API_KEY = "AIzaSyA8oA5wbNn2LsSTaY45deY17nEGxM_cCVc";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
};

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "" || loading) return;

    const userMessage: Message = { 
      id: Date.now().toString(), 
      text: input, 
      sender: "user",
      timestamp: Date.now()
    };
    
    setMessages((prev) => [...prev, userMessage]);
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
              parts: [{
                text: `Nama kamu adalah JoniBot. Kamu adalah asisten kesehatan ahli nutrisi di aplikasi NutriChat. 
                Berikan jawaban singkat (maks 3 kalimat) dengan format jelas dan poin-poin menggunakan bullet points (•).
                Fokus pada saran makanan sehat, pola makan, dan gaya hidup. Gunakan bahasa informal yang ramah.`,
              }],
            },
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, aku sedang sibuk. Coba tanya lagi nanti ya!";

      const botMessage: Message = { 
        id: Date.now().toString() + "-bot", 
        text: botReply, 
        sender: "bot",
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, {
        id: Date.now().toString() + "-error",
        text: "Ups! JoniBot sedang gangguan, coba lagi ya...",
        sender: "bot",
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={require('@/assets/logo.png')} style={styles.logo} /> */}
        <Text style={styles.title}>Nutrichat</Text>
        <View style={styles.statusDot} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer, 
            item.sender === "user" ? styles.userContainer : styles.botContainer
          ]}>
            {item.sender === "bot" && (
              <Image source={require('@/assets/bot-avatar.png')} style={styles.avatar} />
            )}
            
            <View style={[
              styles.bubble, 
              item.sender === "user" ? styles.userBubble : styles.botBubble
            ]}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timeText}>{formatTime(item.timestamp)}</Text>
            </View>

            {item.sender === "user" && (
              <Image source={require('@/assets/default-avatar.png')} style={styles.avatar} />
            )}
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Image source={require('@/assets/comment-icon.png')} style={styles.emptyImage} />
            <Text style={styles.emptyText}>Aku JoniBot, AI nutritionismu! Tanya apa saja tentang pola makan sehat 🥗</Text>
          </View>
        }
      />

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="✍️ Tanya JoniBot..."
          placeholderTextColor="#FFA500"
          value={input}
          onChangeText={setInput}
          multiline
        />
        
        <TouchableOpacity 
          style={[styles.sendButton, loading && styles.disabledButton]} 
          onPress={sendMessage}
          disabled={loading}
        >
          <Text style={styles.sendIcon}>
            {loading ? '⏳' : '🚀'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A0A" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    paddingTop: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  logo: { width: 36, height: 36, borderRadius: 8 },
  title: { color: "#FFA500", fontSize: 24, fontWeight: "bold" },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    marginRight: 8,
    marginLeft:8
  },
  chatContainer: { padding: 16 },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 8
  },
  userContainer: { justifyContent: "flex-end" },
  botContainer: { justifyContent: "flex-start" },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginTop: 4
  },
  bubble: {
    maxWidth: "80%",
    padding: 14,
    borderRadius: 18,
    borderWidth: 1
  },
  userBubble: {
    backgroundColor: "#1E3A8A",
    borderColor: "#1E3A8A55",
    borderBottomRightRadius: 4
  },
  botBubble: {
    backgroundColor: "#2A2A2A",
    borderColor: "#404040",
    borderBottomLeftRadius: 4
  },
  messageText: {
    color: "#FFF",
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "Inter_400Regular"
  },
  timeText: {
    color: "#FFFFFF88",
    fontSize: 10,
    marginTop: 6,
    alignSelf: "flex-end"
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 32,
    gap: 20
  },
  emptyImage: {
    width: 160,
    height: 160,
    opacity: 0.8
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 24,
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderColor: "#222"
  },
  input: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    color: "#FFA500",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#FFA50022",
    minHeight: 48,
    maxHeight: 120
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: "#FFA500",
    padding: 14,
    borderRadius: 20,
    elevation: 4
  },
  disabledButton: {
    backgroundColor: "#FFA50055"
  },
  sendIcon: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  }
});