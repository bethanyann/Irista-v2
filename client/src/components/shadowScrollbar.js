import { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars-2';

class ShadowScrollbars extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            scrollTop: 0,
            scrollHeight: 0,
            clientHeight: 0
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    handleUpdate(values) {
      
    }

    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: `rgb(238,238,238,0.2)`,
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }


    render() {
        const { style, ...props } = this.props;
        const containerStyle = {
            ...style,
            position: 'relative'
        };
        return (
            <div style={containerStyle}>
                <Scrollbars
                    thumbSize={100}
                    thumbMinSize={50}
                    autoHide
                    ref="scrollbars"
                    renderThumbVertical={this.renderThumb}
                    onUpdate={this.handleUpdate}
                    {...props}/>
            </div>
        );
    }
}

ShadowScrollbars.propTypes = {
    style: PropTypes.object
};

export default ShadowScrollbars;

