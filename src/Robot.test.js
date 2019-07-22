import ToyRobot from './Robot';
import RobotStatus from './RobotStatus'
import Direction from './Direction'
import MoveDirection from './MoveDirection';

test('Test Robot Movements', () =>{
    let robo = new ToyRobot();

    //Initial Status of the Robot
    let status = robo.getStatus()
    expect(status.direction).toEqual(Direction.North);
    expect(status.position_row).toEqual(0);
    expect(status.position_column).toEqual(0);

    // Place the bot on a valid position on the board.
    robo.placeRobot(1, 1, Direction.South);
    status = robo.getStatus()
    expect(status.direction).toEqual(Direction.South);
    expect(status.position_row).toEqual(1);
    expect(status.position_column).toEqual(1);

    // Place the bot on an invalid position on the board.
    expect(() => {
        robo.placeRobot(-1, -11, Direction.Right);
      }).toThrow();

    // Move to West
    robo.updatePosition(MoveDirection.Right);
    status = robo.getStatus()
    expect(status.direction).toEqual(Direction.West);
    expect(status.position_row).toEqual(1);
    expect(status.position_column).toEqual(1);

    // Move 1 position to west
    robo.move()
    status = robo.getStatus()
    expect(status.direction).toEqual(Direction.West);
    expect(status.position_row).toEqual(1);
    expect(status.position_column).toEqual(0);

    // Move to North
    robo.updatePosition(MoveDirection.Right);
    // Move to East
    robo.updatePosition(MoveDirection.Right);

    // Move 2 position to west
    robo.move()
    robo.move()
    status = robo.getStatus()
    expect(status.direction).toEqual(Direction.East);
    expect(status.position_row).toEqual(1);
    expect(status.position_column).toEqual(2);

    // Move to north
    robo.updatePosition(MoveDirection.Left);
    robo.move()
    status = robo.getStatus()
    expect(status.direction).toEqual(Direction.North);
    expect(status.position_row).toEqual(2);
    expect(status.position_column).toEqual(2);

    
    
    // Move to South
    robo.updatePosition(MoveDirection.Left);
    robo.updatePosition(MoveDirection.Left);
    status = robo.getStatus()
    expect(status.direction).toEqual(Direction.South);

    robo.move()
    robo.move()
    status = robo.getStatus()
    expect(status.position_row).toEqual(0);
    expect(status.position_column).toEqual(2);
    expect(() => {
        robo.move();
      }).toThrow();

});