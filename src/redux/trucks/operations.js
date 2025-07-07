import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CAMPERS_URL } from "../../constants/axios.js";
import {
  setPaginationData,
  setCurrentPage,
  markFiltersApplied,
} from "../filters/slice.js";

// Get all trucks (original operation)
const getTrucks = createAsyncThunk("trucks/getTrucks", async (_, thunkAPI) => {
  try {
    const getResponse = await axios.get(CAMPERS_URL, {
      headers: { "Content-Type": "application/json" },
    });

    const data = getResponse.data;
    // If the API returns paginated data { total, items: [] }
    if (data && Array.isArray(data.items)) {
      return data.items;
    }

    // Otherwise assume the response itself is an array
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.getResponse.data);
  }
});

// Helper function to filter trucks on client side
const filterTrucks = (trucks, filters) => {
  return trucks.filter((truck) => {
    // Location filter
    if (filters.location && filters.location.trim()) {
      const locationMatch = truck.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      if (!locationMatch) return false;
    }

    // Equipment filters
    if (filters.equipment && filters.equipment.length > 0) {
      for (const equipment of filters.equipment) {
        // Map equipment names to truck properties
        switch (equipment) {
          case "AC":
            if (!truck.AC) return false;
            break;
          case "automatic":
            if (truck.transmission !== "automatic") return false;
            break;
          case "kitchen":
            if (!truck.kitchen) return false;
            break;
          case "TV":
            if (!truck.TV) return false;
            break;
          case "bathroom":
            if (!truck.bathroom) return false;
            break;
          default:
            // For any other equipment, check if the truck has that property as true
            if (!truck[equipment]) return false;
        }
      }
    }

    // Vehicle type filters
    if (filters.vehicleTypes && filters.vehicleTypes.length > 0) {
      if (!filters.vehicleTypes.includes(truck.form)) return false;
    }

    return true;
  });
};

// Fetch trucks with filters and pagination (now with client-side filtering)
const fetchTrucksWithFilters = createAsyncThunk(
  "trucks/fetchTrucksWithFilters",
  async ({ filters, pagination }, thunkAPI) => {
    try {
      // Fetch ALL trucks from API (no filter parameters)
      const response = await axios.get(CAMPERS_URL, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;
      let allTrucks;

      // Extract trucks from API response
      if (data && Array.isArray(data.items)) {
        allTrucks = data.items;
      } else if (Array.isArray(data)) {
        allTrucks = data;
      } else {
        allTrucks = [];
      }

      // Apply client-side filtering
      const filteredTrucks = filterTrucks(allTrucks, filters);

      // Apply pagination to filtered results
      const startIndex = (pagination.currentPage - 1) * pagination.limit;
      const endIndex = startIndex + pagination.limit;
      const paginatedTrucks = filteredTrucks.slice(startIndex, endIndex);

      // Calculate pagination info
      const totalItems = filteredTrucks.length;
      const totalPages = Math.ceil(totalItems / pagination.limit);

      const result = {
        trucks: paginatedTrucks,
        totalItems,
        totalPages,
        currentPage: pagination.currentPage,
        allFilteredTrucks: filteredTrucks, // Store all filtered trucks for load more
      };

      // Update filters store pagination
      thunkAPI.dispatch(
        setPaginationData({
          totalPages: result.totalPages,
          totalItems: result.totalItems,
          currentPage: result.currentPage,
        })
      );

      // Mark filters as applied if this is a new search (page 1)
      if (pagination.currentPage === 1) {
        thunkAPI.dispatch(markFiltersApplied());
      }

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch trucks"
      );
    }
  }
);

// Reset and fetch first page with current filters (moved from filters)
const searchTrucksWithFilters = createAsyncThunk(
  "trucks/searchTrucksWithFilters",
  async (filters, thunkAPI) => {
    // Always start from page 1 when searching
    const pagination = { currentPage: 1, limit: 4 };

    return thunkAPI.dispatch(fetchTrucksWithFilters({ filters, pagination }));
  }
);

// Load more trucks (next page) (moved from filters)
const loadMoreTrucks = createAsyncThunk(
  "trucks/loadMoreTrucks",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const filters = state.filters.activeFilters;
    const pagination = state.filters.pagination;

    // Load next page
    const nextPage = pagination.currentPage + 1;

    // Update current page in filters store
    thunkAPI.dispatch(setCurrentPage(nextPage));

    return thunkAPI.dispatch(
      fetchTrucksWithFilters({
        filters,
        pagination: { ...pagination, currentPage: nextPage },
      })
    );
  }
);

export {
  getTrucks,
  fetchTrucksWithFilters,
  searchTrucksWithFilters,
  loadMoreTrucks,
};
