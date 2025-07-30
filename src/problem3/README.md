#### Overall Issues

1. ReactJS with TypeScript Issues
   - Type Safety Problems:
     any type usage: getPriority = (blockchain: any)
     Missing interface properties: WalletBalance thiếu blockchain property
     Inconsistent types: FormattedWalletBalance vs WalletBalance trong mapping
     Undefined BoxProps: Interface không được import/define
   - Type Errors:
     lhsPriority undefined: Variable không tồn tại trong scope
     Missing return type: Sort function thiếu return cho equal case
     Type mismatch: sortedBalances.map với FormattedWalletBalance
2. Functional Components Issues
   - Component Structure:
     Missing imports: Không import React, useMemo, hooks
     Undefined components: WalletRow, classes không được define
     Missing props destructuring: children được destructure nhưng không dùng
     Poor component organization: Logic phức tạp trong component
   - Component Logic:
     Inline complex logic: Filter và sort logic trong component
     Magic numbers: Hard-coded priority values
     Poor separation of concerns: Business logic mixed với UI logic
3. React Hooks Issues
   - useMemo Problems:
     Unnecessary dependencies: prices trong dependency array nhưng không dùng
     Complex logic in useMemo: Filter và sort logic quá phức tạp
     Missing memoization: formattedBalances không được memoize
   - Hook Usage:
     Undefined hooks: useWalletBalances(), usePrices() không được define
     Missing error handling: Không handle loading states
     Poor performance: Re-computation không cần thiết

### Step 1: Fix TypeScript Issues

# resolve

- Define proper interfaces
- Remove any types
- Fix undefined variables
- Add missing properties

# step fix

1.1 Fix WalletBalance Interface: add missing property
1.2 extends FormattedWalletBalance from WalletBalance just need add formatted propety
1.3 Define Props Interface added className property
1.4 Fix getPriority Function Type: Define Props Interface added some properties may we use in the future
1.5: WalletBalance Interface: add missing blockchain property
1.6: Define BoxProps interface
1.7: replace any by string in getPriority
1.8: Import React to use React.ReactNode

### Step 2: Fix Functional Components

# resolve

- Add proper imports
- Create missing components
- Organize component structure
- Extract utility functions

# step fix

2.1 Fix Undefined Variable lhsPriority: replace lhsPriority by balancePriority
2.2 Fix Inverted Filter Logic
2.3 Fix Sort Function Missing Return, return 0 add the bottom
2.4 Fix Undefined classes: add xxx.module.css with below content

```css
.walletRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.walletRow:hover {
  background: #e9ecef;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

2.5 import css module file just created

### Step 3: Fix React Hooks & Performance Issues

# resolve

- Fix useMemo dependencies
- Add proper memoization
- Create custom hooks
- Optimize performance

# step fix

3.1 Fix useMemo Dependencies, remove prices
3.2 Add Memoization cho formattedBalances
3.3 Fix Rows Mapping: Memoize with dependencies
3.4 replace index by unique key(balance.currency)
3.5 add prices and sortedBalances in dependency array
3.6 Create Custom Hooks(useWalletBalances, usePrices) with below code:

```js
const useWalletBalances = (): WalletBalance[] => {
  // Mock data
  return [
    { currency: "ETH", amount: 2.5, blockchain: "Ethereum" },
    { currency: "USDC", amount: 1000, blockchain: "Ethereum" },
    { currency: "OSMO", amount: 50, blockchain: "Osmosis" },
    { currency: "ARB", amount: 100, blockchain: "Arbitrum" },
  ];
};

const usePrices = (): Record<string, number> => {
  // Mock data
  return {
    ETH: 1645.93,
    USDC: 1.0,
    OSMO: 0.38,
    ARB: 1.2,
  };
};
```

3.7 Extract Utility Functions, move to outside of component

### Step 4: Final Touches

4.1 Create WalletRow Component

```js
const WalletRow: React.FC<{
  amount: number,
  usdValue: number,
  formattedAmount: string,
  currency: string,
  blockchain: string,
}> = ({ usdValue, formattedAmount, currency, blockchain }) => {
  return (
    <div className={classes.row}>
      <div className={classes.walletInfo}>
        <div className={classes.currencyÌno}>
          <span className={classes.currency}>{currency}</span>
          <span className={classes.blockchain}>({blockchain})</span>
        </div>
        <div className={classes.amountInfo}>
          <span className={classes.amount}>{formattedAmount}</span>
          <span className={classes.usdValue}>${usdValue.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
```

4.2 Add Error Handling & Loading States
4.3 Add CSS for Styling

```css
.loading {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 1.1rem;
}

.error {
  text-align: center;
  padding: 40px;
  color: #dc3545;
  font-size: 1.1rem;
}

.walletInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.currencyInfo {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.currency {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
}

.blockchain {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}

.amountInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.amount {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.usdValue {
  font-size: 0.9rem;
  color: #28a745;
  font-weight: 600;
}
```

4.4 remove index in line sortedBalances.map(.... we dont use it anymore
