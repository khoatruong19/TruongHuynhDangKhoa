import { useMutation } from "@tanstack/react-query";
import TokenService from "@/services/token";

export const SWAP_TOKEN_KEY = ["SWAP_TOKEN_KEY"];

export function useSwapToken() {
  return useMutation({
    mutationKey: SWAP_TOKEN_KEY,
    mutationFn: TokenService.swapToken,
  });
}
