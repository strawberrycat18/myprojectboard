
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import NaviBar from "../NavBar";

export default function ProjectEditPage() {
  const [projectStatus, setProjectStatus] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [projectAddedDate, setProjectAddedDate] = useState("");
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const projectStatusOptions = [
    {
        statusLabel: "Not Started",
        statusValue: "Not Started"
    },
    {
        statusLabel: "In Progress",
        statusValue: "In Progress"
    },
    {
        statusLabel: "UAT",
        statusValue: "UAT"
    },
    {
        statusLabel: "Delivered",
        statusValue: "Delivered"
    },
  ];

  async function updateProjectDetails() {
    await updateDoc(doc(db, "projects", id), { projectStatus, projectName, projectBrief, projectAddedDate });
    navigate(`/projectdetails/${id}`);
  }

  async function deleteProjectDetails(id) {
    await deleteDoc(doc(db, "projects", id));
    navigate("/");
  }

  async function getProjectDetails(id) {
    const postProjectDetails = await getDoc(doc(db, "projects", id));
    const post = postProjectDetails.data();
    setProjectStatus(post.projectStatus);
    setProjectName(post.projectName);
    setProjectBrief(post.projectBrief);
    setProjectAddedDate(post.projectAddedDate);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getProjectDetails(id);
  }, [id, navigate, user, loading]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
        <div>
            <NaviBar/>
        </div>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Project Details</h1>
        <Form>
                <Button variant="primary" onClick={(e) => updateProjectDetails()}>
                    Update
                </Button>
                <Button variant="primary" onClick={(e) => deleteProjectDetails(id)}>
                    Delete
                </Button>
            <Link to={`/projectdetails/${id}`}>
                <Button variant="primary">
                    Back
                </Button>
            </Link>
          <Form.Group className="mb-3" controlId="projectAddedDate">
            <Form.Label>Project Added Date</Form.Label>
            <Form.Control
              type="text"
              value={projectAddedDate}
              onChange={(text) => setProjectAddedDate(text.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectStatus">
            <Form.Label>Project Status</Form.Label>
            <Form.Select value={projectStatus} onChange={(text) => setProjectStatus(text.target.value)}>
                {projectStatusOptions.map((option) => (
                    <option value={option.statusValue}>{option.statusLabel}</option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={projectName}
              onChange={(text) => setProjectName(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectBrief">
            <Form.Label>Project Brief</Form.Label>
            <Form.Control
              type="text"
              value={projectBrief}
              onChange={(text) => setProjectBrief(text.target.value)}
            />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}