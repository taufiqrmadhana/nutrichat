import { useAuth } from "@/context/AuthContext";
import { sendMessageToAPI } from "@/utils/chat";
import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

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
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const { email } = useAuth();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      setShowNavbar(false);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      setShowNavbar(true);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };

  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

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
    console.log(email);
    if (email){
      const response = await sendMessageToAPI(email, userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }
    else{
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "JoniBot doesn't understand this, please try again",
        sender: "bot",
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {showNavbar && (
          <View style={styles.header}>
            <Text style={styles.title}>Nutrichat</Text>
            <View style={styles.statusDot} />
          </View>
        )}

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            style={{ flex: 1 }}
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
            contentContainerStyle={[styles.chatContainer, { paddingTop: showNavbar ? 120 : 60 }, { flexGrow: 1 }]}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Image source={require('@/assets/comment-icon.png')} style={styles.emptyImage} />
                <Text style={styles.emptyText}>Ask me anything about healthy lifestyle! 🥗</Text>
              </View>
            }
            ListFooterComponent={loading ? (
              <View style={[styles.messageContainer, styles.botContainer]}>
                <Image source={require('@/assets/bot-avatar.png')} style={styles.avatar} />
                <View style={[styles.bubble, styles.botBubble]}>
                  <Text style={styles.messageText}>🤔 I'm thinking</Text>
                </View>
              </View>
            ) : null}
          />

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="✍️ Ask JoniBot..."
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
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A0A" },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    paddingTop: 50,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  title: { 
    flex: 1, 
    color: "#FFA500",
    fontSize: 24,
    fontWeight: "800",
    marginLeft: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    marginRight: 8
  },
  chatContainer: { 
    paddingHorizontal: 16,
    paddingBottom: 20
  },
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
