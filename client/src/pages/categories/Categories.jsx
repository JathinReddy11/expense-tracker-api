import { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category.service";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [categoryName, setCategoryName] = useState("");
  const [addError, setAddError] = useState(null);
  const [adding, setAdding] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editError, setEditError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCategories = async () => {
    setError(null);
    setLoading(true);

    try {
      const categories_data = await getCategories();
      setCategories(categories_data.categories);
    } catch (err) {
      console.log(err);
      setError("Something went wrong while fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      return setAddError("Category name cannot be empty");
    }

    try {
      setAdding(true);
      await createCategory({ name: categoryName });
      fetchCategories();
      setCategoryName("");
    } catch (err) {
      console.log(err);
      setAddError("Something went wrong while adding category");
    } finally {
      setAdding(false);
    }
  };

  const handleEdit = (category_id, name) => {
    setEditId(category_id);
    setEditName(name);
  };

  const handleSave = async (category_id, name) => {
    if (!name.trim()) {
      return setEditError("Name cannot be empty");
    }
    setEditError(null);
    setUpdating(true);
    try {
      await updateCategory(category_id, { name });
      setEditName("");
      setEditId(null);
      fetchCategories();
    } catch (err) {
      console.log(err);
      setEditError("Something went wrong while updating category");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditError(null);
    setEditId(null);
    setEditName("");
  };

  const openDialog = (category_id) => {
    document.getElementById("myDialog").showModal();
    setDeleteId(category_id);
  };

  const closeDialog = () => {
    document.getElementById("myDialog").close();
    setDeleteId(null);
  };

  const handleDelete = async () => {
    setDeleteError(null);
    setDeleting(true);
    try {
      await deleteCategory(deleteId);
      setDeleteId(null);
      fetchCategories();
      document.getElementById("myDialog").close();
    } catch (err) {
      console.log(err);
      setDeleteError("Something went wrong, couldn't delete category");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <dialog id="myDialog">
        <p>Deleting category will delete its expenses too, Are you sure</p>
        <button type="button" onClick={handleDelete}>
          Delete Permanently
        </button>
        <button type="button" onClick={closeDialog}>
          Cancel
        </button>
      </dialog>

      <h1>Categories Page</h1>
      <form onSubmit={handleAdd}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <button type="submit" disabled={adding}>
          {adding ? "Adding..." : "Add Category"}
        </button>
      </form>

      {addError && <p>{addError}</p>}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        (categories.length === 0 ? (
          <p>No categories found...</p>
        ) : (
          <div>
            <ul>
              {categories.map((category) => {
                const dateOnly = new Date(
                  category.created_at,
                ).toLocaleDateString();

                return (
                  <li key={category.category_id}>
                    {dateOnly} -{" "}
                    {category.category_id === editId ? (
                      <div>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            handleSave(category.category_id, editName)
                          }
                          disabled={updating}
                        >
                          {updating ? "Saving...." : "Save"}
                        </button>

                        <button type="button" onClick={handleCancel}>
                          Cancel
                        </button>
                        {editError && <p>{editError}</p>}
                      </div>
                    ) : (
                      <>
                        {category.name}
                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(category.category_id, category.name)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => openDialog(category.category_id)}
                          disabled={deleting}
                        >
                          {deleting ? "Deleting..." : "Delete"}
                        </button>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
            {deleteError && <p>{deleteError}</p>}
          </div>
        ))}
    </div>
  );
}
