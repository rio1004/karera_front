import { create } from "zustand";
import { UserService } from "@/api/services/userApi.service";
import type { User, UserState } from "../types/auth/UserTypes";
import { useAuthStore } from "../auth/useAuth";
import type { Role } from "@/constant/roles";
import type { GetMethodBaseQueryParams } from "@/types/api.types";
import { PasswordServices } from "@/api/services/passwordApi.service";

export const useUserStore = create<
  UserState & {
    selectedUser: User | null;
    setSelectedUser: (user: User | null) => void;

    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;

    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;

    newType: Role | "";
    setNewType: (type: Role | "") => void;

    isCurrentlyFetching: boolean;
    totalRows: number;

    activeFilters: GetMethodBaseQueryParams;
    setActiveFilters: (filters: GetMethodBaseQueryParams) => void;

    fetchUsers: (params?: GetMethodBaseQueryParams) => Promise<void>;
    fetchUsersWithPagination: (params?: GetMethodBaseQueryParams) => Promise<{
      users: User[];
      totalRows: number;
      limit: number;
      offset: number;
    }>;

    updateUser: (id: string, type: Role) => Promise<User>;
    confirmPassword: (
      otp: string,
      newPassword: string,
      confirmNewPassword: string,
      userName: string
    ) => Promise<any>;

    resetPassword: (
      userNameOrEmail: string
    ) => Promise<any>;
  }
>((set, get) => ({
  users: [],
  usersData: [],
  isLoading: false,
  isCurrentlyFetching: false,
  total: 0,
  totalRows: 0,
  limit: 10,
  offset: 0,
  typeFilter: "",

  userCurrentPage: 1,
  userRowsPerPage: 10,

  activeFilters: {},

  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),

  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  isDialogOpen: false,
  setIsDialogOpen: (open) => set({ isDialogOpen: open }),

  newType: "",
  setNewType: (type) => set({ newType: type }),

  setUsersData: (data) => set({ usersData: data }),

  setUserCurrentPage: (page) => {
    const { userRowsPerPage, isCurrentlyFetching, activeFilters } = get();
    if (isCurrentlyFetching) return;

    const limit = userRowsPerPage;
    const offset = (page - 1) * limit;
    set({ userCurrentPage: page, offset });
    get().fetchUsers({
      ...activeFilters,
      limit,
      offset,
    });
  },

  setUserRowsPerPage: (rows) => {
    const { isCurrentlyFetching, activeFilters } = get();
    if (isCurrentlyFetching) return;

    set({
      userRowsPerPage: rows,
      limit: rows,
      userCurrentPage: 1,
      offset: 0,
    });
    get().fetchUsers({
      ...activeFilters,
      limit: rows,
      offset: 0,
    });
  },

  setActiveFilters: (filters) => {
    set({
      activeFilters: filters,
      userCurrentPage: 1,
      offset: 0,
    });
    get().fetchUsers({
      ...filters,
      limit: get().userRowsPerPage,
      offset: 0,
    });
  },

  fetchUsers: async (params: GetMethodBaseQueryParams = {}) => {
    const { isCurrentlyFetching, limit, offset, typeFilter, activeFilters } =
      get();
    if (isCurrentlyFetching) return;

    set({ isLoading: true, isCurrentlyFetching: true });

    try {
      const mergedParams: GetMethodBaseQueryParams = {
        limit,
        offset,
        ...activeFilters,
        ...params, // incoming params override
      };

      const { users, totalRows: apiTotalRows } = await UserService.getUsers(
        mergedParams
      );

      const filteredUsers = typeFilter
        ? users.filter((user: { type: string }) => user.type === typeFilter)
        : users;

      const totalCount = apiTotalRows || filteredUsers.length;

      set({
        users: filteredUsers,
        usersData: filteredUsers,
        total: totalCount,
        totalRows: totalCount,
        limit: mergedParams.limit!,
        offset: mergedParams.offset!,
      });
    } catch (err) {
      console.error("[User Store] Fetch failed", err);
      set({
        users: [],
        usersData: [],
        total: 0,
        totalRows: 0,
      });
    } finally {
      set({ isLoading: false, isCurrentlyFetching: false });
    }
  },

  fetchUsersWithPagination: async (
    params: GetMethodBaseQueryParams = {}
  ): Promise<{
    users: User[];
    totalRows: number;
    limit: number;
    offset: number;
  }> => {
    const { isCurrentlyFetching, limit, offset, typeFilter, activeFilters } =
      get();
    if (isCurrentlyFetching) {
      return { users: [], totalRows: 0, limit, offset };
    }

    set({ isLoading: true, isCurrentlyFetching: true });

    try {
      const mergedParams: GetMethodBaseQueryParams = {
        limit,
        offset,
        ...activeFilters,
        ...params,
      };

      const response = await UserService.getUsers(mergedParams);

      const filteredUsers = typeFilter
        ? response.users.filter(
            (user: { type: string }) => user.type === typeFilter
          )
        : response.users;

      const totalCount = response.totalRows || filteredUsers.length;

      set({
        usersData: filteredUsers,
        total: totalCount,
        totalRows: totalCount,
        limit: mergedParams.limit!,
        offset: mergedParams.offset!,
      });

      return {
        users: filteredUsers,
        totalRows: totalCount,
        limit: mergedParams.limit!,
        offset: mergedParams.offset!,
      };
    } catch (err) {
      console.error("[User Store] Fetch with pagination failed", err);
      set({
        usersData: [],
        total: 0,
        totalRows: 0,
      });

      return {
        users: [],
        totalRows: 0,
        limit,
        offset,
      };
    } finally {
      set({ isLoading: false, isCurrentlyFetching: false });
    }
  },

  setTypeFilter: (type) => {
    const { isCurrentlyFetching, activeFilters } = get();
    if (isCurrentlyFetching) return;

    set({ typeFilter: type, offset: 0, userCurrentPage: 1 });
    get().fetchUsers({
      ...activeFilters,
      limit: get().userRowsPerPage,
      offset: 0,
    });
  },

  setPage: (page) => {
    const { isCurrentlyFetching, limit, activeFilters } = get();
    if (isCurrentlyFetching) return;

    const offset = (page - 1) * limit;
    set({ offset, userCurrentPage: page });
    get().fetchUsers({
      ...activeFilters,
      limit,
      offset,
    });
  },

  updateUser: async (id: string, type: Role): Promise<User> => {
    const { currentUser } = get();
    if (currentUser?.type !== "admin") {
      throw new Error("Permission denied");
    }

    try {
      set({ isLoading: true });
      const { user } = await UserService.updateUser(id, type);
      await get().fetchUsers();
      return user;
    } catch (err) {
      console.error("[User Store] Update failed", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  confirmPassword: async (otp, newPassword, confirmNewPassword, userName) => {
    try {
      set({ isLoading: true });
      const res = await PasswordServices.confirmResetPassword(
        newPassword,
        confirmNewPassword,
        otp,
        userName
      );
      return res;
    } catch (err) {
      console.error("[User Store] Confirm password failed", err);
    } finally {
      set({ isLoading: false });
    }
  },
  resetPassword: async (userNameOrEmail: string) => {
    try {
      set({ isLoading: true });
      const res = await PasswordServices.ResetPassword(userNameOrEmail);
      return res;
    } catch (err) {
      console.error("[User Store] Confirm password failed", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));

// 🔄 Sync with Auth Store
useAuthStore.subscribe((state) => {
  if (state.user) {
    useUserStore.getState().setCurrentUser(state.user);
  }
});
