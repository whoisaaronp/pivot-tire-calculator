// JavaScript Document

import mongoose from 'mongoose';
import { Schema } from '../models/schema';


const Optimal = mongoose.model('Optimal', Schema);

//  create new optimal calulations from the schema

export const addNewOptimal = (req, res) => {
  let newOptimal = new Optimal(req.body);

  newOptimal.save((err, optimal) => {
    if (err) {
      res.send(err);
    }
    res.json(optimal);
  })
}