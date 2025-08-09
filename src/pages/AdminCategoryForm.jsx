import React, { useEffect, useState } from "react";

import api from "../api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const AdminCategoryForm = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
    if (id) {
      api.get(`/categories/${id}`).then((res) => {
        setName(res.data.name);
        setParent(res.data.parent?._id || "");
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/categories/${id}`, { name, parent });
        toast.success("Category updated!");
      } else {
        await api.post("/categories", { name, parent });
        toast.success("Category created!");
      }
      navigate("/admin/categories");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-8"
    >
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit" : "Add"} Category
      </h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full mb-2 px-3 py-2 border rounded"
      />
      <select
        value={parent}
        onChange={(e) => setParent(e.target.value)}
        className="w-full mb-2 px-3 py-2 border rounded"
      >
        <option value="">No Parent</option>
        {categories
          .filter((cat) => !id || cat._id !== id)
          .map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
      </select>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default AdminCategoryForm;
