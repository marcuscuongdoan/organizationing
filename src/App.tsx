import { useEffect, useState } from "react";
import "./App.css";
import { EmployeeOrgApp } from "./EmployeeOrgApp";
import { ceo } from "./ceoMock";
import { Employee } from "./interfaces/Employee";

function RecursiveRender(employee: Employee) {
  return (
    <li key={employee.uniqueId}>
      <div>
        <b>{employee.uniqueId}</b> {employee.name}
      </div>
      {employee.subordinates.length > 0 && (
        <ul>{employee.subordinates.map((sub) => RecursiveRender(sub))}</ul>
      )}
    </li>
  );
}

function App() {
  const [app, setApp] = useState<Employee>();

  useEffect(() => {
    const newCeo = JSON.parse(JSON.stringify(ceo));
    const app = new EmployeeOrgApp(newCeo);
    setApp(newCeo);
    console.log(app);
    app.move(6, 2);
    app.move(2, 6);
    app.undo();
    app.undo();
    app.redo();
    app.redo();
    setApp(app.ceo);
    console.log(app.ceo);

    return () => {
      console.clear();
      setApp(undefined);
    };
  }, []);

  return (
    <div
      className="App"
      style={{
        textAlign: "left",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
      }}
    >
      <div>
        <div>
          <b>{ceo.uniqueId}</b> {ceo.name}
        </div>
        <ul>
          {ceo.subordinates &&
            ceo.subordinates.map((sub) => RecursiveRender(sub))}
        </ul>
      </div>

      {app && (
        <div>
          <div>
            <b>{app.uniqueId}</b> {app.name}
          </div>
          <ul>
            {app.subordinates &&
              app.subordinates.map((sub) => RecursiveRender(sub))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
