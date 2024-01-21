const router = require("express").Router();
const Deck = require("./model");

//show card 
router.get("/", async (req, res) => {
  try {
    const {index} = req.body;
    const deck = Deck[index]
    if (!deck) {
        console.log('Deck not found')
        return res.status(404).json({error: 'Deck not found'})
    }
    console.log(`found deck ${formBody.deckId}`)
    res.json(deck)
  }
  catch (error) {
    console.log('Error finding deck')
    res.status(500).json({error:'Internal Server Error'})
  }
  })

//create card
router.post("/", async (req, res) => {
    try {
        const {deckID,front} = req.body
        const deck = Deck.findById(deckId)
        deck[front] = undefined
        deck.save()
        console.log('created card')
        res.redirect('/')
    }
    catch (error) {
        console.log('Error creating card')
        res.status(500).json({error:'Internal Server Error'})
      }
    
});

//delete card
router.delete("/", async (req, res) => {
    try {
        const {deckId} = req.body
        Deck.findByIdAndDelete(deckId,function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Deleted : ", docs); 
            } 
        })
        console.log('deleted card')
        res.redirect('/')
    }
    catch (error) {
        console.log('Error creating card')
        res.status(500).json({error:'Internal Server Error'})
      }
    
});

module.exports = router;
