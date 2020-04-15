import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public create({ title, value, type }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  public getBalance(): Balance {
    function sumTransactions(total: number, transaction: Transaction): number {
      return total + transaction.value;
    }

    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce(sumTransactions, 0);

    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce(sumTransactions, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }
}

export default TransactionsRepository;
