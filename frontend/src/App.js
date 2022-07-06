import "./App.css";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Card } from "react-bootstrap";

function App() {
  const [BackendData, setBackendData] = useState([]);

  const [deleteData, setDeleteData] = useState([]);

  const [formData, updateFormData] = useState("");

  /* this is the initial fetch to get the db.js information. below this function it is being called in the useEffect so that it only runs
   once. I had to had  "proxy": "http://localhost:8080" to the json file so that our server can talk to this react frontend   */
  const getApiData = async () => {
    const response = await fetch("/api").then((response) => response.json());

    // update the state
    setBackendData(response);
  };

  useEffect(() => {
    getApiData();
  }, []);

  // handle the form data and update the state
  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
    console.log(formData);
  };

  /* delete item from the json file through the delete method http://localhost:8080/api/delete/:id
     all items are looped though and the id is compared with the id of the item to be deleted. If the id matches, the item is deleted.
  */
  const DeleteFunction = async (id) => {
    const requestOptions = {
      method: "Delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    for (let i = 0; i < BackendData.length; i++) {
      let chosenID = BackendData[i].id;
      if (BackendData[i].id === id) {
        await fetch(`/api/delete/${chosenID}`, requestOptions)
          .then((response) => response.json())
          .then((data) => setDeleteData(data.id));
      }
    }
    window.location.reload();
  };

  /* Create item makes a request to the backend to create a new item with the /api/additem endpoint and the form data is added.
     
  */

  const CreateNew = async (id, event) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        URL: formData.url,
      }),
    };

    await fetch("/api/additem", requestOptions).then((response) =>
      response.json()
    );

    window.location.reload();
  };

  /* All items are looped though and the id is compared with the id of the item to be update. If the id matches, the item is updated.
      the form data is added to the item body
  */

  const Update = async (id, event) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        URL: formData.url,
      }),
    };

    for (let i = 0; i < BackendData.length; i++) {
      let chosenID = BackendData[i].id;
      if (BackendData[i].id === id) {
        await fetch(`/api/update/${chosenID}`, requestOptions).then(
          (response) => response.json()
        );
      }
      window.location.reload(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* this is where new items are created */}
        <div className="search">
          <input name="title" placeholder="Title" onChange={handleChange} />

          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />

          <input name="url" placeholder="URL" onChange={handleChange} />

          {/* the create new function is called when the button is clicked */}
          <Button variant="primary" onClick={CreateNew}>
            Create New
          </Button>
        </div>

        {/* this is where all items are displayed with the .map method */}
        {BackendData.map((item) => {
          return (
            <div key={item.id}>
              <div className="container mt-5">
                <div className="row justify-content-md-center">
                  <div className="col col-lg-4">
                    {/* the card is where the information is displayed */}
                    <Card style={{ width: "28rem", height: "13rem" }}>
                      <Card.Body>
                        <Card.Title>
                          <h2>{item.title}</h2>
                        </Card.Title>

                        <Card.Text>{item.description}</Card.Text>
                        <Card.Link href="#">{item.URL}</Card.Link>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-md-auto"></div>
                  <div className="col col-lg-4">
                    {/* this is where the buttons are displayed and the update form */}
                    <div className="search">
                      <input
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                      />

                      <input
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                      />

                      <input
                        name="url"
                        placeholder="URL"
                        onChange={handleChange}
                      />

                      <Button variant="primary" onClick={() => Update(item.id)}>
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => DeleteFunction(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
