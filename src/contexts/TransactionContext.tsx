import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}
interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data as Transaction[]);
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data;
    const response = await api.post("transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state] as Transaction[]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}
