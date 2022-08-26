import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';

class ShadowScrollbar extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = { top: 0 };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderView = this.renderView.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    handleUpdate(values) {
        const { top } = values;
        this.setState({ top });
    }

    renderView({ style, ...props }) {
        const viewStyle = {
            paddingTop: 0,
            paddingRight: 20,
            paddingLeft: 0,
            paddingBottom: 5,
            top: 20
        };
        return (
            <div
                className="box"
                style={{ ...style, ...viewStyle, inset:'8px 0px 0px' }}
                {...props}/>
        );
    }

    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: `rgb(238,238,238,0.2)`,
           // maxHeight: 50
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    render() {
        return (
            <Scrollbars
                renderView={this.renderView}
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                onUpdate={this.handleUpdate}
                {...this.props}/>
        );
    }
}

ShadowScrollbar.propTypes = {
    style: PropTypes.object
};

export default ShadowScrollbar;