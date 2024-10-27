import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Calendar,
  Tag,
  Edit2,
  Trash2,
  TrendingUp,
  Sparkles,
  Plus,
  Minus,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
};

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
const categories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Other",
];
const motivationalQuotes = [
  "Track your spending, unlock your savings!",
  "Small changes lead to big financial gains.",
  "Your financial future starts with today's choices.",
  "Every expense tracked is a step towards financial freedom.",
  "Budgeting: Because your dreams are worth more than impulse purchases.",
];

const ExpenseForm: React.FC<{
  expense: Expense | null;
  onSubmit: (expense: Expense) => void;
  onCancel: () => void;
}> = ({ expense, onSubmit, onCancel }) => {
  const [amount, setAmount] = useState(expense?.amount.toString() || "");
  const [category, setCategory] = useState(expense?.category || "");
  const [date, setDate] = useState(expense?.date || "");
  const [description, setDescription] = useState(expense?.description || "");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setDate(expense.date);
      setDescription(expense.description);
    }
  }, [expense]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!amount) errors.amount = "Amount is required";
    else if (parseFloat(amount) <= 0) errors.amount = "Amount must be positive";
    if (!category) errors.category = "Category is required";
    if (!date) errors.date = "Date is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit({
      id: expense?.id || "",
      amount: parseFloat(amount),
      category,
      date,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`pl-10 ${formErrors.amount ? "border-red-500" : ""}`}
              required
            />
          </div>
          {formErrors.amount && (
            <p className="text-red-500 text-sm">{formErrors.amount}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                className={`pl-10 ${
                  formErrors.category ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {formErrors.category && (
            <p className="text-red-500 text-sm">{formErrors.category}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`pl-10 ${formErrors.date ? "border-red-500" : ""}`}
              required
            />
          </div>
          {formErrors.date && (
            <p className="text-red-500 text-sm">{formErrors.date}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {expense ? "Update Expense" : "Add Expense"}
        </Button>
      </div>
    </form>
  );
};

const ExpenseItem: React.FC<{
  expense: Expense;
  handleEdit: (expense: Expense) => void;
  handleDelete: (id: string) => void;
}> = ({ expense, handleEdit, handleDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex justify-between items-center border-b py-4"
    >
      <div>
        <p className="font-semibold">
          {expense.description || expense.category}
        </p>
        <p className="text-sm text-muted-foreground">
          {expense.date} - ${expense.amount.toFixed(2)}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleEdit(expense)}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this expense? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => {}}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(expense.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

const ExpenseList: React.FC<{
  groupedExpenses: Record<string, Expense[]>;
  handleEdit: (expense: Expense) => void;
  handleDelete: (id: string) => void;
}> = ({ groupedExpenses, handleEdit, handleDelete }) => {
  return (
    <AnimatePresence>
      {Object.entries(groupedExpenses).map(([group, expenses]) => (
        <motion.div
          key={group}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-lg font-semibold mt-4 mb-2">{group}</h3>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

const ExpenseSummary: React.FC<{
  totalExpenses: number;
  motivationalQuote: string;
}> = ({ totalExpenses, motivationalQuote }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
        <CardDescription>Sum of all expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          <p className="text-4xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex items-center justify-center text-primary">
          <Sparkles className="mr-2" />
          <p className="italic">{motivationalQuote}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const PieChartComponent: React.FC<{
  chartData: { name: string; value: number }[];
}> = ({ chartData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const BarChartComponent: React.FC<{
  chartData: { month: string; amount: number }[];
}> = ({ chartData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [groupBy, setGroupBy] = useState("category");
  const [motivationalQuote, setMotivationalQuote] = useState("");

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    setMotivationalQuote(
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddOrUpdateExpense = (expense: Expense) => {
    if (editingExpense) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) =>
          exp.id === expense.id ? { ...exp, ...expense } : exp
        )
      );
      setEditingExpense(null);
    } else {
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        { ...expense, id: Date.now().toString() },
      ]);
    }
    setIsFormOpen(false);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
  };

  const handleCancel = () => {
    setEditingExpense(null);
    setIsFormOpen(false);
  };

  const filteredExpenses =
    filter === "all"
      ? expenses
      : expenses.filter((exp) => exp.category === filter);

  const groupedExpenses = filteredExpenses.reduce<Record<string, Expense[]>>(
    (acc, expense) => {
      const key = groupBy === "category" ? expense.category : expense.date;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(expense);
      return acc;
    },
    {}
  );

  const totalExpenses = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  const expensesByCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(expensesByCategory).map(
    ([name, value]) => ({ name, value })
  );

  const expensesByMonth = expenses.reduce((acc, exp) => {
    const month = new Date(exp.date).toLocaleString("default", {
      month: "long",
    });
    acc[month] = (acc[month] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.entries(expensesByMonth).map(
    ([month, amount]) => ({ month, amount })
  );

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold mb-2 text-center">Expense Tracker</h1>
      <p className="text-center text-muted-foreground">
        Keep your finances in check
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="space-y-2 w-full md:w-auto">
          <Label htmlFor="filter">Filter by Category</Label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 w-full md:w-auto">
          <Label htmlFor="groupBy">Group by</Label>
          <Select value={groupBy} onValueChange={setGroupBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Group by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="w-full md:w-auto"
        >
          {isFormOpen ? (
            <Minus className="mr-2 h-4 w-4" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {isFormOpen ? "Close Form" : "Add Expense"}
        </Button>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isFormOpen ? "auto" : 0,
          opacity: isFormOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {editingExpense ? "Edit Expense" : "Add New Expense"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseForm
              expense={editingExpense}
              onSubmit={handleAddOrUpdateExpense}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <ExpenseSummary
          totalExpenses={totalExpenses}
          motivationalQuote={motivationalQuote}
        />
        <PieChartComponent chartData={pieChartData} />
      </div>

      <BarChartComponent chartData={barChartData} />

      <Card>
        <CardHeader>
          <CardTitle>Expense List</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseList
            groupedExpenses={groupedExpenses}
            handleEdit={handleEditExpense}
            handleDelete={handleDeleteExpense}
          />
        </CardContent>
      </Card>
    </div>
  );
}
