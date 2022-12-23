import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSingleCamera } from "../../../slice/camerasSlice";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Camera = () => {
  const { cameraId } = useParams();
  const [camera, setCamera] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleCamera(cameraId)).then((response) => {
      setCamera(response.payload);
    });
  }, [dispatch, cameraId]);

  if (!camera) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Camera {camera.cameraId}</h1>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {camera.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {camera.deviceTypeId}
            {camera.ethMacAddress}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Camera;
