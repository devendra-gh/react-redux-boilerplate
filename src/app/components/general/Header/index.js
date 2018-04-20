import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <header>
                Header
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      //header: state.header,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // header: function () {
        //     dispatch(header());
        // }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

