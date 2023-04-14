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
      if (project.projectStatus === "Not Started") 
      return <ListProjectsCard key={index} project={project} />
    })
  }

  const ProjectsRow2 = () => {
    return projects.map((project, index) => {
      if (project.projectStatus === "In Progress") 
      return <ListProjectsCard key={index} project={project} />
    })
  }

  const ProjectsRow3 = () => {
    return projects.map((project, index) => {
      if (project.projectStatus === "UAT") 
      return <ListProjectsCard key={index} project={project} />
    })
  }

  const ProjectsRow4 = () => {
    return projects.map((project, index) => {
      if (project.projectStatus === "Delivered") 
      return <ListProjectsCard key={index} project={project} />
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
        <Row>
            <Col>
                <Button href="/addproject" variant="primary">Add New Project</Button>
            </Col>
        </Row>
        <Row>
          <Col>
            <ProjectsRow1 />
          </Col>
          <Col>
            <ProjectsRow2 />
          </Col>
          <Col>
            <ProjectsRow3 />
          </Col>
          <Col>
            <ProjectsRow4 />
          </Col>
        </Row>
      </Container>

    </>
  );
}

function ListProjectsCard({project}) {
    const { projectStatus, projectName, projectAddedDate, id} = project;
    // console.log(projectAddedDate)
    // const projectDate = projectAddedDate.toDate().toDateString();
    // console.log(projectDate)
        return (
            <>
                <Card style={{width: '10rem'}}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="text-muted">{projectStatus}</ListGroup.Item>
                        <Link to={`projectdetails/${id}`}>
                            <ListGroup.Item>{projectName}</ListGroup.Item>
                        </Link>
                        <ListGroup.Item className="text-muted"><text>{projectAddedDate}</text></ListGroup.Item>
                    </ListGroup>
                </Card>
            </>
        );
    }