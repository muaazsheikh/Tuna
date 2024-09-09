import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ticket {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface TicketState {
  tickets: Ticket[];
  totalCost: number;
}

const initialState: TicketState = {
  tickets: [],
  totalCost: 0,
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
    calculateTotalCost: (state, action: PayloadAction<string[]>) => {
      const selectedTicketIds = action.payload;
      const selectedTickets = state.tickets.filter(ticket => selectedTicketIds.includes(ticket.id));

      // Log for debugging to check if selected tickets are calculated correctly
      console.log("Selected tickets: ", selectedTickets);

      // Ensure totalCost is being updated
      state.totalCost = selectedTickets.reduce((sum, ticket) => sum + ticket.price, 0);
    },
  },
});

export const { setTickets, calculateTotalCost } = ticketSlice.actions;
export default ticketSlice.reducer;
