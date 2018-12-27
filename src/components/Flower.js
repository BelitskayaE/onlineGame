import SvgIcon from "@material-ui/core/es/SvgIcon/SvgIcon";
import React from "react";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';


class Flower extends React.Component {
    state = {
        timer: null,
        counter: 60
    };

    componentDidMount() {
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
    }

    componentDidUpdate() {
        this.state.counter === 0 && clearInterval(this.state.timer);

    }

    tick = () => {
        this.setState({
            counter: this.state.counter - 1
        });
    };

    fillColor = (dependency) => {
        switch (dependency) {
            case 'Gartensia':
                return '#0174DF';
            case 'Tulip':
                return '#610B38';
            case 'Rose':
                return '#DF0101';
            case 'Mimosa':
                return '#FFBF00';
            default: return '#fff'
        }

    };

    flower = (x, y) => (
        <SvgIcon style={{width: x, height: y}}>
            <path
                fill={this.fillColor(this.props.name)}
                d="M3,13A9,9 0 0,0 12,22A9,9 0 0,0 3,13M12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,22M18,3V8A6,6 0 0,1 12,14A6,6 0 0,1 6,8V3C6.74,3 7.47,3.12 8.16,3.39C8.71,3.62 9.2,3.96 9.61,4.39L12,2L14.39,4.39C14.8,3.96 15.29,3.62 15.84,3.39C16.53,3.12 17.26,3 18,3Z"
            />
        </SvgIcon>
    );

    render() {
        return (
            <div className='flex'>
                <Tooltip title={this.state.counter === 0 ? `${this.props.name} grew up well` : ''} placement="top">
                    <div>{this.state.counter > 0 ? this.flower(25, 25) : this.flower(35, 35)}</div>
                </Tooltip>
                {this.state.counter > 0 ? <div style={{color: '#fff'}}>({this.state.counter} sek)</div> :
                    <Tooltip title="Kill flower" placement="top">
                        <IconButton onClick={this.props.killFlower} aria-label="Delete">
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>}

            </div>
        );
    }
}


export default Flower;