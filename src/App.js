import React from "react";
import "./App.css";
import { GridLayout } from "@egjs/react-infinitegrid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "react-sidebar";

const Item = ({ num }) => (
  <div className="item">
    <div className="thumbnail">
      <img src={`https://picsum.photos/200/300?random=${num}.jpg`} alt="egjs" />
    </div>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row className="header">
            <Col>
              <Menu className="sidebar" />
            </Col>
          </Row>
          <Row className="content">
            <Col />
            <Col>
              <Grid />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class Grid extends React.Component {
  state = { list: [] };

  loadItems(groupKey, num) {
    const items = [];
    const start = this.start || 0;

    for (let i = 0; i < num; ++i) {
      items.push(
        <Item groupKey={groupKey} num={1 + start + i} key={start + i} />
      );
    }
    this.start = start + num;
    return items;
  }

  onAppend = ({ groupKey, startLoading }) => {
    startLoading();
    const list = this.state.list;
    const items = this.loadItems((parseFloat(groupKey) || 0) + 1, 5);
    this.setState({ list: list.concat(items) });
  };

  onLayoutComplete = ({ isLayout, endLoading }) => {
    !isLayout && endLoading();
  };

  render() {
    console.log(this.state.list);
    return (
      <GridLayout
        options={{
          isConstantSize: true,
          transitionDuration: 0.2,
        }}
        layoutOptions={{
          margin: 10,
          align: "center",
        }}
        onAppend={this.onAppend}
        onLayoutComplete={this.onLayoutComplete}>
        {this.state.list}
      </GridLayout>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <Sidebar
        sidebarClassName="sidebar"
        contentClassName="sidebar-content"
        sidebar={[
          <b>Sidebar</b>,
          <br></br>,
          <a href="/">Home</a>,
          <br></br>,
          <a href="/">About</a>,
          <br></br>,
          <a href="/">Other Stuff</a>,
          <br></br>,
          <a href="/">Settings</a>,
        ]}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}>
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
    );
  }
}

export default App;
