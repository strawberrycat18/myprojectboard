
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Navbar, Row, Col, Card, ListGroup } from "react-bootstrap";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import NaviBar from "../NavBar";

export default function ProjectDetailsPage() {
  const [projectStatus, setProjectStatus] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectCreatedOn, setProjectCreatedOn] = useState("");
  const [selectProjectStatus, setSelectProjectStatus] = useState("");
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
 
  async function getAllProjects() {
    const query = await getDocs(collection(db, "projects"));
    const projects = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setProjects(projects);
  }

  async function getProjectDetails(id) {
    const postProjectDetails = await getDoc(doc(db, "projects", id));
    const post = postProjectDetails.data();
    setProjectStatus(post.projectStatus);
    setProjectName(post.projectName);
    setProjectBrief(post.projectBrief);
    setProjectCreatedOn(post.projectCreatedOn);

    selectProjectStatus.length === 0 ? setSelectProjectStatus(post.projectStatus) : setSelectProjectStatus(selectProjectStatus)

  }

  const ProjectRows = () => {
    if (selectProjectStatus.length === 0) {
      return projects.map((project, index) => {
        if (project.projectStatus === projectStatus) {
        return (<ListProjectsCard key={index} project={project} />);
        }
        return null
      })
    } else {
      return projects.map((project, index) => {
        if (project.projectStatus === selectProjectStatus) {
        return (<ListProjectsCard key={index} project={project} />);
        }
        return null
      });
    }}

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getAllProjects();
    getProjectDetails(id);
  }, [id, navigate, user, loading, selectProjectStatus]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
        <div>
            <NaviBar/>
        </div>
        </Container>
      </Navbar>
      <Row>
        <Col>
         <Container>
         <Form.Group className="mb-3" controlId="projectStatus">
            <Form.Label>Select a Project Status</Form.Label>
            <Form.Select value={selectProjectStatus} onChange={(text) => setSelectProjectStatus(text.target.value)}>
                {projectStatusOptions.map((option) => (
                    <option value={option.statusValue}>{option.statusLabel}</option>
                ))}
            </Form.Select>
          </Form.Group>
            <ProjectRows />
         </Container>
        </Col>
      
        <Col>
          <Container>
            <h1 style={{ marginBlock: "1rem" }}>Project Details</h1>
            <Form>
                <Link to={`/editproject/${id}`}>
                    <Button variant="primary">
                        Edit
                    </Button>
                </Link>
                <Link to={`/`}>
                    <Button variant="primary">
                        Back to Projects
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
                  value={projectCreatedOn}
                  // format="DD MMM YYYY"
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
        </Col>
      </Row>

    </>
  );
}

function ListProjectsCard({project}) {
  const { projectStatus, projectName, id} = project;
  // console.log(projectCreateDate.seconds)
  // const projectDate = new Date (projectCreateDate.seconds * 1000 + projectCreateDate.nanoseconds / 1000000);
  // console.log(project)
      return (
          <>
              <Card style={{width: '10rem'}}>
                  <ListGroup draggable="true" variant="flush">
                      <ListGroup.Item className="text-muted">{projectStatus}</ListGroup.Item>
                      <Link to={`/projectdetails/${id}`}>
                          <ListGroup.Item>{projectName}</ListGroup.Item>
                      </Link>
                  </ListGroup>
              </Card>
          </>
      );
  }