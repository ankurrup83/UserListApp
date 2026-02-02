import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PostItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.ticket}>
                <View style={styles.header}>
                    <View style={styles.idBadge}>
                        <Text style={styles.idText}># {item.id}</Text>
                    </View>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.punchHoleLeft} />
                    <View style={styles.dashedLine} />
                    <View style={styles.punchHoleRight} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={2}>
                        {item.title}
                    </Text>
                    <Text style={styles.body} numberOfLines={3}>
                        {item.body}
                    </Text>

                    <View style={styles.footer}>
                        <Text style={styles.moreText}>View Comments →</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    ticket: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        padding: 16,
        backgroundColor: '#FAFBFC',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    idBadge: {
        backgroundColor: '#6366F1',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    idText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        backgroundColor: '#FFFFFF',
    },
    punchHoleLeft: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        marginLeft: -10,
    },
    punchHoleRight: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        marginRight: -10,
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginHorizontal: 10,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 8,
        textTransform: 'capitalize',
    },
    body: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
    },
    footer: {
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 10,
    },
    moreText: {
        color: '#6366F1',
        fontWeight: '600',
        fontSize: 13,
    }
});

export default React.memo(PostItem);
