import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import { getPosts, createPost, updatePost, deletePost } from "../api/postApi.js";
import { logoutUser } from "../api/userApi.js";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const res = await getPosts();
      setPosts(res.data.posts);
    } catch {
      setError("Failed to load posts");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (editingId) {
        await updatePost(editingId, {
          name,
          description,
          age: Number(age),
        });
      } else {
        await createPost(name, description, Number(age));
      }

      setName("");
      setDescription("");
      setAge("");
      setEditingId(null);
      loadPosts();
    } catch {
      setError("Failed to save post");
    }
  }

  function handleEdit(post) {
    setEditingId(post._id);
    setName(post.name);
    setDescription(post.description);
    setAge(post.age);
  }

  async function handleDelete(id) {
    try {
      await deletePost(id);
      loadPosts();
    } catch {
      setError("Failed to delete post");
    }
  }

  async function handleLogout() {
    try {
      await logoutUser(user?.email);
    } catch {}
    logout();
    navigate("/login");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.username || user?.email}</p>
      <button onClick={handleLogout}>Logout</button>

      <hr />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>{editingId ? "Edit Post" : "Create Post"}</h2>

      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <br />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <br />
        <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
        <br />

        <button type="submit">{editingId ? "Update" : "Create"}</button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>Posts</h2>

      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <b>{post.name}</b>
          <p>{post.description}</p>
          <p>Age: {post.age}</p>

          <button onClick={() => handleEdit(post)}>Edit</button>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
