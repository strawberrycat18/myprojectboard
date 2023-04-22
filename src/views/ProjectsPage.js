import { useEffect, useState } from "react";
import { Button, Container, Navbar, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import NaviBar from "../NavBar";
import "../index.css";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  async function getAllProjects() {
    const query = await getDocs(collection(db, "projects"));
    const projects = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setProjects(projects);
  }

  useEffect(() => {
    getAllProjects();
}, []);

const ProjectsRow1 = () => {
    return projects.map((project, index) => {
      if (project.projectStatus === "Not Started") {
      return (<ListProjectsCard key={index} project={project} />);
      }
      return null
    })
  }

  const ProjectsRow2 = () => {
    return projects.map((project, index) => {
      if (project.projectStatus === "In Progress") {
      return (<ListProjectsCard key={index} project={project} />);
      }
      return null
    })
  }

  const ProjectsRow3 = () => {
    return projects.map((project, index) => {
      if (project.projectStatus === "UAT") {
        return <ListProjectsCard key={index} project={project} />
      }
      return null
    })
  }

  const ProjectsRow4 = () => {
    return projects.map((project, index) => {
      if (project.projectStatus === "Delivered") {
        return <ListProjectsCard key={index} project={project} />
      }
      return null
    })
  }

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
        <Row style={{ marginBlock: "1rem" }}>
            <Col class="col-3">
                <Button href="/addproject" variant="primary">Add New Project</Button>
            </Col>
        </Row>
        <Row>
            <Col class="col-3">
              <div class="ms-1 border border-success rounded-3">
                <h5 class="mt-3 text-center">Not Started</h5>
                <ProjectsRow1 />
              </div>
            </Col>
            <Col class="col-3">
            <div class="ms-1 border border-success rounded-3">
                  <h5 class="mt-3 text-center">In Process</h5>
                  <ProjectsRow2 />
                </div>
            </Col>
            <Col class="col-3">
                <div class="ms-1 border border-success rounded-3">
                  <h5 class="mt-3 text-center">UAT</h5>
                  <ProjectsRow3 />
                </div>
            </Col>
            <Col class="col-3">
              <div class="me-1 border border-success rounded-3">
                  <h5 class="mt-3 text-center">Delivered</h5>
                <ProjectsRow4 />
              </div>
            </Col>
        </Row>

      </Container>

    </>
  );
}

function ListProjectsCard({project}) {
    const { projectStatus, projectName, projectCreatedOn, id} = project;
    // console.log(projectCreateDate.seconds)
    // const projectDate = new Date (projectCreateDate.seconds * 1000 + projectCreateDate.nanoseconds / 1000000);
    // console.log(project)
        return (
            <>
                <Card className="m1" style={{margin:"1rem"}}>
                    <ListGroup draggable="true" variant="flush">
                        <ListGroup.Item className= "nontitle text-muted">{projectStatus}</ListGroup.Item>
                        <Link className="selectLink" to={`projectdetails/${id}`}>
                            <ListGroup.Item className="selectLink" >{projectName}</ListGroup.Item>
                        </Link>
                        <ListGroup.Item className="nontitle text-muted">{projectCreatedOn}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </>
        );
    }