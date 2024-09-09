import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTickets, calculateTotalCost } from '../redux/ticketSlice';
import { RootState } from '../redux/store';

import FastImage from 'react-native-fast-image';
import { getTickets } from '../services/api';
import { COLORS, CONTEXT } from '../constant/theme';

const BuyTicketsScreen: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const totalCost = useSelector((state: RootState) => state.tickets.totalCost);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedTickets = await getTickets(); 
        dispatch(setTickets(fetchedTickets));
      } catch (err) {
        setError(CONTEXT.errorFetchingTickets);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateTotalCost(selectedTickets));
  }, [selectedTickets, dispatch]);

  const toggleTicketSelection = (ticketId: string) => {
    if (selectedTickets.includes(ticketId)) {
      setSelectedTickets(selectedTickets.filter(id => id !== ticketId));
    } else {
      setSelectedTickets([...selectedTickets, ticketId]);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.blue} />
        <Text>{CONTEXT.loadingTicket}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>{CONTEXT.goBack}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>{CONTEXT.chooseRides}</Text>
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.ticketCard,
                selectedTickets.includes(item.id) ? styles.selectedCard : null,
              ]}
              onPress={() => toggleTicketSelection(item.id)}
            >
              <FastImage source={{uri:item.image}} style={styles.ticketImage} />
              <View style={styles.ticketInfo}>
                <Text style={styles.ticketName}>{item.name}</Text>
                <Text style={styles.ticketPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.totalPrice}>{selectedTickets.length} {CONTEXT.ridesAdded}</Text>
          <Text style={styles.totalText}>{CONTEXT.total}: ${totalCost.toFixed(2)}</Text>

          {/* Buttons Row */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>{CONTEXT.back}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.checkoutButton,
                selectedTickets.length === 0 ? styles.disabledButton : styles.enabledButton,
              ]}
              onPress={() => navigation.navigate('Payment')}
              disabled={selectedTickets.length === 0}
            >
              <Text style={styles.checkoutText}>{CONTEXT.checkout}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: COLORS.lightGray,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 20,
  },
  ticketCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  selectedCard: {
    borderColor: COLORS.blue,
  },
  ticketImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  ticketInfo: {
    flex: 1,
    marginLeft: 10,
    gap: 10,
  },
  ticketName: {
    fontSize: 18,
  },
  ticketPrice: {
    fontSize: 15,
    color: COLORS.red,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    alignSelf: 'flex-end',
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  totalText: {
    fontSize: 14,
    marginVertical: 10,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: COLORS.lightBlue,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.blue,
  },
  backButtonText: {
    fontSize: 18,
    color: COLORS.blue,
  },
  checkoutButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enabledButton: {
    backgroundColor: COLORS.blue,
  },
  disabledButton: {
    backgroundColor: COLORS.darkGray,
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: 18,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
  },
  retryButtonText: {
    color: COLORS.white,
  },
});

export default BuyTicketsScreen;
