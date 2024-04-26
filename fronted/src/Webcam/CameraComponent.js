import React, { useState, useRef, useEffect } from 'react';
import Quagga from 'quagga';
import Barcode from './Barcode.js';
import './CameraComponent.css';

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState(null); // State to store scanned barcode
  const [decodedInfo, setDecodedInfo] = useState(null); // State to store decoded barcode information

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraStarted(true);
        startBarcodeScanning();
      }
    } catch (err) {
      setError(err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    setIsCameraStarted(false);
    Quagga.stop();
  };

  const startBarcodeScanning = () => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoRef.current,
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment",
        },
      },
      decoder: {
        readers: ["code_128_reader"], // Change to CODE128 reader
      },
    }, function(err) {
      if (err) {
        console.error("Failed to initialize Quagga:", err);
        setError(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      setScannedBarcode(result.codeResult.code); // Update state with scanned barcode
      setDecodedInfo(result.codeResult.format); // Set decoded barcode information
    });
  };
 

  return (
    <div className="camera-container">
      <Barcode/>
      {error && <div className="error-message">Error: {error.message}</div>}
      <video ref={videoRef} autoPlay playsInline className={`video ${isCameraStarted ? 'active' : ''}`} />
      {scannedBarcode && (
        <div className="popup">
          <p>Scanned Barcode: {scannedBarcode}</p>
          <p>Decoded Info: {decodedInfo}</p> {/* Display decoded information */}
          <button className="clear-button" onClick={() => setScannedBarcode(null)}>Clear Barcode</button>
        </div>
      )}
      {!isCameraStarted ? (
        <button className="start-button" onClick={startCamera}>Start Camera</button>
      ) : (
        <button className="stop-button" onClick={stopCamera}>Stop Camera</button>
      )}
    </div>
  );
};

export default CameraComponent;
