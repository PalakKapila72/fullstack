import React, { useState } from "react";
import "./App.css";
 
const initialJobs = [
  { id: 1, title: "Frontend Developer", location: "Remote", exp: 2 },
  { id: 2, title: "UI/UX Designer", location: "New York", exp: 3 },
  { id: 3, title: "Backend Engineer", location: "San Francisco", exp: 4 },
];
 
function JobCard({ job, onApply, onDelete }) {
  return (
    <article className={`job-card ${job.applied ? "applied" : ""}`}>
      <div className="job-card-inner">
        <div className="job-tag">Featured</div>
        <h4 className="job-title">{job.title}</h4>
        <p className="job-meta">
          <span className="job-location">📍 {job.location}</span>
          <span className="job-exp">🎓 {job.exp}+ yrs</span>
        </p>
        <div className="job-actions">
          <button
            className={`apply-btn ${job.applied ? "applied" : ""}`}
            onClick={() => onApply(job.id)}
            disabled={job.applied}
          >
            {job.applied ? "Applied ✅" : "Apply Now"}
          </button>
          <button className="delete-btn" onClick={() => onDelete(job.id)}>
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
 
function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [form, setForm] = useState({ title: "", location: "", exp: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.exp.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    const newJob = {
      id: Date.now(),
      title: form.title.trim(),
      location: form.location.trim(),
      exp: form.exp.trim(),
      applied: false,
    };
    setJobs([...jobs, newJob]);
    setForm({ title: "", location: "", exp: "" });
    setError("");
    setSuccessMsg("Job posted successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };
 
  const handleApply = (id) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, applied: true } : j)));
  };
 
  const handleDelete = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };
 
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-mark">J</span>
            <span className="logo-text">JobBoard</span>
          </div>
          <div className="job-count-badge">
            <span>{jobs.length}</span> open positions
          </div>
        </div>
      </header>
 
      <main className="main">
        {/* Post a Job Form */}
        <section className="form-section">
          <div className="section-label">— Post a Job</div>
          <h2 className="section-title">List a New Role</h2>
          <form className="job-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  id="jobTitle"
                  name="title"
                  type="text"
                  placeholder="e.g. Senior React Developer"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="jobLocation">Location</label>
                <input
                  id="jobLocation"
                  name="location"
                  type="text"
                  placeholder="e.g. Remote / Mumbai"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="jobExp">Min. Experience (yrs)</label>
                <input
                  id="jobExp"
                  name="exp"
                  type="number"
                  min="0"
                  placeholder="e.g. 3"
                  value={form.exp}
                  onChange={handleChange}
                />
              </div>
            </div>
            {error && <p className="error-msg">⚠ {error}</p>}
            {successMsg && <p className="success-msg">✓ {successMsg}</p>}
            <button type="submit" className="submit-btn">
              Post Job →
            </button>
          </form>
        </section>
 
        {/* Featured Jobs */}
        <section className="jobs-section">
          <div className="jobs-header">
            <div>
              <div className="section-label">— Browse Openings</div>
              <h2 className="section-title">Featured Jobs</h2>
            </div>
            <span className="total-count">{jobs.length} total</span>
          </div>
 
          {jobs.length === 0 ? (
            <div className="empty-state">
              <p>No jobs listed yet. Post the first one!</p>
            </div>
          ) : (
            <div className="jobs-grid" id="featured-jobs">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>
 
      <footer className="footer">
        <p>Built with React · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
 
export default App;
