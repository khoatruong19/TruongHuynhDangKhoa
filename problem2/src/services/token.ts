import { Token } from "@/schemas/token";

const TOKENS_URL = "https://interview.switcheo.com/prices.json";

const getTokens = (): Promise<Token[]> => {
  return new Promise((resolve) => {
    fetch(TOKENS_URL)
      .then((response) => response.json())
      .then((data: Token[]) => {
        const filteredData: Record<string, Token> = {};
        data.forEach((item) => {
          filteredData[item.currency] = item;
        });

        resolve(Object.values(filteredData));
      });
  });
};

const getTokenSrc = (token: string) => {
  const mapppingToken = {
    STEVMOS: "stEVMOS",
    RATOM: "rATOM",
    STOSMO: "stOSMO",
    STATOM: "stATOM",
    STLUNA: "stLUNA",
  };

  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${
    mapppingToken[token as keyof typeof mapppingToken] ?? token
  }.svg`;
};

const swapToken = ({
  priceFrom,
  priceTo,
  amount,
}: {
  priceFrom: number;
  priceTo: number;
  amount: number;
}): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const exchangeRate = priceTo / priceFrom;
      resolve(amount * exchangeRate);
    }, 2000);
  });
};

export default { getTokens, getTokenSrc, swapToken };
