import { useEffect, useState } from "react";
import NaviBar from "../NavBar";
import { Form,InputGroup, Button, Container, Navbar, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

export default function ProjectTasksPage() {
  const [newTask, setNewTask] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const params = useParams();
  const pid = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

async function getProjectTasks(pid) {
    const postProjectDetails = await getDoc(doc(db, "projects", pid));
    const post = postProjectDetails.data();
    setProjectName(post.projectName);

  }

  const addNewTask = () => {
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: newTask,
        complete: false,
      }
    ]);
    setNewTask("");
  };

  const removeTask = (id) => {
    const newList = todoList.filter((item) => item.id !==id);
    setTodoList(newList)
  };

  const taskCompleted = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) {
        if (!task.complete){
            //Task is pending, modifying it to complete and increment the count
            setCompletedTaskCount(completedTaskCount + 1);
        } 
        else {
            //Task is complete, modifying it back to pending, decrement Complete count
            setCompletedTaskCount(completedTaskCount - 1);
        }

item = { ...task, complete: !task.complete };
      } else item = { ...task };
return item;
    });
    setTodoList(list);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getProjectTasks(pid);
  }, [pid, navigate, user, loading]);

return (
    <Container>
      <Navbar variant="light" bg="light">
        <Container>
            <div>
                <NaviBar/>
            </div>
        </Container>
      </Navbar>
      <div>
            <h2>Project Name: {projectName}</h2>
            <Link to={`/projectdetails/${pid}`}>
                <Button variant="primary">
                    Back to Details Page
                </Button>
            </Link>
            <h2>To-do List</h2>
            <InputGroup className="mb-3">
            <Form.Control
                type="text"
                placeholder="What task is required?"
                value={newTask}
                onInput={(text) => setNewTask(text.target.value)}
                />
          <Button variant="primary" onClick={() => addNewTask()}>
            Add Task
          </Button>

          </InputGroup>
          <h2>List of Tasks</h2>
        <Row>
            <Col>
                <b>Pending Tasks</b> {todoList.length - completedTaskCount}
            </Col>
            <Col>
                <b>Completed Tasks</b> {completedTaskCount}
            </Col>
        </Row>
        <div>
            
            {todoList.map((todo) => {
              return (
                <Container>
                    <InputGroup className="mb-3">
                        <InputGroup.Checkbox
                        complete = {todo.complete}
                        id={todo.id}
                        onClick={() => taskCompleted(todo.id)}
                    />
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={todo.task}
                        />
                        <Button 
                        variant="outline-secondary" id="button-addon2"
                        onClick={() => removeTask(todo.id)}
                        >
                            Delete
                        </Button>
                    </InputGroup>
                   
                </Container>
              );
            })}
        </div>
      </div>
    </Container>
  );
}
