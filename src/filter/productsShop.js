import "./filter.css";
import { useState, useEffect } from "react";
import { faSearchengin, faShopware } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import products from "./api/products.json";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Footer from "./Footer/Footer";

const ProductShop = () => {
  const [typing, setTyping] = useState("");
  const [productData, setproductData] = useState([]);

  useEffect(() => {
    getProducts();
  }, [typing]);

  async function getProducts() {
    const data = products
      .filter((item) => item.title.toLowerCase().includes(typing.toLowerCase()))
      .map((i) => {
        return {
          title: i.title,
          images: i.images,
          description: i.description,
          price: i.price,
        };
      });
    setproductData(data);
  }

  function typingStart(e) {
    var secilenID = document.getElementById("logo-pro");
    secilenID.style.transition = "3s ease";
    secilenID.style.transform = "rotate(360deg)";
    const typingTimeout = setTimeout(() => {
      setTyping(e.target.value);
    }, 500);

    return () => {
      clearTimeout(typingTimeout);
    };
  }

  function changeBorder() {
    alert("Sepete eklendi");
    var secilenID = document.getElementById("logo-pro");
    secilenID.style.transition = "3s ease";
    secilenID.style.transform = "rotate(360deg)";
  }

  return (
    <>
      <Navbar className="header-custom" bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <Row>
              <Col>
                <div id="logo-pro" className="logo-pro" />
                <b className="logo-title">E-Shop</b>
              </Col>
            </Row>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <InputGroup className="mb-3 search-input-area">
              <Form.Control
                placeholder="Ürün,katgeori,marka ara"
                aria-label="Ürün ara"
                aria-describedby="basic-addon2"
                onChange={typingStart}
              />
              <InputGroup.Text id="basic-addon2">
                <FontAwesomeIcon
                  className="search-products"
                  icon={faSearchengin}
                />
              </InputGroup.Text>
            </InputGroup>
            <Nav.Link className="basket-media" href="#action1">
              <b>SEPETİM</b>
            </Nav.Link>
            <div className="basket">
              <div className="shop-pro" />
              <p className="basket-title">3</p>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {productData.length === 0 && (
        <p className="not-found">Sonuç bulunamadı 😔!</p>
      )}

      <Row className="products-area">
        {productData.map((item) => {
          return (
            <Col xs={4} className="pro-card" key={item.title}>
              <Card style={{ width: "310px" }} className=" product">
                <div class="image-text">
                  <Card.Img id="images" variant="top" src={item.images} />
                  <p id="price" class="text-price">
                    <b>{item.price}₺</b>
                  </p>
                </div>
                <Card.Body>
                  <Card.Title id="title" value="{item.title} " className="text">
                    {item.title}
                  </Card.Title>
                  <Card.Text id="description" className="text-description">
                    {item.description}
                  </Card.Text>
                  <Button
                    onClick={() => {
                      changeBorder("sonuc");
                    }}
                    class="btnAddNewProduct"
                    type="submit"
                    variant="outline-warning"
                  >
                    Sepete ekle{" "}
                    <FontAwesomeIcon className="faShopware" icon={faShopware} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Footer name="Fırat AKSOY" link="https://aksoyfirat.net/about" />
    </>
  );
};
export default ProductShop;
