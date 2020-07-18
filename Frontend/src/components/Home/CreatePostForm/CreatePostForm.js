import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

import "./CreatePostForm.css";

export default function CreatePostForm() {
  const [isLoading, setLoading] = useState(false);

  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  }

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <div className="mb-5">
      <Card>
        <Card.Header as="h5">Crear nueva publicación!</Card.Header>
        <Card.Body>
          <Card.Title>¿Que deseas publicar el dia de hoy?</Card.Title>
          <form>
            <div className="form-row mb-3">
              <div className="col">
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Descripcion de la publicación..."
                ></textarea>
              </div>
            </div>
            <div className="form-row mb-3">
              <div className="col">
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                ></input>
              </div>
            </div>
            <div>
              <Button variant="primary" type="submit">
                Publicar
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
