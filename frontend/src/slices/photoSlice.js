import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import photoService from '../services/photoService';

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async (photo, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.publishPhoto(photo, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
)

export const getUserPhotos = createAsyncThunk(
    "photo/userphotos",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getUserPhotos(id, token)

        return data
    }
)

export const deletePhoto = createAsyncThunk(
    "photo/deletephoto",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.deletePhoto(id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
)

export const updatePhoto = createAsyncThunk(
    "photo/updatephoto",
    async (photoData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.updatePhoto({ title: photoData.title }, photoData.id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
)

export const getPhotoById = createAsyncThunk(
    "photo/getphoto",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getPhotoById(id, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

export const likeAnPhoto = createAsyncThunk(
    "photo/like",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.likeAnPhoto(id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
)

export const commentAnPhoto = createAsyncThunk(
    "photo/comment",
    async (photoData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.commentAnPhoto({ comment: photoData.comment }, photoData.id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
)

export const getAllPhotos = createAsyncThunk(
    'photo/getallphotos',
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getAllPhotos(token)

        return data;
    }
)

export const searchPhotos = createAsyncThunk(
    "photo/search",
    async (query, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.searchPhotos(query, token);

        return data;
    }
);

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(publishPhoto.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(publishPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
                state.photos.unshift(state.photo);
                state.message = "Foto publicada com sucesso!"
            }).addCase(publishPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(getUserPhotos.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(getUserPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            }).addCase(deletePhoto.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(deletePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = state.photos.filter(photo => {
                    return photo._id !== action.payload.id
                });
                state.message = action.payload.message
            }).addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(updatePhoto.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(updatePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos.map(photo => {
                    if (photo._id === action.payload.photo._id) {
                        return photo.title = action.payload.photo.title
                    }
                    return photo;
                })
                state.message = action.payload.message
            }).addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(getPhotoById.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(getPhotoById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;
            }).addCase(getPhotoById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(likeAnPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                if (state.photo.likes) {
                    state.photo.likes.push({ id: action.payload.userId, name: action.payload.name })
                }

                state.photos.map(photo => {
                    if (photo._id === action.payload.photoId) {
                        return photo.likes.push({id: action.payload.userId, name: action.payload.name})
                    }
                    return photo;
                })
                state.message = action.payload.message;
            }).addCase(likeAnPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(getAllPhotos.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(getAllPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            }).addCase(commentAnPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo.comments.push(action.payload.comment);
                state.message = action.payload.message;
            }).addCase(commentAnPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            }).addCase(searchPhotos.pending, (state) => {
                state.loading = true;
                state.error = false
            }).addCase(searchPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            })
    }
});


export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;