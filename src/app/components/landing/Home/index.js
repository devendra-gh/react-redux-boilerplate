import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                hello
            </div>
        );
    }
}

//Costant to map state to Props
const mapStateToProps = (state) => {
    return {
        //home: state.home
    };
};

//Constant to map dispatch to Props
const mapDispatchToProps = (dispatch) => {
    return {
        // onClickHandler: () => {
        //     dispatch(onClickHandler());
        // },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));