import Direction from './Direction'

class RobotStatus{
    public direction: Direction;
    public position_row: number;
    public position_column: number;
    
    constructor(direction:Direction, postion_row:number, position_column:number){
        this.direction = direction;
        this.position_row = postion_row;
        this.position_column = position_column;
    }
}

export default RobotStatus