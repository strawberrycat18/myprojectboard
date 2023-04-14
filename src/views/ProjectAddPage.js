
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import NaviBar from "../NavBar";

export default function AddProjectDetails() {
  const [user, loading] = useAuthState(auth);
  const [projectName, setProjectName] = useState("");
  const [projectBrief, setProjectBrief] = useState("");

  const navigate = useNavigate();

  async function addNewProject() {
    const projectStatus = "Not Started"
    const projectAddedDate = serverTimestamp();
    await addDoc(collection(db, "projects"), { projectStatus, projectName, projectBrief, projectAddedDate });
    navigate("/");
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [navigate, user, loading]);

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
        <h1 style={{ marginBlock: "1rem" }}>Add New Project</h1>
        <Form>
        <Button variant="primary" onClick={async (e) => addNewProject()}>
            Submit
          </Button>
          <Form.Group className="mb-3" controlId="projectStatus">
            <Form.Label>Project Status</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value="Not Started"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a project name..."
              value={projectName}
              onChange={(text) => setProjectName(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectBrief">
            <Form.Label>Project Brief</Form.Label>
            <Form.Control
              type="text"
              placeholder="Give a brief overview of the project..."
              value={projectBrief}
              onChange={(text) => setProjectBrief(text.target.value)}
            />
          </Form.Group>

        </Form>
      </Container>
    </>
  );
}