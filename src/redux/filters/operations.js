import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CAMPERS_URL } from "../../constants/axios.js";

// Fetch trucks with filters and pagination
export const fetchTrucksWithFilters = createAsyncThunk(
  "trucks/fetchTrucksWithFilters",
  async ({ filters, pagination }, thunkAPI) => {
    try {
      // Build query parameters for mockapi.io
      const params = new URLSearchParams();

      // Pagination parameters
      params.append("page", pagination.currentPage.toString());
      params.append("limit", pagination.limit.toString());

      // Location filter
      if (filters.location && filters.location.trim()) {
        params.append("location", filters.location);
      }

      // Equipment filters - mockapi.io can filter by individual fields
      if (filters.equipment && filters.equipment.length > 0) {
        filters.equipment.forEach((equipment) => {
          // Assuming equipment values are like "AC", "kitchen", "TV", etc.
          params.append(equipment, "true");
        });
      }

      // Vehicle type filter
      if (filters.vehicleType && filters.vehicleType.trim()) {
        params.append("form", filters.vehicleType);
      }

      const response = await axios.get(`${CAMPERS_URL}?${params.toString()}`, {
        headers: { "Content-Type": "application/json" },
      });

      // MockAPI usually returns data in different formats
      // Check if it's paginated response or just array
      const data = response.data;

      // If mockapi.io returns paginated data (with total count)
      if (data.items && data.total) {
        return {
          trucks: data.items,
          totalItems: data.total,
          totalPages: Math.ceil(data.total / pagination.limit),
          currentPage: pagination.currentPage,
        };
      }

      // If mockapi.io returns just array (simple pagination)
      if (Array.isArray(data)) {
        return {
          trucks: data,
          totalItems: data.length,
          totalPages: Math.ceil(data.length / pagination.limit),
          currentPage: pagination.currentPage,
        };
      }

      // Fallback
      return {
        trucks: data,
        totalItems: data.length || 0,
        totalPages: 1,
        currentPage: 1,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch trucks"
      );
    }
  }
);

// Helper function to build filter parameters
export const buildFilterParams = (filters) => {
  const params = {};

  if (filters.location && filters.location.trim()) {
    params.location = filters.location;
  }

  if (filters.equipment && filters.equipment.length > 0) {
    filters.equipment.forEach((equipment) => {
      params[equipment] = true;
    });
  }

  if (filters.vehicleType && filters.vehicleType.trim()) {
    params.form = filters.vehicleType;
  }

  return params;
};

// Reset and fetch first page with current filters
export const searchTrucksWithFilters = createAsyncThunk(
  "trucks/searchTrucksWithFilters",
  async (filters, thunkAPI) => {
    // Always start from page 1 when searching
    const pagination = { currentPage: 1, limit: 4 };

    return thunkAPI.dispatch(fetchTrucksWithFilters({ filters, pagination }));
  }
);

// Load more trucks (next page)
export const loadMoreTrucks = createAsyncThunk(
  "trucks/loadMoreTrucks",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const filters = state.filters.activeFilters;
    const pagination = state.filters.pagination;

    // Load next page
    const nextPage = pagination.currentPage + 1;

    return thunkAPI.dispatch(
      fetchTrucksWithFilters({
        filters,
        pagination: { ...pagination, currentPage: nextPage },
      })
    );
  }
);
