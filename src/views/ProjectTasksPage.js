import { useEffect, useState } from "react";
import NaviBar from "../NavBar";
import { Form,InputGroup, Button, Container, Navbar, Row, Col, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, getDocs, collection, addDoc, deleteDoc} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";



export default function ProjectTasksPage() {
  //const [newTask, setNewTask] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [projectStatus, setProjectStatus] = useState("");
  const [projectName, setProjectName] = useState("");
  //const [completedStatus, setCompletedStatus] = useState("")
  const [taskName, setTaskName] = useState("")
  const params = useParams();
  const pid = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

async function getProjectDetail(pid) {
    const postProjectDetails = await getDoc(doc(db, "projects", pid));
    const post = postProjectDetails.data();
    setProjectName(post.projectName);
    setProjectStatus(post.projectStatus);
}

async function getProjectToDoList(pid){
    const query = await getDocs(collection(db, "projects", pid, "todolist"));
    const todoList = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setTodoList(todoList.sort((a, b) => {return a.itemID - b.itemID}));

}

async function addNewTask(pid) {
  const completedStatus = false;
  const itemID = Math.max(...todoList.map(i => i.itemID),0) + 1;
  await addDoc((collection(db, "projects", pid, "todolist")), { itemID, completedStatus, taskName });
  //navigate(`/projecttasks/${pid}`);
  getProjectToDoList(pid);
  setTaskName("")
}

async function removeTask(pid,tid) {
   const query = doc(db, "projects", pid, "todolist", tid)
  await deleteDoc(query)

  navigate(`/projecttasks/${pid}`);
  getProjectToDoList(pid);
}

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
    getProjectDetail(pid);
    getProjectToDoList(pid);
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
            <Stack direction="horizontal" gap={4}>
              <h3 style={{ marginBlock: "1rem" }}>Project Name: {projectName} </h3>
              <div class="vr" style={{marginBlock:"1rem", height:"2rem"}}></div>
              <h3 style={{ marginBlock: "1rem" }}>Project Status: {projectStatus}</h3>
            </Stack>
            <Link to={`/projectdetails/${pid}`}>
                <Button variant="primary">
                    Back to Details Page
                </Button>
            </Link>
            <h2 className="my-3">To-do List</h2>
            <InputGroup className="mb-3">
            <Form.Control
                type="text"
                placeholder="What task is required?"
                value={taskName}
                onChange={(text) => setTaskName(text.target.value)}
                />
          <Button variant="primary" onClick={async (e) => addNewTask(pid)}>
            Add Task
          </Button>

          </InputGroup>
          <h2 className="my-3">List of Tasks</h2>
        <Row>
            <Col>
                <b>Pending Tasks</b> {(todoList.length - completedTaskCount) === 0 ? completedTaskCount : todoList.length - completedTaskCount}
            </Col>
            <Col>
                <b>Completed Tasks</b> {completedTaskCount}
            </Col>
        </Row>
        <div>
            
            {todoList.map((todo) => {
              return (
                <Container>
                    <InputGroup className="my-2">
                        <InputGroup.Checkbox
                        complete = {todo.completedStatus}
                        id={todo.id}
                        onClick={() => taskCompleted(todo.id)}
                    />
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={todo.taskName}
                        />
                        <Button 
                        variant="outline-secondary" id="button-addon2"
                        onClick={() => removeTask(pid,todo.id)}
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