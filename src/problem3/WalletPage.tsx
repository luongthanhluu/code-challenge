import React, { useMemo } from "react";
import classes from './WalletPage.module.css'; // 2.5 import css module file just created

interface WalletBalance {
    currency: string;
    amount: number;
    balances?: string; // 1.1 add missing property
    blockchain: string; // 1.5.1 add missing blockchain property
}

//1.2 extends FormattedWalletBalance from WalletBalance just need add formatted propety
interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

//1.3 Define BoxProps Interface
interface BoxProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
}

//1.4 Define Props Interface added some properties may we use in the future
interface Props extends BoxProps {
    onWalletClick?: (balance: FormattedWalletBalance) => void;
    showUSDValue?: boolean;
    maxItems?: number;
}

// 3.6 Create Custom Hooks(useWalletBalances, usePrices) with below code:
const useWalletBalances = (): WalletBalance[] => {
    // Mock data
    return [
        { currency: "ETH", amount: 2.5, blockchain: "Ethereum" },
        { currency: "USDC", amount: 1000, blockchain: "Ethereum" },
        { currency: "OSMO", amount: 50, blockchain: "Osmosis" },
        { currency: "ARB", amount: 100, blockchain: "Arbitrum" },
    ];
};
// 3.6 Create Custom Hooks(useWalletBalances, usePrices) with below code:
const usePrices = (): Record<string, number> => {
    // Mock data
    return {
        ETH: 1645.93,
        USDC: 1.0,
        OSMO: 0.38,
        ARB: 1.2,
    };
};

// 3.7 Extract Utility Functions, move to outside of component
const getPriority = (blockchain: string): number => {
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


const WalletRow: React.FC<{
    amount: number;
    usdValue: number;
    formattedAmount: string;
    currency: string;
    blockchain: string;
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

export const WalletPage: React.FC<Props> = (props: Props) => {
    const { ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (balancePriority > -99) { // 2.1 replace lhsPriority by balancePriority
                if (balance.amount > 0) { // 2.2 replace <= 0 by > 0
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
            return 0; // 2.3 add missing return 0
        });
    }, [balances]); // 3.1 remove prices in dependency array

    const formattedBalances = useMemo(() => {
        return sortedBalances.map((balance: WalletBalance) => ({
            ...balance,
            formatted: balance.amount.toFixed()
        }));
    }, [sortedBalances]); // 3.2 add memoization for formattedBalances


    const rows = useMemo(() => { // 3.3 Memoize with dependencies
        return formattedBalances.map((balance: FormattedWalletBalance) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    key={balance.currency} // 3.4 replace index by unique key
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                    currency={balance.currency}
                    blockchain={balance.blockchain}
                />
            )
        })
    }, [prices, formattedBalances]) // 3.5 add prices and formattedBalances in dependency array


    // 4.2 Add loading state
    if (!balances.length || Object.keys(prices).length === 0) {
        return (
            <div {...rest}>
                <div className="loading">Loading wallet data...</div>
            </div>
        );
    }
    // 4.2 Add error handling
    if (!balances || !prices) {
        return (
            <div {...rest}>
                <div className="error">Failed to load wallet data</div>
            </div>
        );
    }


    return (
        <div {...rest}>
            {rows}
        </div>
    )
}