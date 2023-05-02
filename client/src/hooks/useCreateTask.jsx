import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { customFetch } from "../utils";

export const useCreateTask = () => {
  // Clientzugriff
  const queryClient = useQueryClient();

  // Mutationen
  const { mutate: createTask, isLoading: createTaskLoading } = useMutation({
    mutationFn: (taskTitle) =>
      customFetch.post("/", {
        title: taskTitle,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task added");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, createTaskLoading };
};
