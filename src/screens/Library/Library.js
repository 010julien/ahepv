import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { libraryBooks, filterBooks } from '../../data/libraryBooks';
import { Badge, Card } from '../../components';
import { colors, typography, spacing, borderRadius, useThemeColors } from '../../theme';

const Library = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = useThemeColors();
  const userContext = useUser();
  const userProfile = userContext?.userProfile;
  const [selectedTab, setSelectedTab] = useState('free'); // free, premium, borrow
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'free', label: 'Gratuits', icon: 'gift-outline', count: libraryBooks.free.length },
    { id: 'premium', label: 'Premium', icon: 'star-outline', count: libraryBooks.premium.length },
    { id: 'borrow', label: 'Emprunts', icon: 'time-outline', count: libraryBooks.borrow.length },
  ];

  // Get filtered books based on tab and search
  const filteredBooks = useMemo(() => {
    const books = libraryBooks[selectedTab];
    return filterBooks(books, {
      search: searchQuery,
      level: userProfile?.level,
    });
  }, [selectedTab, searchQuery, userProfile]);

  const handleDownload = (book) => {
    // TODO: Implement download logic
    console.log('Download book:', book.title);
  };

  const handleBorrow = (book) => {
    // TODO: Implement borrow logic
    console.log('Borrow book:', book.title);
  };

  const handlePurchase = (book) => {
    // TODO: Implement purchase logic
    console.log('Purchase book:', book.title);
  };

  const renderBookCard = (book) => {
    const isFree = book.type === 'free';
    const isPremium = book.type === 'premium';
    const isBorrow = book.type === 'borrow';

    return (
      <Card key={book.id} style={styles.bookCard}>
        <TouchableOpacity style={styles.bookCardInner}>
          <Image source={{ uri: book.cover }} style={styles.bookCover} resizeMode="cover" />
          
          <View style={styles.bookInfo}>
            <View style={styles.bookHeader}>
              <Badge text={book.grade} color={colors.primary} size="sm" />
              {isPremium && (
                <View style={[styles.premiumBadge, { backgroundColor: colors.warning + '20' }]}>
                  <Ionicons name="star" size={12} color={colors.warning} />
                  <Text style={[styles.premiumText, { color: colors.warning }]}>Premium</Text>
                </View>
              )}
              {isBorrow && book.availableCopies > 0 && (
                <View style={[styles.availableBadge, { backgroundColor: colors.success + '20' }]}>
                  <Text style={[styles.availableText, { color: colors.success }]}>
                    {book.availableCopies} dispo
                  </Text>
                </View>
              )}
            </View>

            <Text style={[styles.bookTitle, { color: themeColors.text }]} numberOfLines={2}>
              {book.title}
            </Text>

            <Text style={[styles.bookAuthor, { color: themeColors.textSecondary }]} numberOfLines={1}>
              {book.author}
            </Text>

            {isPremium && (
              <View style={styles.ratingRow}>
                <View style={styles.rating}>
                  <Ionicons name="star" size={14} color={colors.warning} />
                  <Text style={[styles.ratingText, { color: themeColors.text }]}>
                    {book.rating}
                  </Text>
                  <Text style={[styles.reviewsText, { color: themeColors.textSecondary }]}>
                    ({book.reviews})
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.bookMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="document-text-outline" size={14} color={themeColors.textSecondary} />
                <Text style={[styles.metaText, { color: themeColors.textSecondary }]}>
                  {book.pages} pages
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="book-outline" size={14} color={themeColors.textSecondary} />
                <Text style={[styles.metaText, { color: themeColors.textSecondary }]}>
                  {book.subject}
                </Text>
              </View>
            </View>

            <View style={styles.bookActions}>
              {isFree && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.success }]}
                  onPress={() => handleDownload(book)}
                >
                  <Ionicons name="download-outline" size={18} color={colors.white} />
                  <Text style={styles.actionButtonText}>Télécharger</Text>
                </TouchableOpacity>
              )}

              {isPremium && (
                <TouchableOpacity
                  style={[styles.actionButton, {backgroundColor: colors.warning }]}
                  onPress={() => handlePurchase(book)}
                >
                  <Ionicons name="cart-outline" size={18} color={colors.white} />
                  <Text style={styles.actionButtonText}>{book.price} {book.currency}</Text>
                </TouchableOpacity>
              )}

              {isBorrow && (
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: book.availableCopies > 0 ? colors.info : colors.gray400,
                    },
                  ]}
                  onPress={() => book.availableCopies > 0 && handleBorrow(book)}
                  disabled={book.availableCopies === 0}
                >
                  <Ionicons name="time-outline" size={18} color={colors.white} />
                  <Text style={styles.actionButtonText}>
                    {book.availableCopies > 0 ? `Emprunter ${book.borrowDuration}j` : 'Indisponible'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Bibliothèque
        </Text>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: themeColors.card }]}>
          <Ionicons name="bookmark-outline" size={24} color={themeColors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: themeColors.card }]}>
        <Ionicons name="search-outline" size={20} color={themeColors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: themeColors.text }]}
          placeholder="Rechercher un livre..."
          placeholderTextColor={themeColors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={themeColors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              selectedTab === tab.id && [styles.tabActive, { backgroundColor: colors.primary }],
            ]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={selectedTab === tab.id ? colors.white : themeColors.textSecondary}
            />
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab.id ? colors.white : themeColors.textSecondary },
              ]}
            >
              {tab.label}
            </Text>
            <View
              style={[
                styles.tabBadge,
                {
                  backgroundColor: selectedTab === tab.id ? colors.white + '30' : themeColors.card,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabBadgeText,
                  { color: selectedTab === tab.id ? colors.white : themeColors.textSecondary },
                ]}
              >
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Books List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map(renderBookCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color={themeColors.textSecondary} />
            <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
              Aucun livre trouvé
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
  },
  iconButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.md,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  tabActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  tabBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  tabBadgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  bookCard: {
    marginBottom: spacing.md,
  },
  bookCardInner: {
    flexDirection: 'row',
  },
  bookCover: {
    width: 100,
    height: 140,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  bookInfo: {
    flex: 1,
  },
  bookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  premiumText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  availableBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  availableText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  bookTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  bookAuthor: {
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    marginBottom: spacing.xs,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  reviewsText: {
    fontSize: typography.fontSize.xs,
  },
  bookMeta: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.fontSize.xs,
  },
  bookActions: {
    marginTop: spacing.xs,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  actionButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    marginTop: spacing.md,
  },
});
