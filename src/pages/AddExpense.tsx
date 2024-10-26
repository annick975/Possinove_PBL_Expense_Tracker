import React, { useState } from 'react';

const AddExpense: React.FC = () => {
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !category || !date || !description) {
            setError('All fields are required');
            return;
        }
        setError('');

        // Handle the form submission logic (e.g., send data to API)
        const newExpense = { amount, category, date, description };
        console.log('New Expense:', newExpense);

        // Reset the form
        setAmount('');
        setCategory('');
        setDate('');
        setDescription('');
    };

    return (
      <div className='bg-gradient-to-b from-black via-gray-900 to-green-800 min-h-screen text-white p-8t'>
        <div className="max-w-md mx-auto mt-64 p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter category"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter description"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
    );
};

export default AddExpense;
