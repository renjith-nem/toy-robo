import React, { Component, FormEvent, ChangeEvent } from 'react';
import ToyRobot from './Robot'
import logo from './downArrow.png';
import './RoboApp.css';
import MoveDirection from './MoveDirection';
import Direction from './Direction';

class RoboApp extends Component<any,any> {
  render(){
    return (
      <RoboGameContainer/>
    );
  }
}

class RoboGameContainer extends Component<any, any> {  
  state = {
    robo: new ToyRobot(4, 4)
  }

  constructor(props:any){
    super(props);
    this.makeAMove = this.makeAMove.bind(this);
    this.makeLeft = this.makeLeft.bind(this);
    this.makeRight = this.makeRight.bind(this);
    this.reset = this.reset.bind(this);
    this.placeToy = this.placeToy.bind(this);
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Robo App
          </h1>
        </header>
        <RoboGameControls makeAMove={this.makeAMove} makeLeft={this.makeLeft}
            makeRight={this.makeRight} reset={this.reset} placeToy={this.placeToy}/>

        <ToyContainer maxRows={this.state.robo.getGridRowSize()} 
          maxCols={this.state.robo.getGridColumnSize()}
          rowPosition={this.state.robo.getStatus().position_row} 
          colPosition={this.state.robo.getStatus().position_column}
          toyCssClass={this.state.robo.getCssClass()}/>
      </div>
    );
  }
  placeToy = (rowPosition:number, colPosition:number) => {
    console.log('place toy', rowPosition, colPosition);
    let robo = this.state.robo;
    robo.placeRobot(rowPosition, colPosition, Direction.North);
    this.setState({robo: robo});
    console.log(robo.getStatus())
  }
  makeAMove = () => {
    let robo = this.state.robo;
    robo.move();
    this.setState({robo: robo});
  }

  makeLeft= () => {
    let robo = this.state.robo;
    robo.updatePosition(MoveDirection.Left);
    this.setState({robo: robo});
  }

  makeRight= () => {
    let robo = this.state.robo;
    robo.updatePosition(MoveDirection.Right);
    this.setState({robo: robo});
  }
  
  reset= () => {
    let robo = this.state.robo;
    robo = new ToyRobot(4,4)
    this.setState({robo: robo});
  }
}

class RoboGameControls extends Component<any, any> {  

  constructor(props: any){
    super(props);
    this.state ={
      row: '',
      column: ''
    }
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.updateToyPosition = this.updateToyPosition.bind(this);
  }
  render(){
    return (
      <div>
        <div>
          <button type="button" onClick={this.props.makeAMove}>Move</button>
          <button type="button" onClick={this.props.makeLeft}>Left</button>
          <button type="button" onClick={this.props.makeRight}>Right</button>
          <button type="button" onClick={this.props.reset}>Reset</button>
        </div>
        <div>
          <form onSubmit={this.updateToyPosition}>
            <label> 
                Row Position:
                <input type="text" value={this.state.row} name="rowPosition" onChange={this.handleRowChange}/>
            </label>
            <label> 
                Column Position:
                <input type="text" name="colPosition" value={this.state.column} onChange={this.handleColumnChange}/>
            </label>
            <input type="submit" value="Place Toy"/>
          </form>
        </div>
      </div>
    );
  }

  handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({row: event.target.value});
  }

  handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({column: event.target.value});
  }

  updateToyPosition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.placeToy(Number(this.state.row), Number(this.state.column));
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
        let shouldRenderToy = (col === colToRender)? true : false;
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