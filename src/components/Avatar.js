import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, typography, borderRadius } from '../theme';

const Avatar = ({ 
  name, 
  imageUrl, 
  size = 48, 
  backgroundColor = colors.primary,
  style 
}) => {
  const getInitials = () => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const avatarSize = { width: size, height: size, borderRadius: size / 2 };
  const fontSize = size / 2.5;

  return (
    <View style={[styles.avatar, avatarSize, { backgroundColor }, style]}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={[styles.image, avatarSize]} />
      ) : (
        <Text style={[styles.initials, { fontSize }]}>{getInitials()}</Text>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    color: colors.surface,
    fontWeight: typography.fontWeight.bold,
  },
});
