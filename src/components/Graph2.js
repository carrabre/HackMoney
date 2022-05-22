import React from "react";
import Topbar from "./Topbar/topbar";
import { Card, Row, Col } from "reactstrap";
import { Table, Nav } from "react-bootstrap";
// import { Container } from "react-bootstrap";
import "./graph.css";
import { Container, Button } from "react-bootstrap";
import Chart from "./Chart2";
import { getData } from "../utils2";
import Vector from "../assets/images/Vector.png";
import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
  componentDidMount() {
    getData().then((data) => {
      this.setState({ data });
    });
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <TypeChooser>
        {(type) => <Chart type={type} data={this.state.data} />}
      </TypeChooser>
    );
  }
}

function Graphmodal() {
  const defaultAccount = localStorage.getItem('address')
  console.log("Bonds");
  return (
    <>
      <Topbar address={defaultAccount.replace(/"/g, "")} />
      <Container className="graph-cont">
        <div className="justify-content-end">
          <Card className="card-main">
            <Row>
              <Col lg={9}>

                {" "}
                <div className="main-chart">
                  <div className="chart-text"></div>
                  <div className="chart-table2">
                    <Row>
                      <Col lg={2}>
                        <h1>
                          <span>d</span>petal
                        </h1></Col>
                      <Col lg={10}>

                        <div className="graphnav-btn">
                          <Nav variant="pills" defaultActiveKey="/home">
                            <Nav.Item >
                              <Nav.Link eventKey="link-1">1 day</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="link-2">7 days</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="link-3">1 month</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="link-4">3 months</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="link-5">1 year</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="link-6">Max </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </div></Col>

                    </Row>
                    <Table responsive>
                      {/* <Table striped bordered hover size="sm"> */}

                      <tbody className="chart-tabbody">
                        <tr>
                          <td>Duration</td>
                          <td>time to maturity</td>
                          <td>Total Volume</td>
                          <td>liquidity</td>
                          <td>Price</td>
                          {/* <td></td> */}
                        </tr>
                        <tr className="tfooetr">
                          <td> 2 yrs</td>
                          <td>20: 07: 24: 42</td>
                          <td>$81,753.37</td>
                          <td>$606,161.2</td>
                          <td>$0.000124</td>
                          {/* <td></td> */}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <ChartComponent />
                </div>
              </Col>
              <Col lg={3}></Col>
            </Row>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default Graphmodal;
