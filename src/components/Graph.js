import React from "react";
import Topbar from "./Topbar/topbar";
import { Card, Row, Col } from "reactstrap";
import { Table } from "react-bootstrap";
// import { Container } from "react-bootstrap";
import "./graph.css";
import { Container, Button } from "react-bootstrap";
import Chart from './Chart';
import { getData } from "../utils"
import Vector from "../assets/images/Vector.png"
import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
    componentDidMount() {
        getData().then(data => {
            this.setState({ data })
        })
    }
    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <TypeChooser>
                {type => <Chart type={type} data={this.state.data} />}
            </TypeChooser>
        )
    }
}

function Graphmodal() {
    console.log("Bonds");
    const defaultAccount = localStorage.getItem('address')
    return (
        <>
            <Topbar address={defaultAccount.replace(/"/g, "")} />
            <Container className="graph-cont">
                <div className="justify-content-center">
                    <Card className="card-main">
                        <Row>
                            <Col lg={9}> <div className='main-chart'>
                                <div className="chart-text">
                                </div>
                                <div className="chart-table">
                                    <h1><span>b</span>petal</h1>
                                    {/* <Table striped bordered hover size="sm"> */}
                                    <Table responsive>
                                        <tbody className="chart-tabbody" >
                                            <tr>
                                                <td>Duration</td>
                                                <td>ends</td>
                                                <td>Total Volume</td>
                                                <td>Price</td>
                                                <td>Tokens Sold</td>
                                                <td rowSpan="0"><a href="#" className="info">info</a></td>
                                            </tr>
                                            <tr className="tfooetr">
                                                <td> 2 yrs</td>
                                                <td>20: 07: 24: 42</td>
                                                <td>$81,753.37</td>
                                                <td>$0.000124</td>
                                                <td>32%<br /><span>$81,753.37</span></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                </div>
                                <ChartComponent />
                            </div>
                            </Col>
                            <Col lg={3}>
                                <div className="right-currence">
                                    <Row>
                                        <Col lg={6} sm={6}>
                                            <div className="inputwap">
                                                <input type="text" label="Bonded Token" className="palcing form-control" placeholder="0" />
                                                <label className="doller">~$0</label>
                                            </div>
                                        </Col>
                                        <Col lg={6} sm={6}>
                                            <div className="inputwap2">
                                                <p className="DAi"><img src={Vector} alt="icon" className="dai-img" />DAI</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} sm={6}>
                                            <div className="inputwap">
                                                <input type="text" label="Bonded Token" className="palcing form-control" placeholder="0" />
                                                <label className="doller">~$0</label>
                                            </div>
                                        </Col>
                                        <Col lg={6} sm={6}>
                                            <div className="inputwap2">
                                                <p className="bMC">bMC</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="Swap">
                                            <Button variant="outlined" className="Swap">Swap </Button>
                                        </div>
                                    </Row>

                                </div>

                            </Col>
                        </Row>
                    </Card>

                </div>
            </Container>
        </>
    );
}

export default Graphmodal;

