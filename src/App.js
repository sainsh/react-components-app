import React from 'react';
import './App.css';
import {GridLayout} from "@egjs/react-infinitegrid";

const Item = ({num}) => (
  <div className="item">
    <div className="thumbnail">
      <img
        src={`https://picsum.photos/200/300?random=${num}.jpg`}
        alt="egjs"
      />
    </div>
  </div>
);

class App extends React.Component {
  
  
  render(){
  return (
    <div className="App">
      <Grid/>
    </div>
  );
  }
}

class Grid extends React.Component{

  state = { list: []};

  loadItems(groupKey, num){
    const items = [];
    const start = this.start || 0;
    
    for( let i = 0; i < num; ++i){
      items.push(
        <Item groupKey={groupKey} num ={1+start+i}  key = {start +i}/>
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

  render(){
    console.log(this.state.list);
    return(
      <GridLayout options={{
        isConstantSize: true,
        transitionDuration: 0.2
      }}
      layoutOptions = {{
        margin: 10,
        align: "center"
      }}
      onAppend={this.onAppend}
      onLayoutComplete={this.onLayoutComplete}>{this.state.list}</GridLayout>
    );
  }
}

export default App;
