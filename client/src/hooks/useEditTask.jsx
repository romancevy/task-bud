import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../utils";

export const useEditTask = () => {
  // Clientzugriff
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { editTask };
};
