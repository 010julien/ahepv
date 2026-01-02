import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { forumCategories, forumTopics } from '../../data/mockData';
import { Card, Badge, Avatar, Button } from '../../components';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const Forum = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = useThemeColors();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [topics, setTopics] = useState(forumTopics);
  const [searchQuery, setSearchQuery] = useState('');

  const handleReply = () => {
    if (replyText.trim()) {
      // Mock sending reply
      Alert.alert('Succès', 'Votre réponse a été publiée !');
      setReplyText('');
    }
  };

  const handleReport = () => {
    Alert.alert(
      'Signaler le contenu',
      'Voulez-vous signaler ce contenu pour non-respect des règles ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Signaler', style: 'destructive', onPress: () => Alert.alert('Merci', 'Le contenu a été signalé aux modérateurs.') }
      ]
    );
  };

  const renderCategoryCard = (item) => (
    <TouchableOpacity key={item.id} onPress={() => setSelectedCategory(item)} style={styles.categoryCardWrapper}>
      <Card style={[styles.categoryCard, { borderLeftColor: item.color }]}>
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={[styles.categoryName, isDark && styles.textDark]}>{item.name}</Text>
          <Text style={[styles.categoryStats, isDark && styles.textSecondaryDark]}>
            {item.topics} sujets • {item.posts} posts
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
      </Card>
    </TouchableOpacity>
  );

  const renderTopicItem = (item) => (
    <TouchableOpacity key={item.id} onPress={() => setSelectedTopic(item)}>
      <Card style={styles.topicCard}>
        <View style={styles.topicHeader}>
          <View style={styles.topicAuthor}>
            <Avatar name={item.author} imageUrl={item.authorAvatar} size={32} />
            <View style={{ marginLeft: 8 }}>
              <Text style={[styles.authorName, isDark && styles.textDark]}>{item.author}</Text>
              <Text style={[styles.topicDate, isDark && styles.textSecondaryDark]}>{item.date}</Text>
            </View>
          </View>
          <Badge 
            text={item.solved ? 'Résolu' : 'Ouvert'} 
            variant={item.solved ? 'success' : 'warning'} 
          />
        </View>
        
        <Text style={[styles.topicTitle, isDark && styles.textDark]}>{item.title}</Text>
        
        <View style={styles.topicFooter}>
          <View style={styles.topicStats}>
            <Ionicons name="chatbubbles-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.statsText, isDark && styles.textSecondaryDark]}>{item.replies}</Text>
            <View style={{ width: 12 }} />
            <Ionicons name="eye-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.statsText, isDark && styles.textSecondaryDark]}>{item.views}</Text>
          </View>
          <Text style={[styles.lastReply, isDark && styles.textSecondaryDark]}>
            Dernier: {item.lastReply.author}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (selectedTopic) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedTopic(null)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={isDark ? colors.white : colors.black} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDark && styles.textDark]} numberOfLines={1}>
            {selectedTopic.title}
          </Text>
          <TouchableOpacity onPress={handleReport}>
            <Ionicons name="flag-outline" size={24} color={colors.danger} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Original Post */}
          <Card style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.topicAuthor}>
                <Avatar name={selectedTopic.author} imageUrl={selectedTopic.authorAvatar} size={40} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.authorName, isDark && styles.textDark]}>{selectedTopic.author}</Text>
                  <Text style={[styles.topicDate, isDark && styles.textSecondaryDark]}>
                    {selectedTopic.date} à {selectedTopic.time}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={[styles.postContent, isDark && styles.textDark]}>
              Bonjour, j'ai besoin d'aide pour comprendre ce sujet. Quelqu'un peut m'expliquer ?
              Merci d'avance !
            </Text>
          </Card>

          {/* Replies (Mock) */}
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Réponses</Text>
          
          <Card style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.topicAuthor}>
                <Avatar name="Prof. Koffi" size={40} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.authorName, isDark && styles.textDark]}>Prof. Koffi</Text>
                  <Text style={[styles.topicDate, isDark && styles.textSecondaryDark]}>Il y a 2h</Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleReport}>
                 <Ionicons name="flag-outline" size={20} color={colors.gray400} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.postContent, isDark && styles.textDark]}>
              C'est une excellente question. Voici quelques éléments de réponse...
            </Text>
          </Card>
        </ScrollView>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
          <View style={[styles.replyContainer, isDark && styles.replyContainerDark]}>
            <TextInput
              style={[styles.replyInput, isDark && styles.replyInputDark]}
              placeholder="Écrire une réponse..."
              placeholderTextColor={colors.gray400}
              value={replyText}
              onChangeText={setReplyText}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleReply}>
              <Ionicons name="send" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      <View style={styles.mainHeader}>
        <Text style={[styles.heading, isDark && styles.textDark]}>Forum</Text>
        <Button title="Nouveau Sujet" size="sm" onPress={() => {}} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.gray400} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, isDark && styles.searchInputDark]}
          placeholder="Rechercher un sujet..."
          placeholderTextColor={colors.gray400}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {!selectedCategory ? (
          <>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Catégories</Text>
            {forumCategories.map(renderCategoryCard)}
            
            <Text style={[styles.sectionTitle, isDark && styles.textDark, { marginTop: spacing.lg }]}>
              Sujets Récents
            </Text>
            {forumTopics.map(renderTopicItem)}
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.breadcrumb}>
              <Ionicons name="arrow-back" size={20} color={colors.primary} />
              <Text style={styles.breadcrumbText}>Retour aux catégories</Text>
            </TouchableOpacity>
            
            <Text style={[styles.categoryTitle, isDark && styles.textDark]}>{selectedCategory.name}</Text>
            {forumTopics
              .filter(t => t.category === selectedCategory.name)
              .map(renderTopicItem)}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  containerDark: {
    backgroundColor: colors.backgroundDark,
  },
  mainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  heading: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 48,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainerDark: {
    backgroundColor: colors.gray800,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  searchInputDark: {
    color: colors.textDark,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  categoryCardWrapper: {
    marginBottom: spacing.sm,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  categoryStats: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  topicCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  topicAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  topicDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  topicTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  topicStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  lastReply: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  breadcrumbText: {
    color: colors.primary,
    marginLeft: spacing.xs,
    fontWeight: typography.fontWeight.medium,
  },
  categoryTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  // Detail View Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.backgroundLight,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    flex: 1,
    marginHorizontal: spacing.md,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  postCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  postContent: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    lineHeight: 24,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  replyContainerDark: {
    backgroundColor: colors.gray800,
    borderTopColor: colors.gray700,
  },
  replyInput: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
    marginRight: spacing.sm,
    color: colors.text,
  },
  replyInputDark: {
    backgroundColor: colors.gray900,
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
  textDark: {
    color: colors.textDark,
  },
  textSecondaryDark: {
    color: colors.textSecondaryDark,
  },
});

export default Forum;
