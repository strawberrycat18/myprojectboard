import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import CreateAccountPage from "./views/CreateAccountPage";
import PageNotFound from "./views/PageNotFound";
import ProjectsPage from "./views/ProjectsPage";
import ProjectAddPage from "./views/ProjectsAddPage";
import ProjectEditPage from "./views/ProjectsEditPage";
import ProjectDetailsPage from "./views/ProjectDetailsPage";
import ProjectTasksPage from "./views/ProjectTasksPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProjectsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/addproject" element={<ProjectAddPage />} />
      <Route path="/editproject/:id" element={<ProjectEditPage />} />
      <Route path="/projectdetails/:id" element={<ProjectDetailsPage />} />
      <Route path="/projecttasks/:id" element={<ProjectTasksPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
