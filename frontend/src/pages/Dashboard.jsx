import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../api/postApi.js";
import { logoutUser } from "../api/userApi.js";
import { StyledWrapper } from "../components/StyledWrapper.jsx";

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
    <StyledWrapper>
      <div className="dashboard">
        <div className="dash-header">
          <div>
            <div className="dash-title">DASHBOARD</div>
            <div style={{ color: "rgba(255,255,255,0.6)" }}>
              Welcome, {user?.username || user?.email}
            </div>
          </div>

          <button className="small-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>

        <div className="dash-grid">
          {/* LEFT */}
          <div className="tile tile-pad">
            <div className="section-title">
              {editingId ? "EDIT POST" : "CREATE POST"}
            </div>

            <form onSubmit={handleSubmit} className="form-group">
              <input
                className="input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="input"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <button className="btn" type="submit">
                {editingId ? "UPDATE" : "CREATE"}
              </button>
            </form>
          </div>

          {/* RIGHT */}
          <div className="tile">
            <div className="tile-pad">
              <div className="section-title">POSTS</div>
            </div>

            {posts.map((post) => (
              <div key={post._id} className="post-card">
                <div className="post-name">{post.name}</div>
                <div className="post-meta">{post.description}</div>
                <div className="post-meta">Age: {post.age}</div>

                <div className="action-row">
                  <button
                    className="small-btn"
                    onClick={() => handleEdit(post)}
                  >
                    EDIT
                  </button>
                  <button
                    className="small-btn"
                    onClick={() => handleDelete(post._id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}
