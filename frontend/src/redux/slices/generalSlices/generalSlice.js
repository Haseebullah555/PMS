// slices/userSlice.js
import {toast} from 'react-toastify'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInterceptor from '../../axios/axiosInterceptor'

function themeSetting() {
  const prefersDarkMode =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const localTheme = localStorage.getItem('kt_theme_mode_value')
  if (localTheme == 'system') {
    return prefersDarkMode ? 'dark' : 'light'
  } else {
    return localStorage.getItem('kt_theme_mode_value')
  }
}

const initialState = {
  // localLang: localStorage.getItem("lang") ? localStorage.getItem("lang") : "da",
  localLang: localStorage.getItem('lang')
    ? localStorage.getItem('lang')
    : localStorage.setItem('lang', 'da'),

  provinces: null,
  districts: null,
  department_generals: null,
  genders: null,
  years: null,
  months: null,
  theme: themeSetting(),
  employee_first_type: null,
  employee_second_type: null,
  document_type: null,
  executive_department: null,
  all: null,
  document_status: null,
  document_packages: null,
  sessoin_type: null,
  ranks : null,
}

export const getProvinces = createAsyncThunk(
  'get/provinces',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}provinces`);
      const res = await axiosInterceptor.get(`provinces`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getDistricts = createAsyncThunk(
  'get/districts',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}districts`);
      const res = await axiosInterceptor.get('districts')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_department_generals = createAsyncThunk(
  'get/department-generals',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}department-general`);
      const res = await axiosInterceptor.get('get-departments')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const get_ranks = createAsyncThunk(
  'get-ranks',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}department-general`);
      const res = await axiosInterceptor.get('get-ranks')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_genders = createAsyncThunk(
  'get/genders',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}genders`);
      const res = await axiosInterceptor.get('genders')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_all_generals = createAsyncThunk(
  'get-all-generals',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}genders`);
      const res = await axiosInterceptor.get('get-all-generals')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_documents_type = createAsyncThunk(
  'get-documents-type',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}provinces`);
      const res = await axiosInterceptor.get(`get-documents-type`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const get_doc_statuses = createAsyncThunk(
  'get-doc-statuses',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}provinces`);
      const res = await axiosInterceptor.get(`get-doc-statuses`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const get_doc_packages = createAsyncThunk(
  'get-doc-packages',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}provinces`);
      const res = await axiosInterceptor.get(`get-doc-packages`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const get_session_type = createAsyncThunk(
  'get-session-types',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}provinces`);
      const res = await axiosInterceptor.get(`get-session-types`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const get_executive_department = createAsyncThunk(
  'get-sending-and-executing-departments',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      // const res = await axios.get(`${apiUrl}provinces`);
      const res = await axiosInterceptor.get(`get-sending-and-executing-departments`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
 
const generalSlice = createSlice({
  name: 'generalSlice',
  initialState,
  reducers: {
    changeLang: (state, action) => {
      localStorage.setItem('lang', action.payload)
      state.localLang = action.payload
    },
    setTheme: (state) => {
      state.theme = themeSetting()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProvinces.fulfilled, (state, action) => {
      state.provinces = action.payload
    })
    builder.addCase(getProvinces.rejected, (state, action) => {})

    builder.addCase(getDistricts.fulfilled, (state, action) => {
      state.districts = action.payload
    })

    builder.addCase(getDistricts.rejected, (state, action) => {
      toast.error('Error')
    })

    builder.addCase(get_department_generals.fulfilled, (state, action) => {
      state.department_generals = action.payload
    })

    builder.addCase(get_department_generals.rejected, (state, action) => {
      toast.error('Error')
    })

    builder.addCase(get_ranks.fulfilled, (state, action) => {
      state.ranks = action.payload
    })

    builder.addCase(get_ranks.rejected, (state, action) => {
      toast.error('Error')
    })
    builder.addCase(get_genders.fulfilled, (state, action) => {
      state.genders = action.payload
    })

    builder.addCase(get_genders.rejected, (state, action) => {
      toast.error('Error')
    })

    builder.addCase(get_all_generals.fulfilled, (state, action) => {
      state.all = action.payload
    })
    builder.addCase(get_all_generals.rejected, (state, action) => {})
    builder.addCase(get_documents_type.fulfilled, (state, action) => {
      state.document_type = action.payload
    })
    builder.addCase(get_documents_type.rejected, (state, action) => {})

    builder.addCase(get_doc_statuses.fulfilled, (state, action) => {
      state.document_status = action.payload
    })
    builder.addCase(get_doc_statuses.rejected, (state, action) => {})

    builder.addCase(get_doc_packages.fulfilled, (state, action) => {
      state.document_packages = action.payload
    })
    builder.addCase(get_doc_packages.rejected, (state, action) => {})

    builder.addCase(get_session_type.fulfilled, (state, action) => {
      state.sessoin_type = action.payload
    })
    builder.addCase(get_session_type.rejected, (state, action) => {})

    builder.addCase(get_executive_department.fulfilled, (state, action) => {
      state.executive_department = action.payload
    })
    builder.addCase(get_executive_department.rejected, (state, action) => {})
  },
})
export const {changeLang, setTheme} = generalSlice.actions
const generalReducer = generalSlice.reducer
export default generalReducer
