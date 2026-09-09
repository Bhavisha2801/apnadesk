import { Customer } from "@/src/types/customer";
import { Note } from "@/src/types/note";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoteState {
  items: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  items: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,

  reducers: {
    setNotes(
      state,
      action: PayloadAction<Note[]>
    ) {
      state.items = action.payload;
    },

    addNote(
      state,
      action: PayloadAction<Note>
    ) {
      state.items.unshift(action.payload);
    },

    updateNote(
      state,
      action: PayloadAction<Note>
    ) {
      const index = state.items.findIndex(
        note => note.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    removeNote(
      state,
      action: PayloadAction<string>
    ) {
      state.items = state.items.filter(
        note => note.id !== action.payload
      );
    },

    setLoading(
      state,
      action: PayloadAction<boolean>
    ) {
      state.loading = action.payload;
    },

    setError(
      state,
      action: PayloadAction<string | null>
    ) {
      state.error = action.payload;
    },
  },
});

export const {
  setNotes,
  addNote,
  updateNote,
  removeNote,
  setLoading,
  setError,
} = noteSlice.actions;

export default noteSlice.reducer;