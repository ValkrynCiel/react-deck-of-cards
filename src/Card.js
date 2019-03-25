import React, { Component } from 'react';
import { relative } from 'path';

class Card extends Component {
    render() {
        
        let style = {
            position: "absolute",
            transform: `rotate(${this.props.rotation}deg)`
        }
        return (
            <img style={style} src = {this.props.imgSrc} alt={`${this.props.value} of ${this.props.suit}`}/>
        )
    }
}

export default Card;