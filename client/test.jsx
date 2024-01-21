//app component

<app>
    <navbar></navbar>
    <submitDeck></submitDeck>
    <allDecks> </allDecks>
</app>




//allDecks component

<allDecks>
    map <button onClick (render deck)>Deck</button>
</allDecks>


//deck component

<deck>
    <button onclick = {render card component}>Delete Deck</button>
</deck>


//card component

<card>
    <navbar></navbar>
    <button>Add card</button>
    <button onClick (render topic)>Topic</button>
    <button>back</button>
    <button>next</button>
</card>


topic component 

<topic>
    <div>content</div>
</topic>





