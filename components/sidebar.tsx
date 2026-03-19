import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type Props = {
  documentId: number
}

export default function Sidebar({documentId}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  async function handleSend() {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputText.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    const response = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ document_id: documentId, question: userMessage.text})
    })
    const data = await response.json()
    const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: data.answer,
    }
    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  function renderMessage({ item }: { item: Message }) {
    const isUser = item.role === "user";
    return (
      <View style={[styles.bubbleWrapper, isUser ? styles.userWrapper : styles.assistantWrapper]}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
          <Text style={[styles.bubbleText, isUser ? styles.userText : styles.assistantText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ask LectureMind</Text>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Ask anything about your lecture.</Text>
          </View>
        }
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loadingBubble}>
              <ActivityIndicator size="small" color="#D4A847" />
            </View>
          ) : null
        }
      />

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Ask a question..."
          placeholderTextColor="#555"
          value={inputText}
          onChangeText={setInputText}
          multiline
          blurOnSubmit={false}
        />
        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08080D",
    borderLeftWidth: 1,
    borderLeftColor: "#1E1E2A",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1E1E2A",
  },
  headerTitle: {
    color: "#D4A847",
    fontSize: 16,
    fontWeight: "600",
  },
  messageList: {
    padding: 12,
    gap: 8,
    flexGrow: 1,
  },
  bubbleWrapper: {
    marginVertical: 4,
    flexDirection: "row",
  },
  userWrapper: {
    justifyContent: "flex-end",
  },
  assistantWrapper: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: "#D4A847",
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: "#1E1E2A",
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: "#08080D",
  },
  assistantText: {
    color: "#ECEDEE",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  emptyText: {
    color: "#555",
    fontSize: 14,
  },
  loadingBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#1E1E2A",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 4,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#1E1E2A",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#1E1E2A",
    color: "#ECEDEE",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: "#D4A847",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  sendButtonText: {
    color: "#08080D",
    fontWeight: "600",
    fontSize: 14,
  },
});