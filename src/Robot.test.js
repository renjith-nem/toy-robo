import ToyRobot from './Robot';
import RobotStatus from './RobotStatus'
import Direction from './Direction'

test('testRobot', () =>{
    let robo = new ToyRobot();

    //Initial Status of the Robot
    let status = robo.getStatus()
    expect(status.direction).toEqual(Direction.Down);
    expect(status.position_row).toEqual(0);
    expect(status.position_column).toEqual(0);


});