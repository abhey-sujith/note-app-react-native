import { createAction,createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createNote,getNotes,editNote,deleteNotes } from './noteAPI';

const initialState = {
  notes:[],
  current_page:0,
  last_page:0,
  status: 'idle',
}

export const createNoteAsync = createAsyncThunk(
  'note/create',
  async (noteDetails,{ rejectWithValue }) => {
    try {
      console.log('inside createAsyncThunk');
      const response = await createNote(noteDetails);
      console.log("createnote",response);
      if (response.message==="The given data was invalid."){
        return rejectWithValue(response.errors)
      }
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);

export const editNoteAsync = createAsyncThunk(
  'note/edit',
  async (noteDetails,{ rejectWithValue }) => {
    try {
      console.log('inside createAsyncThunk');
      const response = await editNote(noteDetails);
      console.log("editnote----",response);
      if (response.message==="The given data was invalid."){
        return rejectWithValue(response.errors)
      }
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);

export const getNotesAsync = createAsyncThunk(
  'note/getnotes',
  async ({token,pagenumber}) => {
    try {
      console.log('inside createAsyncThunk----------pagenumber--',pagenumber);
      const response = await getNotes(token,pagenumber);
      console.log("getNotes",response);
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);

export const deleteNoteAsync = createAsyncThunk(
  'note/deletenote',
  async ({token,id}) => {
    try {
      console.log('inside createAsyncThunk----------id--',id);
      const response = await deleteNotes(token,id);
      console.log("deleteNotes",response);
      return response
    } catch (err) {
      return rejectWithValue(err)
    }
  }
);

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    emptythenotesdataarray: (state) => {
      state.notes=[]

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNoteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNoteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log("----------------------------fulfilled",action.payload); 
      }).addCase(createNoteAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log("----------------------------rejected",action.payload); 
      })  
      .addCase(editNoteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editNoteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log("----------------------------fulfilled",action.payload); 
      }).addCase(editNoteAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log("----------------------------rejected",action.payload); 
      })  
      .addCase(getNotesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNotesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.notes=[...state.notes,...action.payload.data]
        state.current_page=action.payload.current_page
        state.last_page=action.payload.last_page
        console.log("----------------------------fulfilled",action.payload); 
      }).addCase(getNotesAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log("----------------------------rejected",action.payload); 
      }) ;
  },
})

// Action creators are generated for each case reducer function
export const {emptythenotesdataarray } = noteSlice.actions

export default noteSlice.reducer