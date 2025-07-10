import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CAMPERS_URL } from '../../constants/axios.js';
import {
  setPaginationData,
  setCurrentPage,
  markFiltersApplied,
} from '../filters/slice.js';

const getTrucks = createAsyncThunk('trucks/getTrucks', async (_, thunkAPI) => {
  try {
    const getResponse = await axios.get(CAMPERS_URL, {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = getResponse.data;
    if (data && Array.isArray(data.items)) {
      return data.items;
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.getResponse.data);
  }
});

// Veri çekimi öncesi quary'leri ayarlamak için
const buildQueryParams = (filters, pagination) => {
  const params = new URLSearchParams();

  if (pagination?.currentPage) params.append('page', pagination.currentPage);
  if (pagination?.limit) params.append('limit', pagination.limit);

  if (filters.location?.trim()) {
    params.append('location', filters.location.trim());
  }

  if (filters.equipment?.length) {
    filters.equipment.forEach((equipment) => {
      switch (equipment) {
        case 'AC':
          params.append('AC', true);
          break;
        case 'automatic':
          params.append('transmission', 'automatic');
          break;
        case 'kitchen':
          params.append('kitchen', true);
          break;
        case 'TV':
          params.append('TV', true);
          break;
        case 'bathroom':
          params.append('bathroom', true);
          break;
        default:
          params.append(equipment, true);
      }
    });
  }

  if (filters.vehicleTypes?.length) {
    filters.vehicleTypes.forEach((type) => params.append('form', type));
  }

  return params.toString();
};
// ------------------------------------------------------------

const fetchTrucksWithFilters = createAsyncThunk(
  'trucks/fetchTrucksWithFilters',
  async ({ filters, pagination }, thunkAPI) => {
    try {
      const queryString = buildQueryParams(filters, pagination);
      const url = `${CAMPERS_URL}?${queryString}`;

      const response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      const trucksData = Array.isArray(response.data)
        ? response.data
        : response.data?.items || [];

      let totalItems = Number(response.headers['x-total-count']);

      if (!totalItems) {
        totalItems = Number(response.headers['X-Total-Count']);
      }

      if (!totalItems && typeof response.data?.total === 'number') {
        totalItems = response.data.total;
      }
      if (!totalItems) {
        totalItems =
          trucksData.length === pagination.limit
            ? (pagination.currentPage + 1) * pagination.limit
            : (pagination.currentPage - 1) * pagination.limit +
              trucksData.length;
      }

      const totalPages = Math.ceil(totalItems / pagination.limit);

      const result = {
        trucks: trucksData,
        totalItems,
        totalPages,
        currentPage: pagination.currentPage,
        allFilteredTrucks: [],
      };

      thunkAPI.dispatch(
        setPaginationData({
          totalPages: result.totalPages,
          totalItems: result.totalItems,
          currentPage: result.currentPage,
        }),
      );

      if (pagination.currentPage === 1) {
        thunkAPI.dispatch(markFiltersApplied());
      }

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch trucks',
      );
    }
  },
);

const searchTrucksWithFilters = createAsyncThunk(
  'trucks/searchTrucksWithFilters',
  async (filters, thunkAPI) => {
    const pagination = { currentPage: 1, limit: 4 };

    return thunkAPI.dispatch(fetchTrucksWithFilters({ filters, pagination }));
  },
);

const loadMoreTrucks = createAsyncThunk(
  'trucks/loadMoreTrucks',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const filters = state.filters.activeFilters;
    const pagination = state.filters.pagination;
    const nextPage = pagination.currentPage + 1;

    thunkAPI.dispatch(setCurrentPage(nextPage));

    return thunkAPI.dispatch(
      fetchTrucksWithFilters({
        filters,
        pagination: { ...pagination, currentPage: nextPage },
      }),
    );
  },
);

export {
  getTrucks,
  fetchTrucksWithFilters,
  searchTrucksWithFilters,
  loadMoreTrucks,
};
