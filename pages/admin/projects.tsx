import { useState } from 'react'
import Layout from '../../components/Layout'

const ProjectsAdmin = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [projects, setProjects] = useState([])

  const handleAddProject = () => {
    const newProject = {
      id: projects.length + 1,
      title,
      description,
      image,
    }
    setProjects([...projects, newProject])
    clearForm()
  }

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  const clearForm = () => {
    setTitle('')
    setDescription('')
    setImage('')
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Manage Projects</h1>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Add New Project</h2>
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={handleAddProject}
            className="bg-blue-500 text-white p-2"
          >
            Add Project
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Manage Projects</h2>
          <ul>
            {projects.map(project => (
              <li key={project.id} className="flex justify-between items-center mb-2">
                <span>{project.title}</span>
                <div>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-500 text-white p-1 mr-2"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default ProjectsAdmin 