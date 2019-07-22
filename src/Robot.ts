import Direction from './Direction'
import RobotStatus from './RobotStatus'

class ToyRobot{

    private _rows: number;
    private _columns: number;
    private _direction: Direction;
    private _current_row: number;
    private _current_column: number;
    constructor(rows: number = 5, columns: number = 5){
        this._rows = rows;
        this._columns = columns;
        this._direction = Direction.Down;
        this._current_row = 0;
        this._current_column = 0;
    }
    
    getStatus(){
        return new RobotStatus(this._direction, this._current_row, this._current_column);
    }
}

export default ToyRobot