import { Request, Response } from 'express';

import Trip from '../models/trip';

export const trips = async (req: Request, res: Response) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
   } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
   }
  }
}

export const trip = async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json(trip);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
   } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
   }
  }
}

export const createTrip = async (req: Request, res: Response) => {
  console.log(req.body, "req body testing")
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
   } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
   }
  }
}

export const updateTrip = async (req: Request, res: Response) => {
  console.log(req.params, "params ==>");

  try {
    const tripId = Number(req.params.id);
    const [updatedRows] = await Trip.update(req.body, { where: { id: tripId } });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const updatedTrip = await Trip.findByPk(tripId);
    res.json(updatedTrip);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const deleted = await Trip.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Trip not found" });
    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
   } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
   }
  }
}