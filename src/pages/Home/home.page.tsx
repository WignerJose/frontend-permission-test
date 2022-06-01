import { Button, Card } from "react-bootstrap";

export const HomePage = () => {
  return (
    <>
      <Card className="text-center">
        <Card.Header>Welcome</Card.Header>
        <Card.Body>
          <Card.Title>Challege FullStack</Card.Title>
          <Card.Text>
            Realmente ha sido una prueba muy retadora de realizar,
          </Card.Text>
          <img
            alt=""
            height={400}
            src={"./assets/imagen/react.jpeg"}
            className="d-inline-block align-top"
          />
        </Card.Body>
        <Card.Footer className="text-muted">{}</Card.Footer>
      </Card>
    </>

  );
}
export default HomePage