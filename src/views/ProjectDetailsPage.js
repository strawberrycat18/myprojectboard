
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { getDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import NaviBar from "../NavBar";

export default function ProjectDetailsPage() {
  const [projectStatus, setProjectStatus] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [projectCreateDate, setProjectCreateDate] = useState("");
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function getProjectDetails(id) {
    const postProjectDetails = await getDoc(doc(db, "projects", id));
    const post = postProjectDetails.data();
    setProjectStatus(post.projectStatus);
    setProjectName(post.projectName);
    setProjectBrief(post.projectBrief);
    setProjectCreateDate(post.projectCreateDate);
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
            <Link to={`/editproject/${id}`}>
                <Button variant="primary">
                    Edit
                </Button>
            </Link>
            <Link to={`/projecttasks/${id}`}>
                <Button variant="primary">
                    Project Planning
                </Button>
            </Link>
          <Form.Group className="mb-3" controlId="projectAddedDate">
            <Form.Label>Project Creation Date</Form.Label>
            <Form.Control
              type="text"
              value={projectCreateDate}
              format="DD MMM YYYY"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectStatus">
            <Form.Label>Project Status</Form.Label>
            <Form.Control
              type="text"
              value={projectStatus}
              
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={projectName}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectBrief">
            <Form.Label>Project Brief</Form.Label>
            <Form.Control
              type="text"
              value={projectBrief}
              disabled
            />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}