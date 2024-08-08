import { useQuery } from "@tanstack/react-query";
import TokenService from "@/services/token";

export type UseGetTokensArgs = {
  allowFetch?: boolean;
};

export const GET_TOKENS_KEY = ["GET_TOKENS_KEY"];

export function useGetTokens(args: UseGetTokensArgs) {
  return useQuery({
    queryKey: GET_TOKENS_KEY,
    queryFn: TokenService.getTokens,
    enabled: args.allowFetch,
  });
}
