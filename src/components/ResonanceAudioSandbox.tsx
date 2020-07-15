import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import styled from 'styled-components';
//@ts-ignore
import { ResonanceAudio } from 'resonance-audio';
const Wrapper = styled.div``;

type ResonanceAudioSandboxProps = {};

const ResonanceAudioSandbox: React.FC<ResonanceAudioSandboxProps> = (props) => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [options, setOptions] = useState({ ambisonicOrder: 1 });
  const sourceRef = useRef<any>();
  const sceneRef = useRef<any>();
  useEffect(() => {
    let audioContext = new AudioContext();
    let resonanceAudioScene = new ResonanceAudio(audioContext, {
      ambisonicOrder: 1,
    });
    resonanceAudioScene.output.connect(audioContext.destination);

    let audioElement = document.createElement('audio');
    audioElement.src = '/audio/set.mp3';
    audioElement.crossOrigin = 'anonymous';

    // Generate a MediaElementSource from the AudioElement.
    let audioElementSource = audioContext.createMediaElementSource(
      audioElement
    );

    // Add the MediaElementSource to the scene as an audio input source.
    let source = resonanceAudioScene.createSource({ maxDistance: 10 });
    audioElementSource.connect(source.input);

    // Set the source position relative to the room center (source default position).
    source.setPosition(-0.707, -0.707, 0);

    // Play the audio.
    audioElement.play();
    sourceRef.current = source;
    sceneRef.current = resonanceAudioScene;
    return () => {
      audioContext.suspend();
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newPos = { ...position, [e.target.name]: parseFloat(e.target.value) };
    sourceRef.current?.setPosition(newPos.x, newPos.y, newPos.z);
    setPosition(newPos);
  };
  return (
    <Wrapper>
      <label>x</label>
      <input
        step='.1'
        type='number'
        name='x'
        value={position.x}
        onChange={handleChange}
      />
      <label>y</label>
      <input
        step='.1'
        type='number'
        name='y'
        value={position.y}
        onChange={handleChange}
      />
      <label>z</label>
      <input
        step='.1'
        type='number'
        name='z'
        value={position.z}
        onChange={handleChange}
      />
      <label>Ambisonic Order</label>
      <input
        step='1'
        min='1'
        max='3'
        type='number'
        name='ambisonicOrder'
        value={options.ambisonicOrder}
        onChange={(e) => {
          let value = parseInt(e.target.value);
          console.log(value);

          setOptions({ ...options, ambisonicOrder: value });
          try {
            sceneRef.current?.setAmbisonicOrder(parseInt(e.target.value));
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </Wrapper>
  );
};

export default ResonanceAudioSandbox;
