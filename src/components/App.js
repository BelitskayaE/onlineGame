import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Shop from "./Shop";
import Garden from "./Garden";
import '../styles/globalStyle.css';
import '../styles/shopStyles.css';
import '../styles/gardenStyles.css';

function TabContainer({children}) {
    return (
        <div>
            {children}
        </div>
    );
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }


    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        return (
            <div className='App'>
                <AppBar position="static" color="default">
                    <Tabs
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                        value={this.state.value}
                    >
                        <Tab className='header-tab' label="Shop"/>
                        <Tab className='header-tab' label="Garden"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    index={this.state.value}
                >
                    <TabContainer><Shop/></TabContainer>
                    <TabContainer><Garden/></TabContainer>
                </SwipeableViews>
            </div>

        );
    }
}


export default Game;