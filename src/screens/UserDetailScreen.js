import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function UserDetailScreen({ route }) {
  const { user } = route.params;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.ticket}>
          <View style={styles.header}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}>@{user.username}</Text>
          </View>

          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CONTACT</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{user.phone}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Website</Text>
              <Text style={styles.value}>{user.website}</Text>
            </View>
          </View>

          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ADDRESS</Text>

            <Text style={styles.valueCenter}>
              {user.address.suite}, {user.address.street}
            </Text>
            <Text style={styles.subValueCenter}>
              {user.address.city} - {user.address.zipcode}
            </Text>

            <View style={styles.geoRow}>
              <View>
                <Text style={styles.geoLabel}>Latitude</Text>
                <Text style={styles.geoValue}>{user.address.geo.lat}</Text>
              </View>
              <View>
                <Text style={styles.geoLabel}>Longitude</Text>
                <Text style={styles.geoValue}>{user.address.geo.lng}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>COMPANY</Text>

            <Text style={styles.companyName}>{user.company.name}</Text>
            <Text style={styles.catchPhrase}>
              “{user.company.catchPhrase}”
            </Text>
            <Text style={styles.bsText}>{user.company.bs}</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    padding: 16,
  },

  scroll: {
    paddingBottom: 40,
  },

  ticket: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,

    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  header: {
    alignItems: 'center',
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  username: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },


  divider: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    marginVertical: 20,
  },


  section: {
    marginBottom: 4,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#2563EB',
    marginBottom: 12,
    textAlign: 'center',
  },

  row: {
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    color: '#6B7280',
  },

  value: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },

  valueCenter: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'center',
    fontWeight: '600',
  },

  subValueCenter: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },

  geoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 10,
  },

  geoLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  geoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },

  companyName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },

  catchPhrase: {
    fontSize: 14,
    color: '#2563EB',
    textAlign: 'center',
    marginTop: 8,
  },

  bsText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
  },
});
