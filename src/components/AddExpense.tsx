import React, { useState } from "react";

const AddExpense: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!amount || !category || !date || !description) {
      setError("All fields are required!");
      return;
    }

    // Clear the error if form is valid
    setError("");

    // Here, you would typically send the data to your backend or store it locally
    const newExpense = {
      amount: parseFloat(amount),
      category,
      date,
      description,
    };

    console.log("Expense Added:", newExpense);

    // Reset the form fields
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Add New Expense
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block mb-2 font-medium">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-purple-500 outline-none text-black"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block mb-2 font-medium">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:border-purple-500 outline-none"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Drinks">Drinks</option>
              <option value="Education">Education</option>
              <option value="Transport">Transport</option>
              <option value="Health">Health</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block mb-2 font-medium">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-purple-500 outline-none text-black"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-2 font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-purple-500 outline-none text-black"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 text-white rounded-md font-semibold hover:bg-purple-600 transition duration-300"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
