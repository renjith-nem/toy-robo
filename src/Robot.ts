import Direction from './Direction';
import RobotStatus from './RobotStatus';
import MoveDirection from './MoveDirection';

class ToyRobot {
  private _maxRows: number;
  private _maxColumns: number;
  private _direction: Direction;
  private _current_row: number;
  private _current_column: number;
  private _css_class: String;

  constructor(rows: number = 5, columns: number = 5) {
    this._maxRows = rows;
    this._maxColumns = columns;
    this._direction = Direction.South;
    this._current_row = 0;
    this._current_column = 0;
    this._css_class = 'Robo-Toy-logo-South';
  }

  getGridRowSize(){
    return this._maxRows;
  }

  getGridColumnSize(){
    return this._maxColumns;
  }
  placeRobot(
    newRowPosition: number,
    newColumnPosition: number,
    newDirection: Direction
  ) {
    
    if (!this.canMove(newRowPosition, newColumnPosition)) {
      throw new Error('Invalid position');
    }

    this._current_row = newRowPosition;
    this._current_column = newColumnPosition;
    this._direction = newDirection;
    this.updateCssClass();
  }

  getStatus() {
    return new RobotStatus(
      this._direction,
      this._current_row,
      this._current_column
    );
  }

  updatePosition(newDirection: MoveDirection) {
    let currentDirect = this._direction.valueOf();
    let newValue = newDirection.valueOf();
    newValue = currentDirect + newValue;
    if (newValue > 4) {
      newValue = 1;
    } else if (newValue < 1) {
      newValue = 4;
    }
    this._direction = newValue;
    this.updateCssClass();
  }

  updateCssClass(){
    switch (this._direction) {
      case Direction.North: {
        this._css_class = 'Robo-Toy-logo-North';
        break;
      }

      case Direction.South: {
        this._css_class = 'Robo-Toy-logo-South';
        break;
      }

      case Direction.East: {
        this._css_class = 'Robo-Toy-logo-East';
        break;
      }

      case Direction.West: {
        this._css_class = 'Robo-Toy-logo-West';
        break;
      }
    }
  }

  move() {
    let newRow = this._current_row;
    let newColumn = this._current_column;
    switch (this._direction) {
      case Direction.North: {
        newRow--;
        break;
      }

      case Direction.South: {
        newRow++;
        break;
      }

      case Direction.East: {
        newColumn++;
        break;
      }

      case Direction.West: {
        newColumn--;
        break;
      }
    }

    if (!this.canMove(newRow, newColumn)) {
      throw new Error('No more space to move.');
    }
    this._current_column = newColumn;
    this._current_row = newRow;
  }

  canMove(row: Number, column: Number) {
    if (
      row < 0 ||
      row >= this._maxRows ||
      column < 0 ||
      column >= this._maxColumns
    ) {
      return false;
    }
    return true;
  }

  getCssClass(){
    return this._css_class;
  }
}

export default ToyRobot;
