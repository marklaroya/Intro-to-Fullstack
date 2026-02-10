import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import { logoutUser } from "../api/userApi.js";
import { createPost, getPosts, updatePost, deletePost } from "../api/postApi.js";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // UI states
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [form, setForm] = useState({ name: "", description: "", age: "" });
  const [editingId, setEditingId] = useState(null);

  const loadPosts = async () => {
    setLoadingPosts(true);
    setError("");
    try {
      const res = await getPosts();
      setPosts(res.data?.posts ?? []);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load posts. Check backend/CORS/URL.");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({ name: "", description: "", age: "" });
    setEditingId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        age: Number(form.age),
      };

      if (!payload.name || !payload.description || Number.isNaN(payload.age)) {
        setError("Please fill out all fields correctly.");
        return;
      }

      if (editingId) {
        await updatePost(editingId, payload);
      } else {
        await createPost(form.name, form.description, form.age);
      }

      resetForm();
      await loadPosts();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (post) => {
    setEditingId(post._id);
    setForm({
      name: post.name ?? "",
      description: post.description ?? "",
      age: post.age ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    const ok = confirm("Delete this post?");
    if (!ok) return;

    setError("");
    try {
      await deletePost(id);
      await loadPosts();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to delete post.");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(user?.email);
    } catch {
      // even if backend logout fails, we logout locally
    }
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p style={{ marginTop: 6 }}>Welcome, <b>{user?.username || user?.email}</b></p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <hr />

      {/* Status */}
      {error && (
        <div style={{ background: "#ffe5e5", padding: 10, borderRadius: 8, marginBottom: 12 }}>
          <b>Error:</b> {error}
        </div>
      )}

      {/* Form */}
      <section style={{ marginBottom: 16 }}>
        <h2 style={{ marginBottom: 8 }}>{editingId ? "Edit Post" : "Create Post"}</h2>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={onChange}
            required
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={onChange}
            required
          />

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update" : "Create"}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm} disabled={saving}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <hr />

      {/* Posts */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ marginBottom: 8 }}>Posts</h2>
          <button onClick={loadPosts} disabled={loadingPosts}>
            {loadingPosts ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div>{p.description}</div>
                  <small>Age: {p.age}</small>
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "start" }}>
                  <button onClick={() => startEdit(p)}>Edit</button>
                  <button onClick={() => onDelete(p._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
