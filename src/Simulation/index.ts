import { Core, NodeSingular, EventObject } from 'cytoscape';
import MainLoop from 'mainloop.js';
import { updateTraverser } from './traverser';
//@ts-ignore
import { ResonanceAudio, Source } from 'resonance-audio';

interface NodeAudioScratch {
  audioElement: HTMLAudioElement;
  source: Source;
}
interface CoreAudioScratch {
  audioContext: AudioContext;
  audioScene: ResonanceAudio;
}
export const initSim = (cy: Core) => {
  const audioContext = new AudioContext();
  const audioScene = new ResonanceAudio(audioContext, {
    ambisonicOrder: 1,
    listenerUp: [0, 0, 1],
    listenerForward: [1, 0, 0],
  });
  audioScene.output.connect(audioContext.destination);

  cy.$('node').forEach((node) =>
    bindAudioPropsToNode(node, audioContext, audioScene)
  );
  cy.scratch('ezkapist-audio', { audioContext, audioScene });

  MainLoop.setUpdate((delta: number) => {
    cy.nodes('.traverser').forEach((t) => updateTraverser(t, delta));
  });
  cy.addListener('position', '.audio-listener', updateListenerPosition);
  cy.addListener('position', '.audio-source', updateSourcePosition);
};
export const cleanUpSim = (cy: Core) => {
  MainLoop.stop();
  const { audioContext } = (cy.scratch('ezkapist-audio') ||
    {}) as CoreAudioScratch;
  audioContext?.suspend();
};
export const startSim = (cy: Core) => {
  cy.$('.audio-source').forEach((node) => {
    let { audioElement } = node.scratch('ezkapist-audio') as NodeAudioScratch;
    audioElement.play();
  });
  MainLoop.start();
  console.log(cy.scratch('ezkapist-audio'));
};
export const stopSim = (cy: Core) => {
  console.log(cy.scratch('ezkapist-audio'));
  MainLoop.stop();
  const { audioContext } = cy.scratch('ezkapist-audio') as CoreAudioScratch;
  audioContext.suspend();
};
export const makeAudioListener = (node: NodeSingular) => {
  let cy = node.cy();
  cy.$('.audio-listener').removeClass('audio-listener');
  node.addClass('audio-listener');
  cy.scratch('ezkapist-listener', node);
};
const updateListenerPosition = (e: EventObject) => {
  const { audioScene } = e.cy.scratch('ezkapist-audio') as CoreAudioScratch;
  const node = e.target as NodeSingular;
  const { x, y } = node.position();
  const { dir } = node.scratch('ezkapist');
  audioScene.setListenerPosition(x, 0, -y);
  let dirLength = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
  audioScene.setListenerOrientation(
    dir.x / dirLength,
    0,
    -dir.y / dirLength,
    0,
    1,
    0
  );
};
const updateSourcePosition = (e: EventObject) => {
  const node = e.target as NodeSingular;
  const { x, y } = node.position();
  const { source } = node.scratch('ezkapist-audio') as NodeAudioScratch;
  source.setPosition(x, 0, -y);
};
const bindAudioPropsToNode = (
  node: NodeSingular,
  context: AudioContext,
  scene: ResonanceAudio
) => {
  const data = node.data('ezkapist');
  console.log(data);

  if (!data || !data.audioUrl) {
    node.removeClass('audio-source');
    node.removeScratch('ezkapist-audio');
    return;
  }
  let audioElement = document.createElement('audio');
  audioElement.src = data.audioUrl;
  audioElement.loop = true;
  let audioElementSource = context.createMediaElementSource(audioElement);
  let source = scene.createSource();
  audioElementSource.connect(source.input);
  const { x, y } = node.position();
  source.setPosition(x, 0, -y);
  node.addClass('audio-source');
  node.scratch('ezkapist-audio', { audioElement, source });
};
