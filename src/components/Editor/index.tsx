import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

type EditorProps = {};

const Editor: React.FC<EditorProps> = (props) => {
  return (
    <Layout>
      <div id='menu'>
        <h1>CytoScape Demo</h1>
        <Link to='/maps'>Map Editor</Link>
        <Link to='/audio'>resonance-audio</Link>
        <Link to='/flow'>Flow Editor</Link>
      </div>
      <div id='explorer'>
        <ExplorerReact
          items={items.map((item) => ({ ...item, payload: item }))}
          focusedId={focusedAsset?.id}
          onUserFocus={(item) => handleFocus(item.payload)}
          onRightClick={handleRightClick}
          createAssetPopover={<div>Hi</div>}
        />
        <ContextMenu
          ref={popperElementRef}
          style={{
            ...styles.popper,
            display: contextMenuVisible ? 'block' : 'none',
          }}
          {...attributes.popper}
        >
          Hello
        </ContextMenu>
      </div>
      <div id='tabs'>
        {!!openViews.length ? (
          <Tabs
            onUserFocus={(index, data) => setFocusedAsset(openViews[index])}
            onClose={(index, data) => handleClose(openViews[index])}
          >
            {openViews.map((asset, index) => {
              return (
                <Tab
                  title={asset.id}
                  selected={asset.id === focusedAsset?.id}
                  key={index}
                >
                  <TestViewWithState />
                </Tab>
              );
            })}
          </Tabs>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            keins ausgewählt
          </div>
        )}
      </div>
      <div id='footer'>Footer</div>
    </Layout>
  );
};

export default Editor;
