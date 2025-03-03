import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAPI } from "../services/api";
import { User, UserRole } from "shared/User";

const USERS_QUERY_KEY = "users";
const getUsers = async () => {
  const api = await getAPI();
  const res = await api.get("/users");
  return res.data;
};

const deleteUserRequest = async (userName: string) => {
  const api = await getAPI();
  const res = await api.delete(`/users/${userName}`);
  return res.data;
};

export const createUser = async (user) => {
  const api = await getAPI();
  const res = await api.post("/users", user);
  return res.data;
};

const updateUserRoleRequest = async ({ userName, role }: { userName: string; role: UserRole | null }) => {
  const api = await getAPI();
  await api.put(`/users/${userName}/role`, { userRole: role });
  return;
};

function useAddUser() {
  const queryClient = useQueryClient();
  const { mutate: addUser, isPending: isAdding } = useMutation({
    mutationFn: createUser,
    onMutate: async (user) => {
      await queryClient.cancelQueries({ queryKey: [USERS_QUERY_KEY] });
      const previousUsers = queryClient.getQueryData([USERS_QUERY_KEY]);
      queryClient.setQueryData([USERS_QUERY_KEY], (old: User[]) => [...old, user]);
      return { previousUsers };
    },
    onError: (err, user, context) => {
      queryClient.setQueryData([USERS_QUERY_KEY], context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
  return { addUser, isAdding };
}

function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: deleteUserRequest,
    onMutate: async (userId: string) => {
      await queryClient.cancelQueries({ queryKey: [USERS_QUERY_KEY] });
      const previousUsers = queryClient.getQueryData([USERS_QUERY_KEY]);
      queryClient.setQueryData([USERS_QUERY_KEY], (old: User[]) => old.filter((user) => user.userId !== userId));
      return { previousUsers };
    },
    onError: (err, userId, context) => {
      queryClient.setQueryData([USERS_QUERY_KEY], context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
  return { deleteUser, isDeleting };
}

function useEditUserRole() {
  const queryClient = useQueryClient();
  const { mutate: updateUserRole, isPending: isUpdatingRole } = useMutation({
    mutationFn: updateUserRoleRequest,
    onMutate: async ({ userName, role }) => {
      await queryClient.cancelQueries({ queryKey: [USERS_QUERY_KEY] });
      const previousUsers = queryClient.getQueryData([USERS_QUERY_KEY]);
      queryClient.setQueryData([USERS_QUERY_KEY], (old: User[]) =>
        old.map((user) => {
          if (user.userId === userName) {
            return { ...user, groups: [role] };
          }
          return user;
        }),
      );
      return { previousUsers };
    },
    onError: (err, userId, context) => {
      queryClient.setQueryData([USERS_QUERY_KEY], context?.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
  return { updateUserRole, isUpdatingRole };
}

function useUsers() {
  const { isLoading, data, error, refetch } = useQuery({ queryKey: [USERS_QUERY_KEY], queryFn: () => getUsers() });
  const { deleteUser, isDeleting } = useDeleteUser();
  const { updateUserRole, isUpdatingRole } = useEditUserRole();
  const { addUser, isAdding } = useAddUser();
  return { isLoading, data: data, error, refetch, deleteUser, isDeleting, updateUserRole, isUpdatingRole, addUser, isAdding };
}

export default useUsers;
