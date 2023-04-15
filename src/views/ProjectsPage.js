import { useEffect, useState } from "react";
import { Button, Container, Navbar, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import NaviBar from "../NavBar";


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
      <Container class="container px-4 text center">
        <Row >
            <Col>
                <Button href="/addproject" variant="primary">Add New Project</Button>
            </Col>
        </Row>
        <Row>
          <Col>
            <h5>Not Started</h5>
            <ProjectsRow1 />
          </Col>
          <Col>
          <h5>In Progress</h5>
            <ProjectsRow2 />
          </Col>
          <Col>
          <h5>UAT</h5>
            <ProjectsRow3 />
          </Col>
          <Col>
          <h5>Delivered</h5>
            <ProjectsRow4 />
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
                <Card style={{width: '10rem'}}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="text-muted">{projectStatus}</ListGroup.Item>
                        <Link to={`projectdetails/${id}`}>
                            <ListGroup.Item>{projectName}</ListGroup.Item>
                        </Link>
                        <ListGroup.Item className="text-muted">{projectCreatedOn}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </>
        );
    }