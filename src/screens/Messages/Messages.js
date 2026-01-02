import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { messages as initialMessages, chatMessages as initialChatMessages, currentUser } from '../../data/mockData';
import { Card, Avatar } from '../../components';
import { colors, typography, spacing, borderRadius } from '../../theme';

const Messages = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeConversation, setActiveConversation] = useState(null);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState(initialChatMessages);
  const flatListRef = useRef(null);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: currentUser.name,
        isMe: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: currentUser.avatar,
      };
      setChatHistory([...chatHistory, newMessage]);
      setInputText('');
    }
  };

  useEffect(() => {
    if (activeConversation && flatListRef.current) {
      setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 100);
    }
  }, [chatHistory, activeConversation]);

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity onPress={() => setActiveConversation(item)}>
      <Card style={[styles.conversationCard, isDark && styles.cardDark]}>
        <View style={styles.item}>
          <Avatar name={item.sender} imageUrl={item.senderAvatar} size={50} />
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={[styles.sender, isDark && styles.senderDark]}>{item.sender}</Text>
              <Text style={[styles.time, isDark && styles.timeDark]}>{item.time}</Text>
            </View>
            <Text style={[styles.messagePreview, isDark && styles.messageDark]} numberOfLines={1}>
              {item.content}
            </Text>
          </View>
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderChatMessage = ({ item }) => (
    <View style={[
      styles.messageBubbleContainer, 
      item.isMe ? styles.myMessageContainer : styles.theirMessageContainer
    ]}>
      {!item.isMe && (
        <Avatar name={item.sender} imageUrl={item.avatar} size={32} style={styles.chatAvatar} />
      )}
      <View style={[
        styles.messageBubble, 
        item.isMe ? styles.myMessageBubble : styles.theirMessageBubble,
        isDark && !item.isMe && styles.theirMessageBubbleDark
      ]}>
        {!item.isMe && <Text style={styles.senderName}>{item.sender}</Text>}
        <Text style={[
          styles.messageText, 
          item.isMe ? styles.myMessageText : styles.theirMessageText,
          isDark && !item.isMe && styles.textDark
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.messageTime, 
          item.isMe ? styles.myMessageTime : styles.theirMessageTime,
          isDark && !item.isMe && styles.timeDark
        ]}>
          {item.time}
        </Text>
      </View>
    </View>
  );

  if (activeConversation) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
        <View style={[styles.chatHeader, isDark && styles.headerDark]}>
          <TouchableOpacity onPress={() => setActiveConversation(null)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={isDark ? colors.white : colors.black} />
          </TouchableOpacity>
          <Avatar name={activeConversation.sender} imageUrl={activeConversation.senderAvatar} size={40} />
          <View style={styles.headerInfo}>
            <Text style={[styles.headerTitle, isDark && styles.textDark]}>{activeConversation.sender}</Text>
            <Text style={styles.headerStatus}>En ligne</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color={isDark ? colors.white : colors.black} />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={chatHistory}
          renderItem={renderChatMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
          <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
            </TouchableOpacity>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="Écrivez votre message..."
              placeholderTextColor={colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
            >
              <Ionicons name="send" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.wrapper}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Messages</Text>
        <FlatList
          data={initialMessages}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerDark: {
    backgroundColor: colors.backgroundDark,
  },
  wrapper: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  titleDark: {
    color: colors.textDark,
  },
  conversationCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  cardDark: {
    backgroundColor: colors.surfaceDark,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  sender: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  senderDark: {
    color: colors.textDark,
  },
  time: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  timeDark: {
    color: colors.textSecondaryDark,
  },
  messagePreview: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
  messageDark: {
    color: colors.textSecondaryDark,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  badgeText: {
    color: colors.surface,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  // Chat Detail Styles
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  headerDark: {
    backgroundColor: colors.backgroundDark,
    borderBottomColor: colors.gray800,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  headerStatus: {
    fontSize: typography.fontSize.xs,
    color: colors.success,
  },
  chatList: {
    padding: spacing.md,
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  theirMessageContainer: {
    justifyContent: 'flex-start',
  },
  chatAvatar: {
    marginRight: spacing.xs,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
  },
  myMessageBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  theirMessageBubble: {
    backgroundColor: colors.gray100,
    borderBottomLeftRadius: 4,
  },
  theirMessageBubbleDark: {
    backgroundColor: colors.gray800,
  },
  senderName: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  messageText: {
    fontSize: typography.fontSize.base,
  },
  myMessageText: {
    color: colors.white,
  },
  theirMessageText: {
    color: colors.text,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  theirMessageTime: {
    color: colors.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  inputContainerDark: {
    backgroundColor: colors.backgroundDark,
    borderTopColor: colors.gray800,
  },
  attachButton: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
    marginRight: spacing.sm,
    color: colors.text,
  },
  inputDark: {
    backgroundColor: colors.gray800,
    color: colors.textDark,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.gray400,
  },
  textDark: {
    color: colors.textDark,
  },
});

export default Messages;
