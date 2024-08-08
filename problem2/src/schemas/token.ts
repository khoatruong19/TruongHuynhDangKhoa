export type Token = {
  currency: string;
  price: number;
  date: string;
};

export type TokenWithAmount = Token & {
  amount: number;
};

export type NullableToken = Token | null;
