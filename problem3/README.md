# Messy React

## Issues
These are some issues emphasized below:
+ Redundant type ***FormattedWalletBalance*** as it's fields is duplicated with *** WalletBalance*** and is unnecessary.
+ ***getPriority*** should be place outside component as it doesn't have anything to do with React
+ Not clear and inefficient functions, types, interfaces, variables naming
+ Complicated nested if conditions in sorting and filtering array
+ Using index as component key for array manipulation
+ Using undefined variable ***balance.blockchain***, magic number ***-99***
+ Unused prop ***children***, duplicate component props inference
+ Redundant type declaration in sorting, filtering, mapping as it's already inferred.
+ Do not have fallback values for balances and prices usages

## Original Code
```ts
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
```

## Refactored Code
```ts
// constant for currency priorities, we can put this constant in a separate file, (ex: constants/currency.ts)
const CURRENCY_PRIORITIES = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

// constant for currency priorities default value, we can put this constant in a separate file, (ex: constants/currency.ts)
const CURRENCY_PRIORITIES_DEFAULT = -99

// type for currency key, we can put this type in a separate file, (ex: schemas/currency.ts)
type CurrencyPrioritiesKey = keyof typeof CURRENCY_PRIORITIES;

// helper function to check if key is valid, we can put this func in a separate file, (ex: utils/currency.ts)
const checkIsCurrencyPrioritiesKey = (key: string) : key is CurrencyPrioritiesKey => Object.keys(CURRENCY_PRIORITIES).includes(key); 

// function to get currency priority, we can put this func in a separate file, (ex: utils/currency.ts)
const getCurrencyPriority = (key: string) => {
    if (checkIsCurrencyPrioritiesKey(key)) return CURRENCY_PRIORITIES[key]
    return CURRENCY_PRIORITIES_DEFAULT
}

// we can put this interface in a separate file, (ex: schemas/wallet.ts)
interface WalletBalance {
  currency: string;
  amount: number;
}

// type for currency prices, we can put this interface in a separate file, (ex: schemas/currency.ts)
type CurrencyPrice = Record<string, number>;

// rename component props to be more specific
interface WalletPageProps extends BoxProps {} //assume BoxProps return apporiate props for div tag

const WalletPage = (props: WalletPageProps) => {
  const balances = useWalletBalances(); // assume that useWalletBalances return type WalletBalance[]
  const prices = usePrices(); //  // assume that usePrices return type CurrencyPrice

  // -> use ?? operator to avoid falsy value
  // -> filter balance whose priority is greater than CURRENCY_PRIORITIES_DEFAULT & amount greater than 0
  // -> remove type declaration for current, next variables in sort func because of type inference
  // -> sort balances by their currency priority
  // -> remove prices dependency as it's redundant
  const sortedBalances = useMemo(() => {
    return (balances ?? [])
             .filter((balance: WalletBalance) => getCurrencyPriority(balance.currency) > CURRENCY_PRIORITIES_DEFAULT && balance.amount > 0)
             .sort((current, next) => getCurrencyPriority(current.currency) - getCurrencyPriority(next.currency))
    });
  }, [balances]);

  return (
    <div {...props}>
      {/* -> map sortedBalances to render WalletRow inside template because component's size is small*/}
      {sortedBalances?.map((balance) => {
        // -> calculate additional values for props passing to WalletRow
        // -> use ? to avoid falsy value
        // -> use ?? operator to have fallback value if currency is not exist in prices
        const usdValue = (prices?.[balance.currency] ?? 0) * balance.amount;
        const formattedAmount = balance.amount.toFixed();
        return (
          // WalletRow should be memorized for better performance.
          <WalletRow
            // -> Avoid using index for component key as the array elements are changed due to sorting or filtering 
            key={balance.currency}
            className={classes.row} // assume classes.row is exist
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={formattedAmount}
          />
        );
      })}
    </div>
  )
}
```
