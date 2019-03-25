import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
class Deck extends Component {

    constructor(props){
        super(props);
        this.state = {
            deckId: null,
            cards: [],
            showButton: true,
            loading: true
        }
        this.getNewCard = this.getNewCard.bind(this);
    }

    async componentDidMount(){
        const deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        console.log(deck)
        this.setState({
            deckId: deck.data.deck_id,
            loading: false
        });

    }

    async getNewCard(){
        
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`)
        let card = response.data.cards[0];

        card.rotation = Math.floor(Math.random() * 90) - 45;

        this.setState(st => ({
            cards: [...st.cards, card],
            showButton: response.data.remaining > 0 
        }));

    }

    render () {
        return (
            <div>
            {this.state.loading ? <h1>Getting a new deck...</h1> : 
                <>
                    { this.state.showButton ? <button onClick={ this.getNewCard }>Get new card!</button> : null }
                    { this.state.cards.map((c,i) => <Card rotation={ c.rotation } key={ c.code } imgSrc={ c.image } value={ c.value } suit={ c.suit }/>)}
                </>
            }
            </div>
        )
    }

}

export default Deck;