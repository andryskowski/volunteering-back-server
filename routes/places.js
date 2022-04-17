const express = require('express');
const router = express.Router();
const Place = require('../model/Place');

//get back all the places
router.get('/', async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    }
    catch (err) {
        res.json({message: err});
    }
});

//submits a places
router.post('/post', async (req, res) => {
    const place = new Place({
        name: req.body.name,
        img: req.body.img,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        category: req.body.category,
        position: req.body.position,
        phone: req.body.phone,
        email: req.body.email,
        webPage: req.body.webPage,
        city: req.body.city,
        street: req.body.street,
        postalCode: req.body.postalCode,
        houseNo: req.body.houseNo,
        district: req.body.district,
        smallMapOfPlace: req.body.smallMapOfPlace,
        statusPlace: req.body.statusPlace,
        addedBy: req.body.addedBy,
    });
        try {
            const savedPlace = await place.save();
            res.json(savedPlace);
        }
        catch(err){
            res.json({message: err});
        }
});

//specific place
router.get('/:placeId', async (req, res) => {
    try{
        const place = await Place.findById(req.params.placeId);
        res.json(place);
    }
    catch (err){
        res.json({message: err});
    }
});

//delete selected place
router.delete('/delete/:placeId', async (req, res) => {
    try{
        const removedPlace = await Place.remove({ _id: req.params.placeId });
        res.json(removedPlace);
    }
    catch (err){
        res.json({message: err});
    }
  });

//update place status
router.patch("/patch/changeStatus/:placeId", async (req, res) => {
    try {
      await Place.updateOne(
        { _id: req.params.placeId },
        {
          $set: {
            statusPlace: req.body.statusPlace,
          },
        }
      );
      const place = await Place.findOne({ _id: req.params.placeId });
      res.json(place);
    } catch (err) {
      res.json({ message: err });
    }
  });

  //update place status
router.patch("/patch/editplace/:placeId", async (req, res) => {
  try {
    await Place.updateOne(
      { _id: req.params.placeId },
      {
        $set: {
          name: req.body.name,
          img: req.body.img,
          shortDescription: req.body.shortDescription,
          description: req.body.description,
          category: req.body.category,
          phone: req.body.phone,
          email: req.body.email,
          webPage: req.body.webPage,
          city: req.body.city,
          street: req.body.street,
          postalCode: req.body.postalCode,
          houseNo: req.body.houseNo,
          district: req.body.district,
          position: req.body.position,
        },
      }
    );
    const place = await Place.findOne({ _id: req.params.placeId });
    res.json(place);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;