import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material"

import { fetchTrips, createTrip, updateTrip, deleteTrip } from "src/queries/api"
import { TripData } from "src/types/tripData"

const TripList = () => {
  const queryClient = useQueryClient()
  const { data: trips, isLoading } = useQuery({ queryKey: ["trips"], queryFn: fetchTrips })

  const [openDialog, setOpenDialog] = useState(false)
  const [editTrip, setEditTrip] = useState<({ id: number } & TripData) | null>(null)
  const [newTrip, setNewTrip] = useState<TripData>({
    startLocation: "",
    endLocation: "",
    price: 0,
    vehicleId: "",
    startDateTime: new Date().toISOString(),
    endDateTime: new Date().toISOString(),
  })

  // Mutations for CRUD operations
  const createTripMutation = useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] })
      setOpenDialog(false)
    },
  })

  const updateTripMutation = useMutation({
    mutationFn: ({ id, tripData }: { id: number; tripData: Partial<TripData> }) =>
      updateTrip(id, tripData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] })
      setEditTrip(null)
    },
  })

  const deleteTripMutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["trips"] }),
  })

  if (isLoading) return <p>Loading...</p>

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button variant="contained" color="primary" fullWidth onClick={() => setOpenDialog(true)}>
        Add Trip
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Trip</DialogTitle>
        <DialogContent>
          <TextField
            label="Start Location"
            fullWidth
            margin="dense"
            value={newTrip.startLocation}
            onChange={(e) => setNewTrip({ ...newTrip, startLocation: e.target.value })}
          />
          <TextField
            label="End Location"
            fullWidth
            margin="dense"
            value={newTrip.endLocation}
            onChange={(e) => setNewTrip({ ...newTrip, endLocation: e.target.value })}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="dense"
            value={newTrip.price}
            onChange={(e) => setNewTrip({ ...newTrip, price: Number(e.target.value) })}
          />
          <TextField
            label="Vehicle"
            type="string"
            fullWidth
            margin="dense"
            value={newTrip.vehicleId}
            onChange={(e) => setNewTrip({ ...newTrip, vehicleId: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => createTripMutation.mutate(newTrip)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Trips Table */}
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Start Location</TableCell>
              <TableCell>End Location</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip: any) => (
              <TableRow key={trip.id}>
                <TableCell>{trip.id}</TableCell>
                <TableCell>
                  {editTrip && editTrip.id === trip.id ? (
                    <TextField
                      fullWidth
                      value={editTrip.startLocation}
                      onChange={(e) => setEditTrip({ ...editTrip, startLocation: e.target.value })}
                    />
                  ) : (
                    trip.startLocation
                  )}
                </TableCell>
                <TableCell>
                  {editTrip && editTrip.id === trip.id ? (
                    <TextField
                      fullWidth
                      value={editTrip.endLocation}
                      onChange={(e) => setEditTrip({ ...editTrip, endLocation: e.target.value })}
                    />
                  ) : (
                    trip.endLocation
                  )}
                </TableCell>
                <TableCell>
                  {editTrip && editTrip.id === trip.id ? (
                    <TextField
                      fullWidth
                      type="number"
                      value={editTrip.price}
                      onChange={(e) => setEditTrip({ ...editTrip, price: Number(e.target.value) })}
                    />
                  ) : (
                    `$${trip.price}`
                  )}
                </TableCell>
                <TableCell>
                  {editTrip && editTrip.id === trip.id ? (
                    <>
                      <Button
                        onClick={() =>
                          updateTripMutation.mutate({ id: trip.id, tripData: editTrip })
                        }
                        color="success"
                      >
                        Save
                      </Button>
                      <Button onClick={() => setEditTrip(null)} color="secondary">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => setEditTrip(trip)} color="primary">
                        Edit
                      </Button>
                      <Button onClick={() => deleteTripMutation.mutate(trip.id)} color="error">
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TripList
