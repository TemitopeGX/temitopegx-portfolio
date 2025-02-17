import { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faEdit,
  faStar,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Image from "next/image";
import { withAuth } from "@/components/withAuth";
import LogoutButton from "@/components/LogoutButton";
import AdminNav from "@/components/AdminNav";

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  challenge?: string;
  solution?: string;
  image: string;
  tags: string[];
  link?: string;
  featured: boolean;
}

const ProjectsAdmin = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    challenge: "",
    solution: "",
    image: "",
    tags: "",
    link: "",
    featured: false,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<"url" | "file">("url");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/projects");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }

      setProjects(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      toast.error("Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  const transformImageUrl = (url: string) => {
    if (url.includes("unsplash.com/photos/")) {
      const photoId = url.split("/").pop();
      return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80`;
    }
    return url;
  };

  const handleAddProject = async () => {
    setIsSubmitting(true);
    try {
      const projectData = {
        ...formData,
        image: transformImageUrl(formData.image),
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error("Failed to add project");

      await fetchProjects();
      toast.success("Project added successfully");
      clearForm();
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to add project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;
    setIsSubmitting(true);
    try {
      const projectData = {
        ...formData,
        id: editingProject._id,
        image: transformImageUrl(formData.image),
      };

      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error("Failed to update project");

      await fetchProjects();
      toast.success("Project updated successfully");
      clearForm();
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      toast.error("Failed to update project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      await fetchProjects();
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const clearForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      challenge: "",
      solution: "",
      image: "",
      tags: "",
      link: "",
      featured: false,
    });
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData({ ...formData, image: data.url });
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <AdminNav />
      <LogoutButton />
      <div className="min-h-screen bg-dark">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">
              Manage <span className="text-neon-green">Projects</span>
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="neon-button inline-flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Project
            </button>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-neon-green text-2xl animate-spin"
              />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center py-12">
              {error}
              <button
                onClick={fetchProjects}
                className="ml-4 text-neon-green hover:text-neon-green/80"
              >
                Try again
              </button>
            </div>
          )}

          {showForm && (
            <div className="fixed inset-0 bg-dark/80 flex items-center justify-center p-4 z-50">
              <div className="bg-dark-200 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-neon-green/10">
                <h2 className="text-2xl font-bold mb-6">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="minimalist-input"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="minimalist-input"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="minimalist-input h-24"
                  />
                  <textarea
                    placeholder="Challenge"
                    value={formData.challenge}
                    onChange={(e) =>
                      setFormData({ ...formData, challenge: e.target.value })
                    }
                    className="minimalist-input h-24"
                  />
                  <textarea
                    placeholder="Solution"
                    value={formData.solution}
                    onChange={(e) =>
                      setFormData({ ...formData, solution: e.target.value })
                    }
                    className="minimalist-input h-24"
                  />
                  <div className="flex gap-4 mb-2">
                    <button
                      type="button"
                      onClick={() => setUploadType("url")}
                      className={`px-4 py-2 rounded-lg ${
                        uploadType === "url"
                          ? "bg-neon-green text-dark"
                          : "bg-dark-300 text-gray-400"
                      }`}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadType("file")}
                      className={`px-4 py-2 rounded-lg ${
                        uploadType === "file"
                          ? "bg-neon-green text-dark"
                          : "bg-dark-300 text-gray-400"
                      }`}
                    >
                      Upload File
                    </button>
                  </div>

                  {uploadType === "url" ? (
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="minimalist-input"
                    />
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(file);
                          }
                        }}
                        className="hidden"
                      />
                      <div className="flex gap-4 items-center">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="neon-button-outline"
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <FontAwesomeIcon
                              icon={faSpinner}
                              className="animate-spin mr-2"
                            />
                          ) : null}
                          {formData.image ? "Change Image" : "Choose Image"}
                        </button>
                        {formData.image && (
                          <span className="text-gray-400">
                            Image selected: {formData.image.split("/").pop()}
                          </span>
                        )}
                      </div>
                      {formData.image && (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                          <Image
                            src={formData.image}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="minimalist-input"
                  />
                  <input
                    type="url"
                    placeholder="Project URL"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    className="minimalist-input"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="form-checkbox h-5 w-5 text-neon-green rounded border-neon-green/30"
                    />
                    <label className="text-gray-300">Featured Project</label>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setEditingProject(null);
                        clearForm();
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={
                        editingProject ? handleUpdateProject : handleAddProject
                      }
                      className="neon-button"
                    >
                      {editingProject ? "Update Project" : "Add Project"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid gap-6">
              {projects.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No projects found. Add your first project!
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-dark-200 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start border border-neon-green/10 hover:border-neon-green/30 transition-all duration-300"
                  >
                    <div className="md:w-48 h-32 relative rounded-lg overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-neon-green"
                          />
                        )}
                      </div>
                      <p className="text-gray-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-sm px-3 py-1 bg-neon-green/10 text-neon-green rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setFormData({
                            ...project,
                            tags: project.tags.join(", "),
                          });
                          setShowForm(true);
                        }}
                        className="text-neon-green hover:text-neon-green/80 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(ProjectsAdmin);
