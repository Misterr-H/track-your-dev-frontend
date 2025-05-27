import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinWaitListApi } from "./apis/joinWaitListApi";
import { toast } from "sonner";


type WaitlistResponse = {
  success: boolean;
  message: string;
  data: {
    email: string;
    _id: string;
    joinedAt: string;
    __v: number;
  };
};

export const useJoinWaitList = () => {
  const queryClient = useQueryClient();
  
  return useMutation<WaitlistResponse, Error, string>({
    mutationFn: joinWaitListApi,
    onSuccess: () => {
      toast.success("Successfully joined the waitlist");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to join the waitlist");
    },
  });
};