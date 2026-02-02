import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function UserCard({ user, onPress }) {
    const { name, username, email, phone, website, company, address } = user;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <View style={styles.card}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.username}>{username}</Text>

                <View style={styles.section}>
                    <Text style={styles.label}> Email</Text>
                    <Text style={styles.value}>{email}</Text>

                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.value}>{phone}</Text>

                    <Text style={styles.label}> Website</Text>
                    <Text style={styles.value}>{website}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Company</Text>
                    <Text style={styles.value}>{company?.name}</Text>
                    <Text style={styles.subValue}>{company?.catchPhrase}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}> Address</Text>
                    <Text style={styles.value}>
                        {address?.suite}, {address?.street}
                    </Text>
                    <Text style={styles.subValue}>
                        {address?.city} - {address?.zipcode}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default UserCard
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,

        elevation: 4,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    username: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 10,
    },
    section: {
        marginTop: 8,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginTop: 4,
    },
    value: {
        fontSize: 14,
        color: '#111827',
    },
    subValue: {
        fontSize: 13,
        color: '#6B7280',
    },
});
