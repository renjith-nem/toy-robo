import React, { Component } from 'react';
import ToyRobot from './Robot'
import logo from './downArrow.png';
import './RoboApp.css';
import MoveDirection from './MoveDirection';

class RoboApp extends Component<any,any> {
  render(){
    return (
      <RoboGame/>
    );
  }
}

class RoboGame extends Component<any, any> {  
  state = {
    robo: new ToyRobot(4, 4)
  }

  constructor(props:any){
    super(props);
    this.makeAMove = this.makeAMove.bind(this);
    this.makeLeft = this.makeLeft.bind(this);
    this.makeRight = this.makeRight.bind(this);
    this.reset = this.reset.bind(this);
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Robo App
          </h1>
        </header>
        <div/>
        <button type="button" onClick={this.makeAMove}>Move</button>
        <button type="button" onClick={this.makeLeft}>Left</button>
        <button type="button" onClick={this.makeRight}>Right</button>
        <button type="button" onClick={this.reset}>Reset</button>
        <div/>
        <ToyContainer maxRows={this.state.robo.getGridRowSize()} 
          maxCols={this.state.robo.getGridColumnSize()}
          rowPosition={this.state.robo.getStatus().position_row} 
          colPosition={this.state.robo.getStatus().position_column}
          toyCssClass={this.state.robo.getCssClass()}/>
      </div>
    );
  }

  makeAMove(){
    let robo = this.state.robo;
    robo.move();
    this.setState({robo: robo});
  }

  makeLeft(){
    let robo = this.state.robo;
    robo.updatePosition(MoveDirection.Left);
    this.setState({robo: robo});
  }

  makeRight(){
    let robo = this.state.robo;
    robo.updatePosition(MoveDirection.Right);
    this.setState({robo: robo});
  }
  
  reset(){
    let robo = this.state.robo;
    robo = new ToyRobot(4,4)
    this.setState({robo: robo});
  }
}

class ToyContainer extends Component<any,any> {
  render(){
    const maxRows = this.props.maxRows;
    const maxCols = this.props.maxCols;
    const rowPosition = this.props.rowPosition;
    const colPosition = this.props.colPosition;
    const toyCssClass = this.props.toyCssClass;
    return (
      <GridTable maxRows={maxRows} maxCols={maxCols}
            rowPosition={rowPosition} colPosition={colPosition} toyCssClass={toyCssClass}/>
    );
  }
}
class GridTable extends Component<any, any> {
    render(){
      const maxRows = this.props.maxRows;
      const maxCols = this.props.maxCols;
      const rowToRender = this.props.rowPosition;
      const colToRender = this.props.colPosition;
      const toyCssClass = this.props.toyCssClass;
      let rows = [];
      let colPosition = -1;
      for(var row=0; row<maxRows; row++){
        colPosition = (row === rowToRender)? colToRender : -1;
        rows.push(<GridRow key={row} maxCols={maxCols} colPosition={colPosition} toyCssClass={toyCssClass}/>);
      }
      return (
        <table className="Table">
          <tbody>
            {rows}
          </tbody>
        </table>
      );
    }
}
  class GridRow extends Component<any, any> {
    render(){
      const maxCols = this.props.maxCols;
      const colToRender = this.props.colPosition;
      const toyCssClass = this.props.toyCssClass;
      let cols = [];
      for(var col=0; col<maxCols; col++){
        let shouldRenderToy = (col === colToRender)? true:false;
        cols.push(<GridCell key={col} shouldRenderToy={shouldRenderToy} toyCssClass={toyCssClass}/>);
      }
      return (
      <tr>{cols}</tr>
    );
      }
  };

  class GridCell extends Component<any, any> {
    render(){
      const toyDirection = this.props.toyDirection;
      const toyCssClass = this.props.toyCssClass;
      const shouldRenderToy = this.props.shouldRenderToy;
      let cellData = (shouldRenderToy)?<img src={logo} className={toyCssClass} alt="logo" />:'';
      return (
        <td className="tableData">
          <div className="CellData">{cellData}</div>
        </td>
      );
    }
  };
  
  export default RoboApp;