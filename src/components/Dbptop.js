import React from "react";
// import { Row, Col } from "react-bootstrap";
import { Container, Tabs, Tab, Card, Col, Row, Table, Button, Nav } from "react-bootstrap";
import "./Dbptop.css";
import Vector from "../assets/images/Vector.png";
import Topbar from "./Topbar/topbar";
import { Link } from 'react-router-dom';




function Dbps() {
  console.log("Dbp");
  const defaultAccount = localStorage.getItem('address')
  return (
    <>
      <Topbar address={defaultAccount.replace(/"/g, "")}/>

      <Container>
        <div className="act-div">
          <div className="row">
            <div className="col-md-12">
              <div className="tabbar">
                <Tabs
                  defaultActiveKey="Swap"
                  transition={false}
                  id="noanim-tab-example"
                  className="mb-3 tab-new"
                >

                  <Tab eventKey="Swap" title="Swap" classname="tab-each">
                    <>
                      <Card className="swap-card">
                        <Row className="swap-row">
                          <Col lg={8} sm={6}>
                            <div className="input-swap">
                              <input type="text" label="Bonded Token" className="swap form-control" placeholder="0" />
                              <label className="swapdollar">~$0</label>
                            </div>
                          </Col>
                          <Col lg={4} sm={6}>
                            <div className="swapwap2">
                              <p className="bMC"><img src={Vector} alt="icon" className="ic-img2" />ETH</p>
                            </div>
                          </Col>
                        </Row>
                        <Row className="swap-row">
                          <Col lg={8} sm={6}>
                            <div className="input-swap">
                              <input type="text" label="Bonded Token" className="swap form-control" placeholder="0" />
                              <label className="swapdollar">~$0</label>
                            </div>
                          </Col>
                          <Col lg={4} sm={6}>
                            <div className="swapwap2">
                              <p className="bMC">bMC</p>
                            </div>
                          </Col>
                        </Row>
                        <hr className="horizontal-row" />
                        <div className="swap-table pool-table">
                          <Table responsive="sm">
                            <tbody className="swap-tabbody" >
                              <tr>
                                <td>APY</td>
                                <td>Maturity<br />Date</td>
                                <td>Bond Info</td>
                                <td>Total Yield</td>
                              </tr>
                              <tr className="swap-tabfoot">
                                <td>8%</td>
                                <td>10/12/23</td>
                                <td ><a href="#" className="swap-ifo">info</a></td>
                                <td>$4,247</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        <div>
                          <div className="swap-ctn">
                            <Button variant="outlined" className="swap-btncrn">Swap </Button>
                          </div>
                        </div>
                      </Card>
                    </>
                  </Tab>
                  <Tab eventKey="Pool" title="Pool">
                    <>
                      <Row className="pool-upper">
                        <Col lg={6} sm={6}>
                          <h1 className="headtext">
                            Pools
                          </h1>
                        </Col>
                        <Col lg={6} sm={6}>
                          <div className="swap-ctn">

                            {/* <Button variant="outlined" className="pool-btncrn" >       */}
                            <Link to={"/addliquidity"} className="pool-btncrn">New Position</Link>
                            {/* </Button> */}

                          </div>

                        </Col>
                      </Row>
                      <Card className="pool-card">
                        <div className="swap-table pool-table">
                          <Table responsive="sm">
                            <tbody className="pool-tab" >
                              <tr className="tabtr1">
                                <td>Pools</td>
                                <td>TVL</td>
                                <td>APR</td>
                                <td></td>
                              </tr>
                              <tr className="tabtr1">
                                <td>bMC-ETH</td>
                                <td>$10,323,476</td>
                                <td>8.2%</td>
                                <td ><a href="#" className="pool-ifo">stake</a></td>
                              </tr>
                              <tr className="tabtr1">
                                <td>bMC-DAI</td>
                                <td>$1,327,847</td>
                                <td>10.2%</td>
                                <td ><a href="#" className="pool-ifo">stake</a></td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Card>
                    </>
                  </Tab>
                  <Tab eventKey="Explore" title="Explore">
                    <>
                      <div>

                        <h1 className="h1explore">Bond Explorer</h1>
                        <Card className="explore-card">
                          <Table className="swap-table Explore-tables" responsive="sm">
                            <thead>
                              <tr>
                                <th>Bonds</th>
                                <th>APY</th>
                                <th>Maturity <br />Date</th>
                                <th></th>
                                <th>Total Yield<br /> (per $1000)</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>bMC</td>
                                <td>8%</td>
                                <td>10/12/23</td>
                                <td><a href="" className="Info2">Info</a></td>
                                <td>$8,247</td>
                                <td><a href="" className="Info2">Trade</a></td>
                              </tr>
                              <tr>
                                <td>bMC</td>
                                <td>8%</td>
                                <td>10/12/23</td>
                                <td><a href="" className="Info2">Info</a></td>
                                <td>$8,247</td>
                                <td><a href="" className="Info2">Trade</a></td>
                              </tr>
                              <tr>
                                <td>bMC</td>
                                <td>8%</td>
                                <td>10/12/23</td>
                                <td><a href="" className="Info2">Info</a></td>
                                <td>$8,247</td>
                                <td><a href="" className="Info2">Trade</a></td>
                              </tr>
                              <tr>
                                <td>bMC</td>
                                <td>8%</td>
                                <td>10/12/23</td>
                                <td><a href="" className="Info2">Info</a></td>
                                <td>$8,247</td>
                                <td><a href="" className="Info2">Trade</a></td>
                              </tr>
                            </tbody>
                          </Table>

                        </Card>
                      </div>
                    </>
                  </Tab>

                </Tabs>

              </div>

            </div>

          </div>

        </div>
      </Container>
    </>
  );
}

export default Dbps;

